var preset = require("jest-preset-angular/jest-preset");
module.exports = {
  ...preset,
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/node_modules/jest-preset-angular/build/setupJest.js",
    "jest-allure/dist/setup"
  ],
  testMatch: ["**/*.spec.ts"],
  globals: {
    ...preset.globals,
    "ts-jest": {
      ...preset.globals["ts-jest"],
      tsConfig: "tsconfig.test.json",
      isolatedModules: true
    }
  },
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test_results',
      outputName: 'obi-frontend-test-result.xml'
    }]
  ],
  setupFiles: [
    "jest-canvas-mock",
    "./setup-jest.ts"
  ],
};
