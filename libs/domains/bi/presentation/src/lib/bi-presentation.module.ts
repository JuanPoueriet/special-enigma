import { Module } from '@nestjs/common';
import { BiController } from './controllers/bi.controller';

@Module({
  controllers: [BiController],
})
export class BiPresentationModule {}
