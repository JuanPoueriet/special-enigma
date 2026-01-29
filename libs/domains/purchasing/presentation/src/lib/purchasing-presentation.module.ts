import { Module } from '@nestjs/common';
import { PurchasingController } from './controllers/purchasing.controller';
import { CreateSupplierUseCase, CreatePurchaseOrderUseCase } from '@virteex-erp/purchasing-application';

@Module({
  imports: [],
  controllers: [PurchasingController],
  providers: [
    CreateSupplierUseCase,
    CreatePurchaseOrderUseCase
  ],
  exports: []
})
export class PurchasingPresentationModule {}
