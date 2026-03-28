import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MikroOrmAccountRepository } from './mikro-orm-account.repository';
import { Account, AccountType } from '@virteex/domain-accounting-domain';
import { EntityManager } from '@mikro-orm/core';

describe('MikroOrmAccountRepository', () => {
  let repository: MikroOrmAccountRepository;
  let em: EntityManager;

  const mockEm = {
    persistAndFlush: vi.fn().mockResolvedValue(undefined),
    findOne: vi.fn(),
    find: vi.fn(),
  };

  beforeEach(() => {
    em = mockEm as unknown as EntityManager;
    repository = new MikroOrmAccountRepository(em);
  });

  it('should create an account', async () => {
    const account = new Account('tenant-1', '101', 'Cash', AccountType.ASSET);
    account.id = 'uuid-1';

    const result = await repository.create(account);

    expect(mockEm.persistAndFlush).toHaveBeenCalledWith(account);
    expect(result).toBe(account);
  });

  it('should find an account by code', async () => {
    const tenantId = 'tenant-1';
    const code = '101';
    const account = new Account(tenantId, code, 'Cash', AccountType.ASSET);

    mockEm.findOne.mockResolvedValue(account);

    const result = await repository.findByCode(tenantId, code);

    expect(mockEm.findOne).toHaveBeenCalledWith(Account, { tenantId, code });
    expect(result).toBe(account);
  });

  it('should find all accounts for a tenant', async () => {
    const tenantId = 'tenant-1';
    const accounts = [new Account(tenantId, '101', 'Cash', AccountType.ASSET)];

    mockEm.find.mockResolvedValue(accounts);

    const result = await repository.findAll(tenantId);

    expect(mockEm.find).toHaveBeenCalledWith(Account, { tenantId });
    expect(result).toBe(accounts);
  });
});
