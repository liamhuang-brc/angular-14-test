/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  globalSetup: 'jest-preset-angular/global-setup',

  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: 'tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },

  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)',
  ],

  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
};
