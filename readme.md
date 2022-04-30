# use-custom-env

Use any given env file in your Node.js project!

## Motivation

I have bunch of files which match the regex - `\.env.*\`
But [dotenv](https://www.npmjs.com/package/dotenv) has limitation. It can only load from `.env` not from `.env.thing` or `.env.local`
[custom-env](https://www.npmjs.com/package/custom-env) exists, but there are no typescript typings

Thus `use-env` was born, which facilitates loading custom env files.

## Usage

```js
const { useEnv } = require('use-custom-env');

// for `.env`
useCustomEnv();

// for `.env.beta`
useCustomEnv('beta');

// for `.env.prod` and to override existing variables
useCustomEnv((envName = 'prod'), (override = true));
```

# Licence

[MIT](./license)
