import { Module } from '@nestjs/common';
import { FiscalController } from './controllers/fiscal.controller';

@Module({
  controllers: [FiscalController],
})
export class FiscalPresentationModule {}
