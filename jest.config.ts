import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // optional if using `@` path alias
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
};

export default config;
