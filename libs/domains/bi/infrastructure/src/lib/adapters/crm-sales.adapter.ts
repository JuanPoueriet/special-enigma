import { Injectable, Inject } from '@nestjs/common';
import { SalesPort, TopProductDto } from '@virteex/bi-domain';
// Relative import to avoid build resolution issues
import { SaleRepository } from '../../../../../crm/domain/src/index';

@Injectable()
export class CrmSalesAdapter implements SalesPort {
  constructor(
    @Inject('SaleRepository') private readonly saleRepository: SaleRepository
  ) {}

  async getTopProducts(tenantId: string, limit: number): Promise<TopProductDto[]> {
    return this.saleRepository.getTopProducts(tenantId, limit);
  }
}
