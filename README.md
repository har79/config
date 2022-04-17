# har79-config

Common config boilerplate.

## Install

`npm i -D har79/config`

## Command

`npx har79-config [PATTERN]..`

Copies config files matching PATTERNs into the local directory. If no PATTERNs
are specified, all config files will be copied.

Use `-n` to see the list of matching files without making any changes.

## `package.json`

Update your `package.json` to contain the following:

```
  "files": [
    "build/src"
  ],
  "main": "build/src/index",
  "types": "build/src/index.d.ts",
  "sideEffects": [
    "*.{c,sc,sa}ss"
  ],
  "scripts": {
    "clean": "rm -r coverage build oss-attribution *.tsbuildinfo ||:",
    "fix:format": "prettier --write .",
    "fix:lint": "eslint --fix .",
    "fix": "npm run fix:format && npm run fix:lint",
    "license:check": "license-checker --production --onlyAllow 'MIT;ISC;Apache-2.0'",
    "license:attribution": "generate-attribution",
    "license": "npm run license:check && npm run license:attribution",
    "build:types": "tsc -p tsconfig.build.json --emitDeclarationOnly",
    "build:js": "rollup --config",
    "build:webpack": "webpack --config webpack.prod.js",
    "build": "npm run build:webpack",
    "type:once": "tsc",
    "type:watch": "npm run type:once -- --watch",
    "type": "npm run type:watch",
    "test:once": "jest --coverage",
    "test:watch": "jest --coverage --watchAll",
    "test": "npm run test:watch",
    "preversion": "npm run fix && npm run type:once && npm run test:once",
    "postversion": "git push && git push --tags",
    "prepare": "npm run clean && npm run license:check && npm run build",
    "start": "webpack-dev-server --config webpack.dev.js"
  },
```

## Dependencies

```
packages=(
@babel/plugin-proposal-class-properties
@babel/plugin-proposal-object-rest-spread
@babel/plugin-transform-runtime
@babel/preset-env
@babel/preset-typescript
@typescript-eslint/eslint-plugin
babel-loader
babel-plugin-module-resolver
css-loader
css-minimizer-webpack-plugin
eslint-config-google
eslint-config-prettier
eslint
har79-config
html-webpack-plugin
jest
license-checker
mini-css-extract-plugin
oss-attribution-generator
prettier-plugin-jsdoc
prettier
sass
sass-loader
typescript
webpack-cli
webpack-dev-server
webpack
)
for p in "${packages[@]}"; do npm i -D "$p"; done
```

### `withPreact`

```
packages=(
@babel/plugin-transform-react-jsx
@babel/preset-react
eslint-config-preact
preact
)
for p in "${packages[@]}"; do npm i -D "$p"; done
```
