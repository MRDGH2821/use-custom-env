/* eslint-disable no-console */
import { useCustomEnv } from '../src/index';

useCustomEnv('test', true);

console.log(process.env.TEST1);

useCustomEnv();

console.log(process.env.DEFAULT);

// useEnv('dofifj');
