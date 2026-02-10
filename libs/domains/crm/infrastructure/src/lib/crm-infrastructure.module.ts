import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Sale, SaleItem } from '@virteex/crm-domain';
import { MikroOrmSaleRepository } from './repositories/mikro-orm-sale.repository';

@Module({
  imports: [MikroOrmModule.forFeature([Sale, SaleItem])],
  providers: [
    {
      provide: 'SaleRepository',
      useClass: MikroOrmSaleRepository,
    },
  ],
  exports: ['SaleRepository'],
})
export class CrmInfrastructureModule {}
