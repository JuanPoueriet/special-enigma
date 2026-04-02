import { vi, describe, it, expect, beforeEach } from 'vitest';
import { CreateWarehouseUseCase } from './create-warehouse.use-case';
import { DomainValidationError } from '@virtex/domain-inventory-domain';

describe('CreateWarehouseUseCase', () => {
  let useCase: CreateWarehouseUseCase;
  let warehouseRepo: any;
  let entitlementService: any;

  beforeEach(() => {
    warehouseRepo = {
      findByCode: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
    };
    entitlementService = {
      checkQuota: vi.fn(),
    };

    useCase = new CreateWarehouseUseCase(warehouseRepo, entitlementService);
  });

  it('should throw error if code exists', async () => {
    warehouseRepo.findByCode.mockResolvedValue({ id: 'w1' });

    await expect(useCase.execute({ code: 'W1', name: 'N1', tenantId: 't1' } as any))
      .rejects.toThrow(DomainValidationError);
  });

  it('should call checkQuota and save if valid', async () => {
    warehouseRepo.findByCode.mockResolvedValue(null);
    warehouseRepo.findAll.mockResolvedValue([]);

    await useCase.execute({ code: 'W1', name: 'N1', tenantId: 't1' } as any);

    expect(entitlementService.checkQuota).toHaveBeenCalledWith('branches', 0);
    expect(warehouseRepo.save).toHaveBeenCalled();
  });
});
