import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { useEnv } from '../src';

const envSuite = suite('env');

envSuite('should be a function', () => {
  assert.type(useEnv, 'function');
});

envSuite('should default to env when no input given', () => {
  useEnv('env', { debug: true });
  assert.is(process.env.DEFAULT, 'working in default options mode');
});

envSuite('should make test folder & load env', () => {
  useEnv('test');
  assert.is(process.env.TEST1, 'one');
  assert.is(process.env.TEST2, 'two');
});

envSuite('should be able to load multiline env', () => {
  useEnv('test');
  const multiline = `---this is a multi
line test for use-env
and that's it---`;
  assert.is(process.env.TEST_MULTILINE, multiline);
});

envSuite('should be able to expand env', () => {
  useEnv('test');

  assert.is(process.env.TEST3, 'one two');
});

envSuite.run();

// ---
