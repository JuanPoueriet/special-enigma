import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Supplier, PurchaseOrder, PurchaseOrderItem, SUPPLIER_REPOSITORY, PURCHASE_ORDER_REPOSITORY } from '@virteex/purchasing-domain';
import { MikroOrmSupplierRepository } from '@virteex/purchasing-infrastructure/lib/repositories/mikro-orm-supplier.repository';
import { MikroOrmPurchaseOrderRepository } from '@virteex/purchasing-infrastructure/lib/repositories/mikro-orm-purchase-order.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([Supplier, PurchaseOrder, PurchaseOrderItem])
  ],
  providers: [
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: MikroOrmSupplierRepository
    },
    {
      provide: PURCHASE_ORDER_REPOSITORY,
      useClass: MikroOrmPurchaseOrderRepository
    }
  ],
  exports: [
    SUPPLIER_REPOSITORY,
    PURCHASE_ORDER_REPOSITORY,
    MikroOrmModule
  ]
})
export class PurchasingInfrastructureModule {}
