import { Module } from '@nestjs/common';
import { TreasuryController } from './controllers/treasury.controller';

@Module({
  controllers: [TreasuryController],
})
export class TreasuryPresentationModule {}
