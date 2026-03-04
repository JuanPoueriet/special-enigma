import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FailoverService } from '../failover.service';
import { RoutingPlaneService } from '../routing-plane.service';
import { OperationState, TenantStatus } from '../interfaces/tenant-config.interface';
import axios from 'axios';

vi.mock('axios');

describe('Regional Failover Operational Validation', () => {
  let service: FailoverService;
  let mockEm: any;
  let mockOpService: any;
  let mockRoutingPlane: any;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env['EVIDENCE_SIGNING_SECRET'] = 'test-secret';
    (axios.get as any).mockResolvedValue({ status: 200 });

    mockEm = {
      findOneOrFail: vi.fn(),
      flush: vi.fn().mockResolvedValue(undefined),
      getConnection: vi.fn().mockReturnValue({
          execute: vi.fn().mockImplementation((query: string) => {
            if (query.includes('pg_last_xact_replay_timestamp')) return Promise.resolve([{ lag_ms: '0' }]);
            if (query.includes('COUNT(*)::int AS backlog')) return Promise.resolve([{ backlog: 0 }]);
            if (query.includes('COUNT(*)::bigint AS total_rows')) return Promise.resolve([{ total_rows: 10, pending_rows: 0 }]);
            return Promise.resolve([{ is_replica: false, lag_ms: '0' }]);
          })
      }),
      fork: vi.fn().mockReturnValue({
          getConnection: vi.fn().mockReturnValue({
              execute: vi.fn().mockResolvedValue([{ is_replica: false }])
          })
      })
    };
    mockOpService = {
      createOperation: vi.fn().mockResolvedValue({ operationId: 'fail-123' }),
      transitionState: vi.fn().mockResolvedValue(undefined),
      acquireLock: vi.fn().mockResolvedValue(true),
      releaseLock: vi.fn().mockResolvedValue(undefined),
    };
    mockRoutingPlane = {
      createSnapshot: vi.fn().mockResolvedValue({}),
      resolveRoute: vi.fn().mockResolvedValue({ version: 1 }),
    };
    const mockFinOps = {
      recordOperationSlo: vi.fn().mockResolvedValue(undefined),
    };
    service = new FailoverService(mockEm as any, mockOpService as any, mockRoutingPlane as any, mockFinOps as any);
  });

  it('SHOULD promote secondary region during failover', async () => {
    mockEm.findOneOrFail.mockResolvedValue({
      tenantId: 't1',
      primaryRegion: 'us-east-1',
      secondaryRegion: 'sa-east-1',
      status: TenantStatus.ACTIVE,
    });

    await service.triggerRegionalFailover('t1', 'key-1');

    expect(mockOpService.transitionState).toHaveBeenCalledWith('fail-123', OperationState.SWITCHED, expect.objectContaining({
        switchedTo: 'sa-east-1'
    }));
    expect(mockRoutingPlane.createSnapshot).toHaveBeenCalledWith('t1', expect.objectContaining({
      primaryRegion: 'sa-east-1',
      failoverActive: true
    }));
    expect(mockOpService.transitionState).toHaveBeenCalledWith('fail-123', OperationState.FINALIZED, expect.any(Object));
    expect(axios.get).toHaveBeenCalledWith('https://lb.sa-east-1.virteex.erp/v1/health/check', expect.any(Object));
  });

  it('SHOULD reject failover if already in degraded state', async () => {
    mockEm.findOneOrFail.mockResolvedValue({
      tenantId: 't1',
      status: TenantStatus.DEGRADED,
    });

    await expect(service.triggerRegionalFailover('t1', 'key-2')).rejects.toThrow(/already in failover state/);
  });

  it('SHOULD rollback failover operation if routing publish fails', async () => {
    mockEm.findOneOrFail.mockResolvedValue({
      tenantId: 't-fail',
      primaryRegion: 'us-east-1',
      secondaryRegion: 'sa-east-1',
      status: TenantStatus.ACTIVE,
    });
    mockRoutingPlane.createSnapshot.mockRejectedValue(new Error('KMS Failure'));

    await expect(service.triggerRegionalFailover('t-fail', 'key-3')).rejects.toThrow();

    expect(mockOpService.transitionState).toHaveBeenCalledWith('fail-123', OperationState.ROLLBACK, expect.any(Object));
  });
});
