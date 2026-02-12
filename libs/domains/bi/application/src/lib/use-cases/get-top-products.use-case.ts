import { Injectable } from '@nestjs/common';

@Injectable()
export class GetTopProductsUseCase {
  execute(tenantId: string) {
    // Return aggregated data for top products.
    // In a real scenario, this would query the Order/Invoice repositories.
    return [
      { name: 'Product A', value: 12000 },
      { name: 'Product B', value: 8500 },
      { name: 'Product C', value: 5000 },
      { name: 'Product D', value: 3200 },
      { name: 'Product E', value: 1500 }
    ];
  }
}
