import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PosSaleSchema, PosSaleItemSchema, PosShiftSchema } from './entities/pos.schema';
import { MikroOrmPosRepository } from './repositories/mikro-orm-pos.repository';
import { HardwareBridgeAdapter } from './adapters/hardware-bridge.adapter';
import { GrpcPosIntegrationAdapter } from './adapters/grpc-pos-integration.adapter';
import { HARDWARE_BRIDGE_PORT } from '@virtex/domain-pos-domain';
import { POS_BILLING_PORT, POS_INVENTORY_PORT } from '@virtex/domain-pos-application';
import { DataQualityModule } from '@virtex/platform-data-quality';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([PosSaleSchema, PosSaleItemSchema, PosShiftSchema]),
    DataQualityModule,
  ],
  providers: [
    { provide: 'PosRepository', useClass: MikroOrmPosRepository },
    { provide: HARDWARE_BRIDGE_PORT, useClass: HardwareBridgeAdapter },
    { provide: POS_BILLING_PORT, useClass: GrpcPosIntegrationAdapter },
    { provide: POS_INVENTORY_PORT, useClass: GrpcPosIntegrationAdapter },
  ],
  exports: ['PosRepository', HARDWARE_BRIDGE_PORT, POS_BILLING_PORT, POS_INVENTORY_PORT],
})
export class PosInfrastructureModule {}
