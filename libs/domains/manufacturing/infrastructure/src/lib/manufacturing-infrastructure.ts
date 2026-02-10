import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductionOrder, PRODUCTION_ORDER_REPOSITORY } from '@virteex/manufacturing-domain';
import { MikroOrmProductionOrderRepository } from './repositories/mikro-orm-production-order.repository';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([ProductionOrder])
  ],
  providers: [
    {
      provide: PRODUCTION_ORDER_REPOSITORY,
      useClass: MikroOrmProductionOrderRepository
    }
  ],
  exports: [
    MikroOrmModule,
    PRODUCTION_ORDER_REPOSITORY
  ]
})
export class ManufacturingInfrastructureModule {}
