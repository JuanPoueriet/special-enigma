import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductionOrder, PRODUCTION_ORDER_REPOSITORY } from '@virteex/manufacturing-domain';
import { INVENTORY_SERVICE } from '@virteex/manufacturing-domain';
import { MikroOrmProductionOrderRepository } from './repositories/mikro-orm-production-order.repository';
import { MikroOrmInventoryService } from './services/mikro-orm-inventory.service';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([ProductionOrder])
  ],
  providers: [
    {
      provide: PRODUCTION_ORDER_REPOSITORY,
      useClass: MikroOrmProductionOrderRepository
    },
    {
      provide: INVENTORY_SERVICE,
      useClass: MikroOrmInventoryService
    }
  ],
  exports: [
    MikroOrmModule,
    PRODUCTION_ORDER_REPOSITORY,
    INVENTORY_SERVICE
  ]
})
export class ManufacturingInfrastructureModule {}
