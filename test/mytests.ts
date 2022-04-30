import { useEnv, useEnvAdv } from '../src/index';

useEnv({ envNameInput: 'test', debug: true });

console.log(process.env.TEST1);

useEnvAdv({ envNameInput: 'test' });
