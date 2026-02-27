import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { TokenService } from '@virteex/shared-util-auth';
import { ConnectivityService } from './sync/connectivity.service';
import { SyncQueueService } from './sync/sync-queue.service';
import { ConflictResolverService } from './sync/conflict-resolver.service';
import { DownSyncService } from './sync/down-sync.service';
import { ConflictStrategy, SyncItem } from './sync/sync.types';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  get isOnline() {
    return this.connectivity.isOnline;
  }
  private isProcessing = false;
  private tokenService = inject(TokenService);

  constructor(
    private readonly http: HttpClient,
    private readonly connectivity: ConnectivityService,
    private readonly queueService: SyncQueueService,
    private readonly conflictResolver: ConflictResolverService,
    private readonly downSyncService: DownSyncService
  ) {
    this.queueService.initialize();
    this.setupListeners();

    if (this.isOnline()) {
      this.downSync();
    }
  }

  get queueItems() {
    return this.queueService.items;
  }

  async request(method: 'POST' | 'PUT' | 'DELETE', url: string, payload: unknown, conflictStrategy: ConflictStrategy = 'serverWins') {
    if (this.isOnline()) {
      try {
        return await firstValueFrom(this.http.request(method, url, { body: payload }));
      } catch (e: any) {
        if (e.status === 0 || e.status >= 500) {
          await this.enqueue(method, url, payload, e.message);
          return { offline: true, message: 'Request queued due to network/server error' };
        }

        if (e.status === 409) {
          return this.conflictResolver.resolve(conflictStrategy, e);
        }

        throw e;
      }
    }

    await this.enqueue(method, url, payload);
    return { offline: true, message: 'Request queued (offline)' };
  }

  async downSync() {
    if (!this.isOnline()) {
      return;
    }

    try {
      await this.downSyncService.syncWarehouses();
    } catch (error) {
      console.error('Down-Sync failed', error);
    }
  }

  dismissItem(id: string) {
    this.queueService.remove(id);
  }

  private setupListeners() {
    this.connectivity.onOnline(() => {
      this.processQueue();
      this.downSync();
    });

    this.connectivity.onOffline();
  }

  private async enqueue(method: 'POST' | 'PUT' | 'DELETE', url: string, payload: unknown, lastError?: string): Promise<void> {
    await this.queueService.add({
      id: uuidv4(),
      url,
      method,
      payload,
      timestamp: Date.now(),
      retryCount: 0,
      status: 'pending',
      lastError,
    });
  }

  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      const snapshot = [...this.queueService.items()];
      if (snapshot.length === 0 || !this.tokenService.hasAccessToken()) {
        return;
      }

      for (const item of snapshot) {
        await this.processItem(item);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  private async processItem(item: SyncItem): Promise<void> {
    const backoffTime = Math.pow(2, item.retryCount) * 1000;
    if (Date.now() - item.timestamp < backoffTime) {
      return;
    }

    try {
      await firstValueFrom(this.http.request(item.method, item.url, { body: item.payload }));
      await this.queueService.remove(item.id);
    } catch (e: any) {
      if (e.status >= 400 && e.status < 500 && e.status !== 408 && e.status !== 429) {
        if (e.status === 409) {
          await this.queueService.update(item.id, {
            status: 'failed',
            lastError: `Conflict: ${e.message}`,
            conflictMessage: 'Server state changed. Please review.',
          });
          return;
        }

        await this.queueService.remove(item.id);
        return;
      }

      await this.queueService.update(item.id, {
        retryCount: item.retryCount + 1,
        timestamp: Date.now(),
        lastError: e.message,
      });
    }
  }
}

export type { SyncItem, ConflictStrategy } from './sync/sync.types';
