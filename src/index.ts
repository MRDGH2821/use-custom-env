import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import * as fs from 'fs/promises';
import { resolve } from 'path';
import { UseEnvOptions } from './interfaces/types';

const defaultConfigOptions: UseEnvOptions = {
  DotEnvOptions: {
    debug: false,
    encoding: 'utf8',
    override: false,
    path: resolve(process.cwd()),
  },
  EnableExpand: true,
  ignoreProcessEnv: false,
};

export default async function envLoader(
  envNameInput = 'env',
  configOptions = defaultConfigOptions,
) {
  const envName = envNameInput.split('.')[0];

  if (envName === 'env') {
    const envs = config(configOptions.DotEnvOptions);
    if (configOptions.EnableExpand) {
      const expandOptions = {
        ignoreProcessEnv: configOptions.ignoreProcessEnv,
        error: envs.error,
        parsed: envs.parsed,
      };
      expand(expandOptions);
    }
  } else {
    const envDotDirPath = configOptions.DotEnvOptions.path || process.cwd();
    const envEncoding = configOptions.DotEnvOptions.encoding || 'utf8';
    const envDotFilePath = resolve(envDotDirPath, `.env.${envName}`);
    const envContents = await fs.readFile(envDotFilePath);

    const newEnvDirPath = `${process.cwd()}\\.envs\\${envName}`;
    await fs
      .mkdir(newEnvDirPath)
      .then(() => console.log(`Made directory: ${newEnvDirPath}`));
    const newEnvFilePath = `${newEnvDirPath}\\.env`;
    await fs.writeFile(newEnvFilePath, envContents, envEncoding);

    const newConfigOptions: UseEnvOptions = {
      DotEnvOptions: {
        encoding: envEncoding,
        debug: configOptions.DotEnvOptions.debug,
        override: configOptions.DotEnvOptions.override,
        path: newEnvDirPath,
      },
      EnableExpand: configOptions.EnableExpand,
      ignoreProcessEnv: configOptions.ignoreProcessEnv,
    };
    await envLoader('env', newConfigOptions);
  }
}
