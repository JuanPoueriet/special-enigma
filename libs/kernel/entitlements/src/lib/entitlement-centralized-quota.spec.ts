import { vi, describe, it, expect, beforeEach } from 'vitest';
import { EntitlementService, UsageProvider } from './entitlement.service';
import { getTenantContext } from '@virtex/kernel-auth';

vi.mock('@virtex/kernel-auth', () => ({
  getTenantContext: vi.fn(),
}));

describe('EntitlementService Quota', () => {
  let service: EntitlementService;
  let subscriptionRepository: any;

  beforeEach(() => {
    subscriptionRepository = {
      findByTenantId: vi.fn(),
    };
    service = new EntitlementService(subscriptionRepository);
  });

  it('should use provided currentCount if available', async () => {
    (getTenantContext as any).mockReturnValue({ tenantId: 't1' });
    subscriptionRepository.findByTenantId.mockResolvedValue({
      isValid: () => true,
      getPlan: () => ({ limits: [{ resource: 'users', limit: 10, period: 'lifetime' }] }),
    });

    await expect(service.checkQuota('users', 5)).resolves.not.toThrow();
    await expect(service.checkQuota('users', 10)).rejects.toThrow(/Quota exceeded/);
  });

  it('should use registered UsageProvider if currentCount is missing', async () => {
    (getTenantContext as any).mockReturnValue({ tenantId: 't1' });
    subscriptionRepository.findByTenantId.mockResolvedValue({
      isValid: () => true,
      getPlan: () => ({ limits: [{ resource: 'users', limit: 10, period: 'lifetime' }] }),
    });

    const mockProvider: UsageProvider = {
      getResource: () => 'users',
      countUsage: vi.fn().mockResolvedValue(7),
    };
    service.registerUsageProvider(mockProvider);

    await expect(service.checkQuota('users')).resolves.not.toThrow();
    expect(mockProvider.countUsage).toHaveBeenCalledWith('t1', 'lifetime');

    (mockProvider.countUsage as any).mockResolvedValue(10);
    await expect(service.checkQuota('users')).rejects.toThrow(/Quota exceeded/);
  });

  it('should throw if no provider and no currentCount', async () => {
    (getTenantContext as any).mockReturnValue({ tenantId: 't1' });
    subscriptionRepository.findByTenantId.mockResolvedValue({
      isValid: () => true,
      getPlan: () => ({ limits: [{ resource: 'something', limit: 10 }] }),
    });

    await expect(service.checkQuota('something')).rejects.toThrow(/No usage provider registered/);
  });

  it('should handle unlimited limits (-1)', async () => {
    (getTenantContext as any).mockReturnValue({ tenantId: 't1' });
    subscriptionRepository.findByTenantId.mockResolvedValue({
      isValid: () => true,
      getPlan: () => ({ limits: [{ resource: 'users', limit: -1 }] }),
    });

    await expect(service.checkQuota('users', 9999)).resolves.not.toThrow();
  });
});
