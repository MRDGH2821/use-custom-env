export interface DotenvConfigOptionsStrict {
  /**
   * Default: `path.resolve(process.cwd(), '.env')`
   *
   * Specify a custom path if your file containing environment variables is located elsewhere.
   *
   * example: `require('dotenv').config({ path: '/custom/path/to/.env' })`
   */
  path?: string;

  /**
   * Default: `utf8`
   *
   * Specify the encoding of your file containing environment variables.
   *
   * example: `require('dotenv').config({ encoding: 'latin1' })`
   */
  encoding?: BufferEncoding;

  /**
   * Default: `false`
   *
   * Turn on logging to help debug why certain keys or values are not being set as you expect.
   *
   * example: `require('dotenv').config({ debug: process.env.DEBUG })`
   */
  debug?: boolean;

  /**
   * Default: `false`
   *
   * Override existing environment variables with values from your .env file.
   *
   * example: `require('dotenv').config({ override: true })`
   */
  override?: boolean;
}

export interface UseAdvancedEnvOptions {
  /**
   * Specify full path to the env file
   * @example
   * If your env file is at `./some folder/.env.test`, put it as it is,
   * i.e `useAdvancedEnv({ pathToEnvFile: './some folder/.env.test' })
   */
  pathToEnvFile: string;

  /**
   * Default: `false`
   *
   * Specify the encoding of your file containing environment variables.
   */
  encoding?: BufferEncoding;
  /**
   * Default: `false`
   *
   * Override existing environment variables with values from your .env file.
   */
  override?: boolean;
}
