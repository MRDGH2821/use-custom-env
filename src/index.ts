import { config as config_1, DotenvParseOutput, parse } from 'dotenv';
import { expand } from 'dotenv-expand';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DotenvConfigOptionsStrict, UseAdvancedEnvOptions } from './typings/interfaces';

export { parse } from 'dotenv';
export { expand } from 'dotenv-expand';
/**
 * Injects the parser output into process.env
 * @function injectEnv
 * @param {DotenvParseOutput} obj - The output from dot-env parser
 * @param {boolean} override - Default False. Override existing environment variables
 */
function injectEnv(obj: DotenvParseOutput, override: boolean = false) {
  Object.keys(obj).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
      process.env[key] = obj[key];
    } else if (override) {
      process.env[key] = obj[key];
    }
  });
  expand({ parsed: obj });
}

/**
 * Loads custom `.env.*` file from root folder
 * @function useCustomEnv
 * @param {string} envName - Environment name or the env file extension to be loaded
 * @param {boolean} override - Default False. Override existing environment variables
 * @param {BufferEncoding} encoding - Default `utf-8`. File encoding of the env file
 *
 * @example
 * If you have `.env.scaling` then use `useEnv('scaling')`
 * If you simply want to load `.env` then leave it blank i.e. `useCustomEnv()`
 */
export function useCustomEnv(
  envName?: string,
  override: boolean = false,
  encoding: BufferEncoding = 'utf-8',
) {
  const envFile = envName ? `.env.${envName}` : '.env';
  try {
    const envFilePath = resolve(process.cwd(), envFile);
    const parsed = parse(
      readFileSync(envFilePath, {
        encoding,
      }),
    );
    injectEnv(parsed, override);
    // console.log(`Successfully loaded ${envFilePath}\n`);
  } catch (error) {
    throw new Error(
      `Cannot load "${envFile}"\nMake sure the file is in the Root of the folder "${process.cwd()}\\"\n${error}`,
    );
  }
}

/**
 * Loads `.env` file contents into process.env.
 *
 * See https://docs.dotenv.org
 *
 * @param {DotenvConfigOptionsStrict} options - additional options.
 * @returns an object with a `parsed` key if successful or `error` key if an error occurred.
 */
export function config(options: DotenvConfigOptionsStrict) {
  return config_1(options);
}

/**
 * Loads custom `.env.*` file as long as path to file is valid
 * @function useEnv
 * @param {UseAdvancedEnvOptions} options - options for useAdvancedEnv
 * @example
 * If your env file is at `./some folder/.env.test`, put it as it is,
 * i.e `useAdvancedEnv({ pathToEnvFile: './some folder/.env.test' })`
 * */
export function useAdvancedEnv(options: UseAdvancedEnvOptions) {
  try {
    const envFilePath = resolve(options.pathToEnvFile);
    const parsed = parse(
      readFileSync(envFilePath, {
        encoding: options.encoding,
      }),
    );

    injectEnv(parsed, options.override);
  } catch (error) {
    throw new Error(`Cannot load the following file: \n\n${options.pathToEnvFile}\n\n${error}`);
  }
}
