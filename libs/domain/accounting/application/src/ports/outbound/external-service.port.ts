export interface ExternalServicePort {
  checkExternalStatus(id: string): Promise<boolean>;
}
