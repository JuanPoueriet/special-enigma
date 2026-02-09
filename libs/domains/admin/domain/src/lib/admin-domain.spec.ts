import { adminDomain } from '@virteex/admin-domain/lib/admin-domain';

describe('adminDomain', () => {
  it('should work', () => {
    expect(adminDomain()).toEqual('admin-domain');
  })
})
