/* eslint-disable no-console */
import { useEnv } from '../src/index';

useEnv('test', true);

console.log(process.env.TEST1);

useEnv();

console.log(process.env.DEFAULT);

// useEnv('dofifj');
