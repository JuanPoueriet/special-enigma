import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class RpcAwareThrottlerGuard extends ThrottlerGuard {
  override async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType<'rpc' | 'http' | 'ws'>() === 'rpc') {
      return Promise.resolve(true);
    }

    return super.canActivate(context);
  }
}
