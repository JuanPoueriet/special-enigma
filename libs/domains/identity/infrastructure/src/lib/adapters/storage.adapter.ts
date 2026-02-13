import { Injectable } from '@nestjs/common';
import { StoragePort } from '@virteex/identity-application';
import { StorageService } from '@virteex/shared-infrastructure-storage';

@Injectable()
export class StorageAdapter implements StoragePort {
  constructor(private readonly storageService: StorageService) {}

  async saveFile(fileName: string, buffer: Buffer): Promise<string> {
    return this.storageService.saveFile(fileName, buffer);
  }

  getFileUrl(fileName: string): string {
    return this.storageService.getFileUrl(fileName);
  }
}
