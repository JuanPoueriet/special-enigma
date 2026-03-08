import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';

export interface UserPayload extends JwtPayload {
  userId: string;
  email: string;
  tenantId?: string;
  roles?: string[];
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const CurrentTenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenantContext?.tenantId || request.headers['x-virteex-tenant-id'];
  },
);
