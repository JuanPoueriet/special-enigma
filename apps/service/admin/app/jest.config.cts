module.exports = {
  displayName: 'virtex-admin-service',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@scure|otplib|@noble)/)'
  ],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/virtex-admin-service'
};
