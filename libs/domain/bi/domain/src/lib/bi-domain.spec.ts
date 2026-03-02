import { describe, it, expect } from 'vitest';
import { biDomain } from './bi-domain';

describe('biDomain', () => {
  it('should work', () => {
    expect(biDomain()).toEqual('bi-domain');
  });
});
