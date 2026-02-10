import { Module } from '@nestjs/common';
import { CrmApplicationModule } from '@virteex/crm-application';
import { CrmInfrastructureModule } from '@virteex/crm-infrastructure';
import { CrmController } from './controllers/crm.controller';

@Module({
  imports: [CrmApplicationModule, CrmInfrastructureModule],
  controllers: [CrmController],
})
export class CrmPresentationModule {}
