import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '@virtex/kernel-auth';
import { FiscalInfrastructureModule } from '@virtex/domain-fiscal-infrastructure';
import { PAC_STRATEGY_FACTORY, TENANT_CONFIG_REPOSITORY, INVOICE_REPOSITORY, PAYMENT_METHOD_REPOSITORY, PRODUCT_REPOSITORY, CUSTOMER_REPOSITORY, BillingDomainModule, FISCAL_STAMPING_PORT } from '@virtex/domain-billing-domain';
import { FISCAL_DOCUMENT_BUILDER_FACTORY } from '@virtex/domain-fiscal-domain';
import { BILLING_TAX_STRATEGY_FACTORY } from '@virtex/domain-billing-domain';

import { FinkokPacProvider } from './integrations/adapters/finkok-pac.provider';
import { NullPacProvider } from './integrations/adapters/null-pac.provider';
import { PacStrategyFactoryImpl } from './integrations/adapters/pac-strategy.factory';
import { FiscalDocumentBuilderFactoryImpl } from './integrations/adapters/fiscal-document-builder.factory';
import { TaxStrategyFactoryImpl } from './integrations/adapters/tax-strategy.factory';

import { MxTaxStrategy } from './integrations/adapters/mx-tax.strategy';
import { BrTaxStrategy } from './integrations/adapters/br-tax.strategy';
import { UsTaxStrategy } from './integrations/adapters/us-tax.strategy';
import { DoTaxStrategy } from './integrations/adapters/do-tax.strategy';

import { MikroOrmInvoiceRepository } from './persistence/repositories/mikro-orm-invoice.repository';
import { MikroOrmPaymentMethodRepository } from './persistence/repositories/mikro-orm-payment-method.repository';
import { MikroOrmTenantConfigRepository } from './persistence/repositories/mikro-orm-tenant-config.repository';
import { LocalProductRepository } from './persistence/repositories/local-product.repository';
import { HttpCustomerRepository } from './persistence/repositories/http-customer.repository';
import { StripePaymentProvider } from './integrations/adapters/stripe-payment-provider.adapter';
import { InvoiceIntegrationPublisher } from './messaging/producers/invoice-integration.publisher';

import { BillingProductEntity } from './persistence/entities/billing-product.entity';
import { InvoiceRecord } from './persistence/entities/invoice.record';
import { InvoiceItemRecord } from './persistence/entities/invoice-item.record';
import { ProductEventsController } from './messaging/consumers/product-events.controller';

import { XsltService } from '@virtex/platform-xslt';
import { INVOICE_INTEGRATION_PUBLISHER } from '@virtex/domain-billing-application';
import { PaymentMethodSchema, TaxLineSchema, TaxRuleSchema } from './persistence/orm/mikro-orm.schemas';
import { EntitlementsModule } from '@virtex/kernel-entitlements';

@Global()
@Module({
  imports: [
    AuthModule,
    EntitlementsModule,
    FiscalInfrastructureModule,
    BillingDomainModule,
    MikroOrmModule.forFeature([
      InvoiceRecord,
      InvoiceItemRecord,
      PaymentMethodSchema,
      TaxLineSchema,
      TaxRuleSchema,
      BillingProductEntity,
    ]),
  ],
  controllers: [ProductEventsController],
  providers: [
    {
      provide: INVOICE_REPOSITORY,
      useClass: MikroOrmInvoiceRepository,
    },
    {
      provide: PAYMENT_METHOD_REPOSITORY,
      useClass: MikroOrmPaymentMethodRepository,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: LocalProductRepository,
    },
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: HttpCustomerRepository,
    },
    FinkokPacProvider,
    NullPacProvider,
    {
      provide: PAC_STRATEGY_FACTORY,
      useClass: PacStrategyFactoryImpl,
    },
    {
      provide: TENANT_CONFIG_REPOSITORY,
      useClass: MikroOrmTenantConfigRepository,
    },
    {
      provide: 'PaymentProvider',
      useClass: StripePaymentProvider,
    },
    {
      provide: INVOICE_INTEGRATION_PUBLISHER,
      useClass: InvoiceIntegrationPublisher,
    },
    // Xslt Service
    XsltService,
    // Note: Builders are now provided by FiscalInfrastructureModule
    {
      provide: FISCAL_STAMPING_PORT,
      useClass: FiscalDocumentBuilderFactoryImpl,
    },
    {
        provide: FISCAL_DOCUMENT_BUILDER_FACTORY,
        useExisting: FISCAL_STAMPING_PORT,
    },
    // Strategies
    MxTaxStrategy,
    BrTaxStrategy,
    UsTaxStrategy,
    DoTaxStrategy,
    {
      provide: BILLING_TAX_STRATEGY_FACTORY,
      useClass: TaxStrategyFactoryImpl,
    },
  ],
  exports: [
    INVOICE_REPOSITORY,
    PAYMENT_METHOD_REPOSITORY,
    PRODUCT_REPOSITORY,
    CUSTOMER_REPOSITORY,
    PAC_STRATEGY_FACTORY,
    TENANT_CONFIG_REPOSITORY,
    FISCAL_STAMPING_PORT,
    FISCAL_DOCUMENT_BUILDER_FACTORY,
    BILLING_TAX_STRATEGY_FACTORY,
    MikroOrmModule,
    FinkokPacProvider,
    NullPacProvider,
    'PaymentProvider',
    INVOICE_INTEGRATION_PUBLISHER,
  ],
})
export class BillingInfrastructureModule {}
