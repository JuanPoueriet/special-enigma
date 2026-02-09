import { adminContracts } from '@virteex/admin-contracts/lib/admin-contracts';

describe('adminContracts', () => {
  it('should work', () => {
    expect(adminContracts()).toEqual('admin-contracts');
  })
})
