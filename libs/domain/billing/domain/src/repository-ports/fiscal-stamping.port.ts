export const FISCAL_STAMPING_PORT = Symbol('FISCAL_STAMPING_PORT');

export interface FiscalStampingPort {
  getBuilder(country: string): any;
}
