export interface FiscalStampingResult {
  uuid: string;
  xml: string;
  stampedAt: Date;
}

export interface FiscalStampingPort {
  stamp(payroll: any, tenantConfig: any): Promise<FiscalStampingResult>;
}

export const FISCAL_STAMPING_PORT = Symbol('FISCAL_STAMPING_PORT');
