# use-env

Use any given env file in your Node.js project!

## Motivation

I have bunch of files which match the regex - `\.env.*\`
But [dotenv](https://www.npmjs.com/package/dotenv) has limitation. It can only load from `.env` not from `.env.thing` or `.env.local`
[custom-env](https://www.npmjs.com/package/custom-env) exists, but there are no typescript typings

Thus `use-env` was born, which facilitates loading custom env files.

## Usage

```js
const { useEnv } = require('use-env');

// for `.env`
useEnv();

// for `.env.beta`
useEnv('beta');

// for `.env.prod` and to override existing variables
useEnv((envName = 'prod'), (override = true));
```

# Licence

[MIT](./license)
