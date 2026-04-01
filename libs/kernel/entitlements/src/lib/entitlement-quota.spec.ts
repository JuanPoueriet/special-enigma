import { vi, describe, it, expect, beforeEach } from 'vitest';
import { EntitlementService } from './entitlement.service';
import { getTenantContext } from '@virteex/kernel-auth';

vi.mock('@virteex/kernel-auth', () => ({
  getTenantContext: vi.fn(),
}));

describe('EntitlementService Quota Period', () => {
  let service: EntitlementService;
  let subscriptionRepository: any;

  beforeEach(() => {
    subscriptionRepository = {
      findByTenantId: vi.fn(),
    };
    service = new EntitlementService(subscriptionRepository);
  });

  it('should throw with period context if quota exceeded for monthly limit', async () => {
    (getTenantContext as any).mockReturnValue({ tenantId: 't1' });
    subscriptionRepository.findByTenantId.mockResolvedValue({
      isValid: () => true,
      getPlan: () => ({
        limits: [{ id: '1', resource: 'invoices', limit: 10, period: 'monthly' }]
      }),
    });

    await expect(service.checkQuota('invoices', 10)).rejects.toThrow('Quota exceeded for invoices (this month). Limit: 10, Current: 10');
  });

  it('should throw with period context if quota exceeded for lifetime limit', async () => {
    (getTenantContext as any).mockReturnValue({ tenantId: 't1' });
    subscriptionRepository.findByTenantId.mockResolvedValue({
      isValid: () => true,
      getPlan: () => ({
        limits: [{ id: '2', resource: 'users', limit: 5, period: 'lifetime' }]
      }),
    });

    await expect(service.checkQuota('users', 5)).rejects.toThrow('Quota exceeded for users (lifetime). Limit: 5, Current: 5');
  });

  it('should not throw if limit is -1 (unlimited)', async () => {
    (getTenantContext as any).mockReturnValue({ tenantId: 't1' });
    subscriptionRepository.findByTenantId.mockResolvedValue({
      isValid: () => true,
      getPlan: () => ({
        limits: [{ id: '3', resource: 'storage', limit: -1, period: 'monthly' }]
      }),
    });

    await expect(service.checkQuota('storage', 1000)).resolves.not.toThrow();
  });

  it('should throw if resource is not in plan (deny by default)', async () => {
    (getTenantContext as any).mockReturnValue({ tenantId: 't1' });
    subscriptionRepository.findByTenantId.mockResolvedValue({
      isValid: () => true,
      getPlan: () => ({ limits: [] }), // No limits defined
    });

    await expect(service.checkQuota('invoices', 1)).rejects.toThrow('Quota exceeded for invoices (lifetime). Limit: 0, Current: 1');
  });
});
