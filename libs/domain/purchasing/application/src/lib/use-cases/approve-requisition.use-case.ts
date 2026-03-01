import { Injectable, Inject } from '@nestjs/common';
import { RequisitionRepository } from '@virteex/domain-purchasing-domain';
import { EntityNotFoundException, UnauthorizedException } from '@virteex/kernel-exceptions';

@Injectable()
export class ApproveRequisitionUseCase {
  constructor(
    @Inject('RequisitionRepository') private readonly requisitionRepository: RequisitionRepository
  ) {}

  async execute(requisitionId: string, tenantId: string): Promise<void> {
    const requisition = await this.requisitionRepository.findById(requisitionId);

    if (!requisition) {
      throw new EntityNotFoundException('Requisition', requisitionId);
    }

    if (requisition.tenantId !== tenantId) {
      throw new UnauthorizedException('Access denied');
    }

    requisition.status = 'Approved';
    // Ideally, we would emit an event here (e.g., requisition.approved)

    await this.requisitionRepository.save(requisition);
  }
}
