/* eslint-disable no-console */
import { unlinkSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { useEnv } from '../src';

const envSuite = suite('env');

envSuite('should be a function', () => {
  assert.type(useEnv, 'function');
});

envSuite('should default to env when no input given', () => {
  console.log('||---No Options given-----------');
  useEnv();
  assert.is(process.env.DEFAULT, 'working in default options mode');
});

envSuite('should make test folder & load env', () => {
  console.log('||---Load env from test folder-----------');
  useEnv('test', true);
  assert.is(process.env.TEST1, 'one');
  assert.is(process.env.TEST2, 'two');
});

envSuite('should be able to load multiline env', () => {
  console.log('||---Multiline load-----------');
  useEnv('multiline', true);
  const multiline = `---this is a multi
line test for use-env
and that's it---`;
  assert.is(process.env.TEST_MULTILINE, multiline);
});

envSuite('should be able to expand env', () => {
  console.log('||---Env Expand-----------');
  useEnv('expand', true);
  assert.is(process.env.TEST6, 'one two');
});

envSuite('should throw error on non existant environment file input', () => {
  console.log('||---Throw on non existant env name input-----------');
  assert.throws(() => useEnv('aNonExistantEnvName'));
});

envSuite('should throw error when no input given & no .env file found', () => {
  const filePath = resolve(process.cwd(), '.env');
  unlinkSync(filePath);
  console.log('||---Throw on no input && no .env-----------');
  assert.throws(() => useEnv('aNonExistantEnvName'));
  writeFileSync(filePath, 'DEFAULT = working in default options mode');
});

envSuite.run();

// ---
