import { Injectable } from '@nestjs/common';

@Injectable()
export class GetTaxRulesUseCase {
  execute(tenantId: string) {
    // Assuming a static set of rules for the tenant's jurisdiction (e.g., Mexico)
    return [
      { id: '1', name: 'IVA 16%', rate: 0.16, type: 'IVA', appliesTo: 'General' },
      { id: '2', name: 'ISR Retención 10%', rate: 0.10, type: 'ISR_RET', appliesTo: 'Professional Services' },
      { id: '3', name: 'IVA Retención 10.6667%', rate: 0.106667, type: 'IVA_RET', appliesTo: 'Professional Services' },
      { id: '4', name: 'IEPS 8%', rate: 0.08, type: 'IEPS', appliesTo: 'High Calorie Food' }
    ];
  }
}
