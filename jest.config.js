/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: 'tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$'
      }
    ]
  },

  transformIgnorePatterns: [
    'node_modules/(?!(@angular|rxjs|jest-preset-angular)/)',
  ],

  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
};
