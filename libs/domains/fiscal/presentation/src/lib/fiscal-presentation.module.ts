import { Module } from '@nestjs/common';
import { FiscalController } from './controllers/fiscal.controller';
import { FiscalApplicationModule } from '@virteex/fiscal-application';

@Module({
  imports: [FiscalApplicationModule],
  controllers: [FiscalController],
})
export class FiscalPresentationModule {}
