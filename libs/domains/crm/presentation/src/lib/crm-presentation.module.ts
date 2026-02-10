import { Module } from '@nestjs/common';
import { CrmApplicationModule } from '@virteex/crm-application';
import { CrmController } from './controllers/crm.controller';

@Module({
  imports: [CrmApplicationModule],
  controllers: [CrmController],
})
export class CrmPresentationModule {}
