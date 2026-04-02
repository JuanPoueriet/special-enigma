import { BadRequestException } from '@nestjs/common';
import { type UserPayload } from '@virtex/kernel-auth';

export function resolveTenantId(user: UserPayload): string {
  if (!user.tenantId) {
    throw new BadRequestException('Tenant ID is required in authenticated context');
  }
  return user.tenantId;
}
