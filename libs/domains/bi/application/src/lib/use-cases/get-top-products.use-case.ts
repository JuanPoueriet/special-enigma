import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class GetTopProductsUseCase {
  constructor(
    @Inject('SaleRepository') private readonly saleRepository: any
  ) {}

  async execute(tenantId: string) {
    return this.saleRepository.getTopProducts(tenantId, 5);
  }
}
