export class FiscalDomainService {
  async verifyInvoiceLegalStatus(invoiceId: string, tenantId: string): Promise<string> {
    return 'VALID'; // Stub
  }
}
