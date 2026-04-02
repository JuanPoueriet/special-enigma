import { Module } from '@nestjs/common';
import { CrmApplicationModule } from '@virtex/domain-crm-application';
import { CrmController } from '../controllers/crm.controller';

@Module({
  imports: [CrmApplicationModule],
  controllers: [CrmController],
})
export class CrmPresentationModule {}
