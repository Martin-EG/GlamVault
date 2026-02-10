/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',

  coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/GlamUI/components/Icons',
    '<rootDir>/src/app/',
    '<rootDir>/src/features/',
    '<rootDir>/src/lib/',
    '<rootDir>/src/providers/',
    '<rootDir>/src/utils/test-utils.tsx',
    '<rootDir>/src/GlamUI/components/Icon',
  ],
}