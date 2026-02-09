import { payrollInfrastructure } from '@virteex/payroll-infrastructure/lib/payroll-infrastructure';

describe('payrollInfrastructure', () => {
  it('should work', () => {
    expect(payrollInfrastructure()).toEqual('payroll-infrastructure');
  })
})
