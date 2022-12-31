/** @type {import('jest').Config} */
module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  setupFilesAfterEnv: ['./src/setupTests.ts', 'jest-localstorage-mock'],
};
