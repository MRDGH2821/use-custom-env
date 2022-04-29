import { DotenvConfigOptions } from 'dotenv';

export type UseEnvOptions = {
  DotEnvOptions: DotenvConfigOptions;
  ignoreProcessEnv?: false;
  EnableExpand?: true;
};
