module.exports = {
  displayName: 'virteex-plugin-host',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'node'],
  coverageDirectory: '../../coverage/apps/virteex-plugin-host',
};
