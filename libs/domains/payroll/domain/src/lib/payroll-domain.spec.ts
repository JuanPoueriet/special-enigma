import { payrollDomain } from '@virteex/payroll-domain/lib/payroll-domain';

describe('payrollDomain', () => {
  it('should work', () => {
    expect(payrollDomain()).toEqual('payroll-domain');
  })
})
