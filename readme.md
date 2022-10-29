# use-custom-env

Use any given env file in your Node.js project!

## Installation

```sh
npm install use-custom-env
```

## Usage

### Simple Usage

```js
const { useCustomEnv } = require('use-custom-env'); // for CJS style
import { useCustomEnv } from 'use-custom-env'; // for ESM style

// for `.env`
useCustomEnv();

// for `.env.beta`
useCustomEnv('beta');

// for `.env.prod` and to override existing variables
useCustomEnv('prod', true);
```

### Advanced Usage

```js
const { useAdvancedEnv } = require('use-custom-env'); // for CJS style
import { useAdvancedEnv } from 'use-custom-env'; // for ESM style

useAdvancedEnv({
  pathToEnvFile: './some folder with space in name/.env.test'; // required
  encoding: 'utf-8'; // default = readFileSync() function's default encoding argument
  override: false; // default = false
})
```

## Motivation

I have bunch of files which match the regex - `\.env.*\`
But [dotenv](https://www.npmjs.com/package/dotenv) has limitation. It can only load from `.env` not from `.env.thing` or `.env.local`
[custom-env](https://www.npmjs.com/package/custom-env) exists, but there are no typescript typings as of 30 April 2022.

Thus `use-custom-env` was born, which facilitates loading custom env files.

### Test cases

The test cases are to check if the module can load env files from any given directory.
Since this module basically uses [Dotenv](https://www.npmjs.com/package/dotenv)'s parser, relevant test cases can be found in the module repository.

## Licence

[MIT](./license)
