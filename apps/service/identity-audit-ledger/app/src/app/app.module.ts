
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainIdentityAuditLedgerPresentationModule } from '@virtex/domain-identity-audit-ledger-presentation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DomainIdentityAuditLedgerPresentationModule,
  ],
})
export class AppModule {}
