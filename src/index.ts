import { config, DotenvConfigOptions } from 'dotenv';
import { expand } from 'dotenv-expand';
import * as fs from 'fs';
import { resolve } from 'path';
import { UseEnvOptions } from './interfaces/types';

const defaultConfigOptions: UseEnvOptions = {
  debug: false,
  encoding: 'utf8',
  override: false,
  path: resolve(process.cwd()),
  enableExpand: true,
  ignoreProcessEnv: false,
};

export default async function envLoader(
  envNameInput = 'env',
  configOptions = defaultConfigOptions,
) {
  const envName = envNameInput.split('.')[0];
  const dotEnvOptions: DotenvConfigOptions = {
    debug: configOptions.debug,
    encoding: configOptions.encoding,
    override: configOptions.override,
    path: configOptions.path,
  };

  if (envName === 'env') {
    const envs = config(dotEnvOptions);
    if (configOptions.enableExpand) {
      const expandOptions = {
        ignoreProcessEnv: configOptions.ignoreProcessEnv,
        error: envs.error,
        parsed: envs.parsed,
      };
      expand(expandOptions);
    }
  } else {
    const envDotDirPath = configOptions.path || process.cwd();
    const envEncoding = configOptions.encoding || 'utf8';
    const envDotFilePath = resolve(envDotDirPath, `.env.${envName}`);
    const envContents = fs.readFileSync(envDotFilePath);

    const newEnvDirPath = `${process.cwd()}\\.envs\\${envName}`;
    fs.mkdirSync(newEnvDirPath);

    const newEnvFilePath = `${newEnvDirPath}\\.env`;
    fs.writeFileSync(newEnvFilePath, envContents, envEncoding);

    const newConfigOptions: UseEnvOptions = {
      encoding: envEncoding,
      debug: configOptions.debug,
      override: configOptions.override,
      path: newEnvDirPath,
      enableExpand: configOptions.enableExpand,
      ignoreProcessEnv: configOptions.ignoreProcessEnv,
    };
    await envLoader('env', newConfigOptions);
  }
}
