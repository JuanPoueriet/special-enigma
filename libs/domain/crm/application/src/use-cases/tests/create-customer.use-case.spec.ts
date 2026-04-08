import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateCustomerUseCase } from '../commands/create-customer.use-case';

vi.mock('@virtex/domain-crm-domain', () => ({
  Customer: class {
    tenantId: string;
    type: string;
    companyName?: string;
    email?: string;
    phone?: string;
    taxId?: string;
    contactPerson?: string;
    address?: string;
    city?: string;
    stateOrProvince?: string;
    postalCode?: string;
    country?: string;

    constructor(tenantId: string, type: string) {
      this.tenantId = tenantId;
      this.type = type;
    }
  },
}));

vi.mock('@virtex/shared-contracts', () => ({
  CustomerType: {
    COMPANY: 'COMPANY',
  },
}));

describe('CreateCustomerUseCase', () => {
  let repository: any;
  let useCase: CreateCustomerUseCase;

  beforeEach(() => {
    repository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
    };
    useCase = new CreateCustomerUseCase(repository);
  });

  it('reuses customer when email already exists for tenant', async () => {
    const existing = { id: 'cust-1', email: 'existing@example.com' };
    repository.findByEmail.mockResolvedValue(existing);

    const result = await useCase.execute({
      tenantId: 'tenant-1',
      companyName: 'Company',
      email: 'Existing@Example.com',
      phone: '123',
      taxId: '101656204',
    });

    expect(repository.findByEmail).toHaveBeenCalledWith(
      'tenant-1',
      'existing@example.com',
    );
    expect(repository.create).not.toHaveBeenCalled();
    expect(result).toBe(existing);
  });
});
