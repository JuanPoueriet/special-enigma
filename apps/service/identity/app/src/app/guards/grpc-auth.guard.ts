import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { AuthService } from '@virtex/domain-identity-domain';

@Injectable()
export class GrpcAuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rpcContext = context.switchToRpc();
    const metadata = rpcContext.getContext();
    const data = rpcContext.getData();

    const accessToken = metadata?.get?.('access_token')?.[0] || data?.access_token;

    if (!accessToken) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'Missing access token',
      });
    }

    try {
      const payload = await this.authService.verifyToken(accessToken);
      const request = rpcContext.getData();
      request.user = payload;
      return true;
    } catch (e: any) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: e.message || 'Invalid token',
      });
    }
  }
}
