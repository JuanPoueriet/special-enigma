import { payrollContracts } from '@virteex/payroll-contracts/lib/payroll-contracts';

describe('payrollContracts', () => {
  it('should work', () => {
    expect(payrollContracts()).toEqual('payroll-contracts');
  })
})
