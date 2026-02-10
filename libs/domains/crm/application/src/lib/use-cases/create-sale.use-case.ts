import { Injectable, Inject } from '@nestjs/common';
import { Sale, SaleItem } from '@virteex/crm-domain/lib/entities/sale.entity';
import { SaleRepository } from '@virteex/crm-domain/lib/repositories/sale.repository';
import Decimal from 'decimal.js';

export interface CreateSaleDto {
  customerName: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  tenantId: string;
}

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject('SaleRepository')
    private readonly repository: SaleRepository,
  ) {}

  async execute(dto: CreateSaleDto): Promise<Sale> {
    let total = new Decimal(0);
    const sale = new Sale(dto.tenantId, dto.customerName, '0');

    for (const item of dto.items) {
      const itemTotal = new Decimal(item.price).mul(item.quantity);
      total = total.plus(itemTotal);

      const saleItem = new SaleItem(
        item.productId,
        item.productName,
        item.price.toString(),
        item.quantity.toString(),
      );
      sale.items.add(saleItem);
    }

    sale.total = total.toString();
    sale.status = 'COMPLETED'; // Assuming immediate completion for POS

    return this.repository.create(sale);
  }
}
