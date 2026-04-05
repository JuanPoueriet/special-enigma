
import { Injectable, Inject } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class RecordEventUseCase {
  constructor(
    @Inject('AuditLedgerRepository') private readonly repository: any,
  ) {}

  async execute(request: any) {
    // Record audit event in immutable ledger (append-only)
    const ledgerId = crypto.randomUUID();
    const hash = crypto.createHash('sha256').update(ledgerId + request.event).digest('hex');
    await this.repository.save({
      ledgerId,
      event: request.event,
      userId: request.userId,
      metadataJson: request.metadataJson,
      tenantId: request.tenantId,
      timestamp: new Date(),
      hash,
    });
    return { ledgerId, hash };
  }
}
