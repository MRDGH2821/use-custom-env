import { useEnv } from '../src/index';

useEnv('test', { debug: true });

console.log(process.env.TEST1);
