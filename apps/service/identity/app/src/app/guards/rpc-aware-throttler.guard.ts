import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RpcAwareThrottlerGuard extends ThrottlerGuard {
  protected override async getTracker(req: Record<string, any>): Promise<string> {
    // Standard tracker for HTTP is often IP
    return req.ip;
  }

  override async handleRequest(requestProps: any): Promise<boolean> {
    const { context, limit, ttl, throttler } = requestProps;
    if (context.getType() === 'rpc') {
      const rpcContext = context.switchToRpc();
      const data = rpcContext.getData();
      const metadata = rpcContext.getContext();

      const tracker = metadata?.get?.('x-forwarded-for')?.[0] || data?.context?.ip || 'global-rpc';
      const key = this.generateKey(context, tracker, throttler.name);
      const { totalHits } = await this.storageService.increment(key, ttl, limit, 0, throttler.name);

      if (totalHits > limit) {
        throw new RpcException({
          code: 14,
          message: 'Rate limit exceeded',
        });
      }
      return true;
    }

    return super.handleRequest(requestProps);
  }
}
