import { Module } from '@nestjs/common';
import { TreasuryApplicationModule } from '../../../application/src/index';
import { TreasuryInfrastructureModule } from '../../../infrastructure/src/index';
import { TreasuryController } from './controllers/treasury.controller';

@Module({
  imports: [TreasuryApplicationModule, TreasuryInfrastructureModule],
  controllers: [TreasuryController],
})
export class TreasuryPresentationModule {}
