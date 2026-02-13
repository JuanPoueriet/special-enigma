import { Injectable, Inject } from '@nestjs/common';
import { SaleRepository } from '@virteex/crm-domain';

@Injectable()
export class GetTopProductsUseCase {
  constructor(
    @Inject(SaleRepository) private readonly saleRepository: SaleRepository
  ) {}

  async execute(tenantId: string) {
    return this.saleRepository.getTopProducts(tenantId, 5);
  }
}
