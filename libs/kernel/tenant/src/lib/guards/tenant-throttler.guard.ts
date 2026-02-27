import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerOptions } from '@nestjs/throttler';
import { getTenantContext } from '@virteex/kernel-auth';

@Injectable()
export class TenantThrottlerGuard extends ThrottlerGuard {
  protected override async getTracker(req: Record<string, any>): Promise<string> {
    const tenantContext = getTenantContext();
    const tenantId = tenantContext?.tenantId ?? 'public';
    const userId = req['user']?.sub ?? 'anonymous';
    const ip = req['ips']?.length ? req['ips'][0] : req['ip'] ?? 'unknown-ip';
    const route = req['route']?.path ?? req['originalUrl'] ?? 'unknown-route';
    const method = req['method'] ?? 'GET';
    const riskTier = this.resolveRiskTier(route, method);

    return `${riskTier}:${tenantId}:${userId}:${ip}:${method}:${route}`;
  }

  protected override async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
    throttler: ThrottlerOptions,
  ): Promise<boolean> {
    const handler = context.getHandler();
    const classRef = context.getClass();

    // Check for custom metadata limits
    const customLimit = this.reflector.get<number>('THROTTLER_LIMIT', handler) ||
                        this.reflector.get<number>('THROTTLER_LIMIT', classRef);
    const customTTL = this.reflector.get<number>('THROTTLER_TTL', handler) ||
                      this.reflector.get<number>('THROTTLER_TTL', classRef);

    return super.handleRequest(context, customLimit || limit, customTTL || ttl, throttler);
  }

  private resolveRiskTier(route: string, method: string): 'critical' | 'sensitive' | 'normal' {
    const normalized = `${method}:${route}`.toLowerCase();
    if (normalized.includes('login') || normalized.includes('refresh') || normalized.includes('password')) {
      return 'critical';
    }
    if (normalized.includes('export') || normalized.includes('webhook') || normalized.includes('plugin')) {
      return 'sensitive';
    }
    return 'normal';
  }
}
