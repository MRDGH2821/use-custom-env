/* eslint-disable no-console */
import { unlinkSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { useCustomEnv } from '../src';

const UCESuite = suite('use-custom-env');

UCESuite('should be a function', () => {
  assert.type(useCustomEnv, 'function');
});

UCESuite('should default to env when no input given', () => {
  console.log('||---No Options given-----------');
  useCustomEnv();
  assert.is(process.env.DEFAULT, 'working in default options mode');
});

UCESuite('should make test folder & load env', () => {
  console.log('||---Load env from test folder-----------');
  useCustomEnv('test', true);
  assert.is(process.env.TEST1, 'one');
  assert.is(process.env.TEST2, 'two');
});

UCESuite('should be able to load multiline env', () => {
  console.log('||---Multiline load-----------');
  useCustomEnv('multiline', true);
  const multiline = `---this is a multi
line test for use-env
and that's it---`;
  assert.is(process.env.TEST_MULTILINE, multiline);
});

UCESuite('should be able to expand env', () => {
  console.log('||---Env Expand-----------');
  useCustomEnv('expand', true);
  assert.is(process.env.TEST6, 'one two');
});

UCESuite('should throw error on non existent environment file input', () => {
  console.log('||---Throw on non existent env name input-----------');
  assert.throws(() => useCustomEnv('aNonExistantEnvName'));
});

UCESuite('should throw error when no input given & no .env file found', () => {
  const filePath = resolve(process.cwd(), '.env');
  unlinkSync(filePath);
  console.log('||---Throw on no input && no .env-----------');
  assert.throws(() => useCustomEnv('aNonExistantEnvName'));
  writeFileSync(filePath, 'DEFAULT = working in default options mode');
});

UCESuite('should load on named parameters & expand multiline env', () => {
  console.log('||---Load on named params & expand multiline env-----------');
  useCustomEnv('named', false);
  const multiline = `this is multiline
with expansion
expansions are first fill , second fill`;
  assert.is(process.env.TEST_MULTILINE_2, multiline);
});

UCESuite.run();

// ---
