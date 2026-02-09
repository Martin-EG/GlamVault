/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',

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
    '<rootDir>/src/test-utils.tsx',
  ],
}