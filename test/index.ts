/* eslint-disable no-console */
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
  useEnv('test');
  assert.is(process.env.TEST1, 'one');
  assert.is(process.env.TEST2, 'two');
});

envSuite('should be able to load multiline env', () => {
  console.log('||---Multiline load-----------');
  useEnv('multiline');
  const multiline = `---this is a multi
line test for use-env
and that's it---`;
  assert.is(process.env.TEST_MULTILINE, multiline);
});

envSuite('should be able to expand env', () => {
  console.log('||---Env Expand-----------');
  useEnv('expand');

  assert.is(process.env.TEST6, 'one two');
});

envSuite.run();

// ---
