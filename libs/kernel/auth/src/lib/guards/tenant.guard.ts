import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantContext } from '@virteex/auth/lib/interfaces/tenant-context.interface';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tenantContext: TenantContext = (request as any).tenantContext;

    if (!tenantContext) {
      throw new UnauthorizedException('Missing Tenant Context');
    }

    // Additional validation could happen here (e.g. check if tenant is active)
    return true;
  }
}
