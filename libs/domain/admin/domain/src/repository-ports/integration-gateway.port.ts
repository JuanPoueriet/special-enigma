export interface ProductDto {
  sku: string;
  name: string;
  price: number;
  tenantId: string;
}

export interface CustomerDto {
  email: string;
  name: string;
  taxId?: string;
  tenantId: string;
}

export interface SupplierDto {
  email: string;
  name: string;
  taxId?: string;
  tenantId: string;
}

export interface IntegrationGateway {
  createProduct(dto: ProductDto): Promise<void>;
  createCustomer(dto: CustomerDto): Promise<void>;
  createSupplier(dto: SupplierDto): Promise<void>;
}

export const INTEGRATION_GATEWAY = 'INTEGRATION_GATEWAY';
