import { fiscalDomain } from '@virteex/fiscal-domain/lib/fiscal-domain';

describe('fiscalDomain', () => {
  it('should work', () => {
    expect(fiscalDomain()).toEqual('fiscal-domain');
  })
})
