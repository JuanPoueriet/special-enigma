export interface TenantResolver {
  resolve(context: any): string;
}

export class HeaderTenantResolver implements TenantResolver {
  resolve(request: any): string {
    return request.headers['x-tenant-id'] || 'default-tenant';
  }
}
