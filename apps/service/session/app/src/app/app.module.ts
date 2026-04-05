
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainSessionPresentationModule } from '@virtex/domain-session-presentation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DomainSessionPresentationModule,
  ],
})
export class AppModule {}
