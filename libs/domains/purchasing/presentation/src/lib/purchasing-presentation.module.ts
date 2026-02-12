import { Module } from '@nestjs/common';
import { PurchasingController } from './controllers/purchasing.controller';
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
    GetVendorBillUseCase
  ],
  exports: [PurchasingApplicationModule, PurchasingInfrastructureModule]
})
export class PurchasingPresentationModule {}
