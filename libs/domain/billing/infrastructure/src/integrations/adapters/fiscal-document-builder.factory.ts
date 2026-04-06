import { Injectable, Inject } from '@nestjs/common';
import { FiscalStampingPort } from '@virtex/domain-billing-domain';
import { FISCAL_DOCUMENT_BUILDER_FACTORY, FiscalDocumentBuilderFactory, FiscalDocumentBuilder } from '@virtex/domain-fiscal-domain';

@Injectable()
export class FiscalDocumentBuilderFactoryImpl implements FiscalStampingPort {
    constructor(
        @Inject(FISCAL_DOCUMENT_BUILDER_FACTORY) private readonly fiscalFactory: FiscalDocumentBuilderFactory
    ) {}

    getBuilder(country: string): FiscalDocumentBuilder {
        return this.fiscalFactory.getBuilder(country);
    }
}
