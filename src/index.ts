import { config, DotenvConfigOptions } from 'dotenv';
import { DotenvExpandOptions, expand } from 'dotenv-expand';
import * as fs from 'fs';
import { resolve } from 'path';
import { UseEnvOptions } from './interfaces/types';

function checkGitIgnore(
  pathToGitIgnore: fs.PathLike = resolve(process.cwd(), '.gitignore'),
  encoding: BufferEncoding = 'utf8',
) {
  const gitIgnorePath = pathToGitIgnore;
  const gitIgnore = fs.readFileSync(gitIgnorePath).toString(encoding);

  if (!/(\.envs\/\*)|(\.envs\/)|(\.envs)/gm.test(gitIgnore)) {
    const newGitIgnore = `${gitIgnore}\n.envs/*\n.envs\n.envs/`;

    fs.writeFileSync(gitIgnorePath, newGitIgnore, {
      encoding,
      flag: 'w',
    });
  }
}

export default function envLoader(
  envNameInput = 'env',
  configOptions: UseEnvOptions = {
    debug: false,
    encoding: 'utf8',
    override: false,
    path: resolve(process.cwd()),
    enableExpand: true,
    ignoreProcessEnv: false,
    updateGitIgnore: true,
  },
) {
  const envName = envNameInput.split('.')[0];
  const dotEnvOptions: DotenvConfigOptions = {
    debug: configOptions.debug,
    encoding: configOptions.encoding,
    override: configOptions.override,
    path: configOptions.path,
  };

  if (configOptions.updateGitIgnore) {
    checkGitIgnore();
  }

  if (envName === 'env') {
    const envs = config(dotEnvOptions);
    if (configOptions.enableExpand) {
      const expandOptions: DotenvExpandOptions = {
        ignoreProcessEnv: configOptions.ignoreProcessEnv,
        error: envs.error,
        parsed: envs.parsed,
      };
      expand(expandOptions);
    }
  } else {
    const envDotDirPath = `${configOptions.path}` || process.cwd();
    const envEncoding: BufferEncoding = configOptions.encoding || 'utf8';
    const envDotFilePath = resolve(envDotDirPath, `.env.${envName}`);

    const envContents = fs.readFileSync(envDotFilePath, {
      encoding: envEncoding,
      flag: 'r',
    });

    const newEnvDirPath = `${process.cwd()}\\.envs\\${envName}`;
    fs.mkdirSync(newEnvDirPath, { recursive: true });

    const newEnvFilePath = `${newEnvDirPath}\\.env`;
    fs.writeFileSync(newEnvFilePath, envContents, {
      encoding: envEncoding,
      flag: 'w',
    });

    const newConfigOptions: UseEnvOptions = {
      encoding: envEncoding,
      debug: configOptions.debug,
      override: configOptions.override,
      path: newEnvFilePath,
      enableExpand: configOptions.enableExpand,
      ignoreProcessEnv: configOptions.ignoreProcessEnv,
    };
    envLoader('env', newConfigOptions);
  }
}
