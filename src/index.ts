/* eslint-disable import/prefer-default-export */
import { DotenvParseOutput, parse } from 'dotenv';
import { expand } from 'dotenv-expand';
import { readFileSync } from 'fs';
import { resolve } from 'path';

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
 * Loads custom `.env.*` files from root folder
 * @function useEnv
 * @param {string} envName - Environment name or the Env file extension to be loaded
 * @param {boolean} override - Default False. Override existing environment variables
 *
 * @example
 * If you have `.env.scaling` then use `useEnv('scaling')`
 * If you simply want to load `.env` then leave it blank i.e. `useEnv()`
 */
export function useCustomEnv(envName?: string, override: boolean = false) {
  try {
    let envFilePath = envName || '.env';
    if (envName === undefined || envName === null) {
      envFilePath = resolve(process.cwd(), '.env');
    } else {
      envFilePath = resolve(process.cwd(), `.env.${envName}`);
    }
    const parsed = parse(readFileSync(envFilePath));
    injectEnv(parsed, override);
    // console.log(`Successfully loaded ${envFilePath}\n`);
  } catch (error) {
    if (envName) {
      throw new Error(
        `Cannot load ".env.${envName}"\nMake sure the file is in the Root of the folder "${process.cwd()}\\"\n${error}`,
      );
    } else {
      throw new Error(
        `Cannot load ".env"\nMake sure the file is in the Root of the folder "${process.cwd()}\\"\n${error}`,
      );
    }
  }
}
