import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { TenantOperation, OperationType, OperationState } from '@virtex/kernel-tenant';

export interface OperationMetrics {
    pending: number;
    processing: number;
}

@Injectable()
export class OperationsReadModelService {
  private readonly logger = new Logger(OperationsReadModelService.name);

  constructor(private readonly em: EntityManager) {}

  async getBackupOperations(): Promise<any[]> {
    return this.em.find(TenantOperation, {
      type: { $in: [OperationType.BACKUP, OperationType.SNAPSHOT] }
    }, { orderBy: { startedAt: 'DESC' }, limit: 10 });
  }

  async getQueueMetrics(): Promise<OperationMetrics> {
    const pendingCount = await this.em.count(TenantOperation, { state: OperationState.REQUESTED });
    const processingCount = await this.em.count(TenantOperation, { state: OperationState.SWITCHING });

    return {
      pending: pendingCount,
      processing: processingCount
    };
  }
}
