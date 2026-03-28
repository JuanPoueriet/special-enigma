import { Injectable, Inject } from '@nestjs/common';
import { type SalesPort, SALES_PORT, TopProductDto } from '@virteex/domain-bi-domain';
import { GetTopProductsQuery } from './get-top-products.query';

@Injectable()
export class GetTopProductsHandler {
  constructor(
    @Inject(SALES_PORT) private readonly salesPort: SalesPort
  ) {}

  async handle(query: GetTopProductsQuery): Promise<TopProductDto[]> {
    return this.salesPort.getTopProducts(query.tenantId, 5);
  }
}
