# use-custom-env

Use any given env file in your Node.js project!

## Installation

```sh
npm install use-custom-env
```

## Usage

```js
const { useCustomEnv } = require('use-custom-env'); // for CJS style
import { useCustomEnv } from 'use-custom-env'; // for ESM or TS

// for `.env`
useCustomEnv();

// for `.env.beta`
useCustomEnv('beta');

// for `.env.prod` and to override existing variables
useCustomEnv((envName = 'prod'), (override = true));
```

## Motivation

I have bunch of files which match the regex - `\.env.*\`
But [dotenv](https://www.npmjs.com/package/dotenv) has limitation. It can only load from `.env` not from `.env.thing` or `.env.local`
[custom-env](https://www.npmjs.com/package/custom-env) exists, but there are no typescript typings

Thus `use-custom-env` was born, which facilitates loading custom env files.

# Licence

[MIT](./license)
