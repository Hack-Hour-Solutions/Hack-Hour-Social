import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: "jsdom",
  setupFiles: ['./jestEnvVars.ts']
};

export default config;