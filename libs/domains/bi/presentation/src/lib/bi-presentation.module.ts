import { Module } from '@nestjs/common';
import { BiController } from './controllers/bi.controller';
import { BiApplicationModule } from '@virteex/bi-application';

@Module({
  imports: [BiApplicationModule],
  controllers: [BiController],
})
export class BiPresentationModule {}
