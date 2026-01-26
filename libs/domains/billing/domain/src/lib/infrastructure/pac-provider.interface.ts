export interface FiscalStamp {
  uuid: string;
  selloSAT: string;
  selloCFD: string;
  fechaTimbrado: string;
  xml: string; // The full XML with the TimbreFiscalDigital node
}

export interface PacProvider {
  stamp(xml: string): Promise<FiscalStamp>;
  cancel(uuid: string): Promise<boolean>;
}
