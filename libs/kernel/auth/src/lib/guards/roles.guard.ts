import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = this.getUserFromContext(context);
    if (!user) {
      throw new ForbiddenException('User not authenticated for RBAC check');
    }

    const hasRole = requiredRoles.some((role) => user.role === role || (user.roles?.includes(role)));
    if (!hasRole) {
      throw new ForbiddenException('User does not have required permissions');
    }

    return true;
  }

  private getUserFromContext(context: ExecutionContext) {
    if (context.getType().toString() === 'rpc') {
      return context.switchToRpc().getData();
    }
    return context.switchToHttp().getRequest();
  }
}
