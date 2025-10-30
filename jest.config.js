module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  globals: {},
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.spec.ts', '**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  coverageDirectory: '<rootDir>/coverage/',
  coverageReporters: ['html'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/environments/**/*.ts',
  ],
};