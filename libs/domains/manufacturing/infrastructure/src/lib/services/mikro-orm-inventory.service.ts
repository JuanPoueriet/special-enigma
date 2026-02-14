import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Stock, InsufficientStockException } from '@virteex/inventory-domain';
import { InventoryService } from '../../../../domain/src/lib/ports/inventory.service';

@Injectable()
export class MikroOrmInventoryService implements InventoryService {
  constructor(private readonly em: EntityManager) {}

  async checkAndReserveStock(tenantId: string, warehouseId: string, productSku: string, quantity: number): Promise<void> {
    const stock = await this.em.findOne(Stock, {
      tenantId,
      warehouse: warehouseId,
      productId: productSku
    });

    if (!stock) {
      throw new InsufficientStockException(productSku, warehouseId);
    }

    stock.removeQuantity(quantity.toString());

    // We don't need explicit persist if the entity is managed, but explicit flush or persist is good practice.
    // However, if this is called within a transaction started by the Use Case (if any), we shouldn't flush.
    // But Use Case usually doesn't start transaction explicitly unless decorated.
    // I will flush here to be safe, assuming atomic operation per request or handled by global interceptor.
    // Given the report "descuente inventario atómicamente", I should ensure it is saved.

    await this.em.flush();
  }
}
