import { treasuryDomain } from '@virteex/treasury-domain/lib/treasury-domain';

describe('treasuryDomain', () => {
  it('should work', () => {
    expect(treasuryDomain()).toEqual('treasury-domain');
  })
})
