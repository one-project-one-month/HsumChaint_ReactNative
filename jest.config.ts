import type { Config } from "jest";

const isCI = process.env.CI === "true";

const config: Config = {
  preset: "jest-expo",
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  watchPathIgnorePatterns: ["/node_modules/", "/app/"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|escape-string-regexp|expo-router|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|react-native-svg)",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    // Only measure coverage on testable business logic
    "src/components/**/*.{ts,tsx}",
    "src/hooks/**/*.{ts,tsx}",
    "src/lib/**/*.{ts,tsx}",
    // Exclusions
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.web.{ts,tsx}",   // platform-specific variants
    "!src/**/*.ios.{ts,tsx}",
    "!src/**/*.android.{ts,tsx}",
  ],
  // HTML report is skipped on CI to save time and disk space
  coverageReporters: isCI ? ["lcov", "text"] : ["lcov", "html", "text"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      // Realistic target for a small team / one-month project.
      // Raise gradually as test coverage grows.
      statements: 35,
      branches: 35,
      functions: 35,
      lines: 35,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@assets/(.*)$": "<rootDir>/assets/$1",
  },
  testPathIgnorePatterns: ["node_modules/"],
};

export default config;
