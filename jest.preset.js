const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  moduleNameMapper: {
    '^@virteex/domain-accounting-domain$': '<rootDir>/../../../../libs/domain/accounting/domain/src/index.ts',
    '^@virteex/domain-accounting-contracts$': '<rootDir>/../../../../libs/domain/accounting/contracts/src/index.ts',
  }
};
