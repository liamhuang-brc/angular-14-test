/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
  },

  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },

  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|@angular|rxjs|jest-preset-angular)',
  ],

  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
  
  // Angular 15 specific configuration
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  
  // Ensure zone.js is properly handled
  moduleNameMapping: {
    '^zone.js/testing$': '<rootDir>/node_modules/zone.js/bundles/zone-testing-bundle.umd.js',
  },

};
