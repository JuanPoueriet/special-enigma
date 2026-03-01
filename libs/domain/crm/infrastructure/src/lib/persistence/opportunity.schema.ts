import { EntitySchema } from '@mikro-orm/core';
import { Opportunity } from '@virteex/domain-crm-domain';
import { OpportunityStage } from '@virteex/shared-contracts';

export const OpportunitySchema = new EntitySchema<Opportunity>({
  class: Opportunity,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string' },
    title: { type: 'string' },
    amount: { type: 'decimal', precision: 12, scale: 2, nullable: true },
    stage: { enum: true, items: () => OpportunityStage, default: OpportunityStage.PROSPECTING },
    closeDate: { type: 'date', nullable: true },
    customer: {
      reference: 'm:1',
      entity: 'Customer',
    },
    createdAt: { type: 'date', onCreate: () => new Date() },
    updatedAt: { type: 'date', onUpdate: () => new Date() },
  },
});
