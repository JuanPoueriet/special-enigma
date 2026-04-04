import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EntitlementService } from './entitlement.service';
import { ENTITLEMENT_KEY } from './require-entitlement.decorator';

@Injectable()
export class EntitlementGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private entitlementService: EntitlementService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFeature = this.reflector.getAllAndOverride<string>(ENTITLEMENT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredFeature) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const tenantId = request.tenantContext?.tenantId || user?.tenantId;

    if (!tenantId) {
        throw new ForbiddenException('Tenant context required for authorization.');
    }

    const isPlanEnabled = await this.entitlementService.isFeatureEnabled(requiredFeature);
    if (!isPlanEnabled) {
      throw new ForbiddenException(`Access to capability '${requiredFeature}' requires an upgraded plan.`);
    }

    // Explicit binding check: ensure user has the required feature. Fail-closed if entitlements are missing.
    if (!user || !user.entitlements || user.entitlements.length === 0) {
        throw new ForbiddenException(`User does not have the required entitlements for: '${requiredFeature}'.`);
    }

    const hasUserEntitlement = user.entitlements.includes(requiredFeature) ||
                                user.entitlements.includes('*') ||
                                user.entitlements.some((e: string) => {
                                    const [eCap, eAct] = e.split(':');
                                    const [reqCap, reqAct] = requiredFeature.split(':');
                                    return eCap === reqCap && (eAct === '*' || eAct === reqAct);
                                });

    if (!hasUserEntitlement) {
        throw new ForbiddenException(`User does not have the required entitlement: '${requiredFeature}'.`);
    }

    return true;
  }
}
