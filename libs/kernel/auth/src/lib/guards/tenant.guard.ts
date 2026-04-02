import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TenantContext } from '@virtex/kernel-tenant-context';
import '../interfaces/express.interface';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    let request;
    if (context.getType().toString() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req;
    } else {
      request = context.switchToHttp().getRequest();
    }

    const tenantId = request.headers['x-virtex-tenant-id'] || request.headers['x-tenant-id'];
    const tenantContext: TenantContext = request.tenantContext;

    if (!tenantId) {
      throw new ForbiddenException('Tenant identification is required for this operation.');
    }

    if (!tenantContext) {
      throw new ForbiddenException('Security context is missing.');
    }

    if (tenantId !== tenantContext.tenantId) {
      throw new ForbiddenException('Tenant context integrity violation.');
    }

    return true;
  }
}
