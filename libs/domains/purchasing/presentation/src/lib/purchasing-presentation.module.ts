import { Module } from '@nestjs/common';
import { PurchasingInfrastructureModule } from '@virteex-erp/purchasing-infrastructure';
import { PurchasingController } from './controllers/purchasing.controller';
import { CreateSupplierUseCase, CreatePurchaseOrderUseCase } from '@virteex-erp/purchasing-application';

@Module({
  imports: [
    PurchasingInfrastructureModule
  ],
  controllers: [PurchasingController],
  providers: [
    CreateSupplierUseCase,
    CreatePurchaseOrderUseCase
  ],
  exports: []
})
export class PurchasingPresentationModule {}
