import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EntitlementService } from '@virtex/kernel-entitlements';
import { CAPABILITIES_KEY } from './requires-capability.decorator';

@Injectable()
export class CapabilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private entitlementService: EntitlementService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredCapabilities = this.reflector.getAllAndOverride<string[]>(CAPABILITIES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredCapabilities) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }

    // Check all required capabilities against the EntitlementService (Plan-based enforcement)
    const entitlementResults = await Promise.all(
      requiredCapabilities.map(capability => this.entitlementService.isFeatureEnabled(capability))
    );

    if (!entitlementResults.every(res => res)) {
      return false;
    }

    // Also ensure user has the technical permission if defined (Role-based enforcement)
    // This unifies Plan (Commercial) + Permission (Technical)
    if (user.permissions) {
      return requiredCapabilities.every((capability) => user.permissions.includes(capability));
    }

    // If user has no permissions array but plan allows it, we might want to fail-closed
    // or check roles. For now, we follow the existing logic of requiring permission.
    return false;
  }
}
