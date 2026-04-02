import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

interface GetInvoiceRequest {
  id: string;
}

interface Invoice {
  id: string;
  tenantId: string;
  amount: number;
  status: string;
}

@Controller()
export class BillingGrpcController {
  @GrpcMethod('BillingService', 'GetInvoice')
  async getInvoice(data: GetInvoiceRequest): Promise<Invoice> {
    return {
      id: data.id,
      tenantId: 'tenant-1',
      amount: 100.0,
      status: 'PAID',
    };
  }
}
