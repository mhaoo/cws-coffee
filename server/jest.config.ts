export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        diagnostics: true,
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  // collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.ts"],
  // coverageDirectory: "coverage",
  // coverageReporters: ["text", "lcov", "clover"],
};
