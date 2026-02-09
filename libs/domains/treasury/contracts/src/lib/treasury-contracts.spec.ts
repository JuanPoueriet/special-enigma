import { treasuryContracts } from '@virteex/treasury-contracts/lib/treasury-contracts';

describe('treasuryContracts', () => {
  it('should work', () => {
    expect(treasuryContracts()).toEqual('treasury-contracts');
  })
})
