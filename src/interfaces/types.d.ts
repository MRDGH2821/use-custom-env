import { DotenvConfigOptions } from 'dotenv';
import { DotenvExpandOptions } from 'dotenv-expand';

export interface UseEnvOptions
  extends DotenvConfigOptions,
  DotenvExpandOptions {
  /**
	 * Default: `true`
	 *
	 * Use dotenv-expand to expand the env variables
	 */
  enableExpand?: true;

  /**
	 * Default: `true`
	 *
	 * Update .gitignore file to ignore folder created by use-env
	 * This is best left as "true".
	 *
	 * WARNING!!
	 * Change this option only if you really really know what you are doing.
	 */
  updateGitIgnore?: boolean;
}
