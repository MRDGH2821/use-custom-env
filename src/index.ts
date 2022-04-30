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

  const isIgnored = gitIgnore.match('.envs');

  // const regex = new RegExp(`\\b${envFolderName}\\b`, 'gm'); // /.envs\/*\**/gm;
  if (isIgnored?.length === 0 || isIgnored === undefined || isIgnored === null) {
    const newGitIgnore = `${gitIgnore}\n.envs`;

    fs.writeFileSync(gitIgnorePath, newGitIgnore, {
      encoding,
      flag: 'w',
    });
  }
}

// eslint-disable-next-line import/prefer-default-export
export function useEnv(
  configOptions: UseEnvOptions = {
    enableExpand: true,
    ignoreProcessEnv: false,
    updateGitIgnore: true,
  },
) {
  const envName = configOptions.envNameInput;
  const dotEnvOptions: DotenvConfigOptions = {
    debug: configOptions.debug,
    encoding: configOptions.encoding,
    override: configOptions.override,
    path: resolve((configOptions.path as string) || process.cwd()),
  };
  console.log(dotEnvOptions, configOptions);
  if (configOptions.updateGitIgnore) {
    checkGitIgnore();
  }

  if (envName === 'env' || envName === null || envName === undefined) {
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
    const envDotDirPath = (configOptions.path as string) || process.cwd();
    const envEncoding: BufferEncoding = (configOptions.encoding as BufferEncoding) || 'utf8';
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
      encoding: envEncoding || 'utf8',
      debug: configOptions.debug || false,
      override: configOptions.override || false,
      path: newEnvFilePath,
      enableExpand: configOptions.enableExpand || true,
      ignoreProcessEnv: configOptions.ignoreProcessEnv || false,
      updateGitIgnore: configOptions.updateGitIgnore || true,
    };
    useEnv(newConfigOptions);
  }
}

function loadEnv(path: fs.PathLike, expandEnv: boolean) {
  const envs = config({
    path: resolve(path as string, '.env'),
  });

  if (expandEnv) {
    expand(envs);
  }
}

export function useEnvAdv(
  configOptions: UseEnvOptions = {
    enableExpand: true,
    ignoreProcessEnv: false,
    updateGitIgnore: true,
  },
) {
  const envName = configOptions.envNameInput;
  const folderPath = (configOptions.path as fs.PathLike) || process.cwd();
  const files = fs.readdirSync(folderPath);
  const matched = files.filter((fileName) => {
    let matches;
    if (envName) {
      matches = fileName.match(`.env.${envName}`);
    } else {
      matches = fileName.match(/^.env$/gmu);
    }
    return matches;
  });
  console.log(matched);
  if (
    configOptions.envNameInput === 'env'
    || configOptions.envNameInput === undefined
    || configOptions.envNameInput === null
  ) {
    const envResult = config({
      debug: configOptions.debug,
      encoding: configOptions.encoding,
      override: configOptions.override,
      path: configOptions.path,
    });

    if (configOptions.enableExpand) {
      expand({
        error: envResult.error,
        ignoreProcessEnv: configOptions.ignoreProcessEnv,
        parsed: envResult.parsed,
      });
    }
  }
}
