import { Module } from '@nestjs/common';
import { PurchasingController } from './controllers/purchasing.controller';
import { PurchasingResolver } from './resolvers/purchasing.resolver';
import {
  PurchasingApplicationModule,
  CreateSupplierUseCase,
  CreatePurchaseOrderUseCase,
  CreateRequisitionUseCase,
  GetRequisitionsUseCase,
  CreateVendorBillUseCase,
  UpdateVendorBillUseCase,
  GetVendorBillUseCase
} from '@virteex/purchasing-application';
import { PurchasingInfrastructureModule } from '@virteex/purchasing-infrastructure';

@Module({
  imports: [PurchasingApplicationModule, PurchasingInfrastructureModule],
  controllers: [PurchasingController],
  providers: [
    CreateSupplierUseCase,
    CreatePurchaseOrderUseCase,
    CreateRequisitionUseCase,
    GetRequisitionsUseCase,
    CreateVendorBillUseCase,
    UpdateVendorBillUseCase,
    GetVendorBillUseCase,
    PurchasingResolver
  ],
  exports: [PurchasingApplicationModule, PurchasingInfrastructureModule]
})
export class PurchasingPresentationModule {}
