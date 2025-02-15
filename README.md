# har79-config

Common config boilerplate.

## TODO

- conditional TS
- conditional scss

## Install

`pnpm i -D @har79/config`

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
    "clean": "rm -r coverage build dist lib oss-attribution *.tsbuildinfo ||:",
    "fix:format": "prettier --write .",
    "fix:lint": "eslint --fix .",
    "fix:style": "stylelint '**/*.scss'",
    "fix": "npm run fix:lint && npm run fix:style && npm run fix:format",
    "license:check": "license-checker --production --onlyAllow 'MIT;ISC;Apache-2.0' --excludePrivatePackages",
    "license:attribution": "generate-attribution",
    "license": "npm run license:check && npm run license:attribution",
    "postinstall": "typesync && pnpm install --ignore-scripts",
    "preversion": "npm run license:check && npm run fix && npm run type:once && npm run test:once && [ -z \"$(git status --porcelain)\" ]",
    "postversion": "git push && git push --tags",
    "prepare": "npm run clean && npm run license:check && npm run build",
    "build:types": "tsc -p tsconfig.build.json --emitDeclarationOnly",
    "build:js": "rollup --config",
    "build:webpack": "webpack --config webpack.prod.babel.js",
    "build": "npm run build:webpack",
    "type:once": "tsc",
    "type:watch": "npm run type:once -- --watch",
    "type": "npm run type:watch",
    "test:once": "jest --coverage",
    "test:watch": "jest --coverage --watchAll",
    "test": "npm run test:watch",
    "start": "webpack-dev-server --config webpack.dev.babel.js"
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
@types/jest
babel-loader
babel-plugin-module-resolver
css-loader
css-minimizer-webpack-plugin
eslint-config-google
eslint-config-prettier
eslint-plugin-unused-imports
eslint
@eslint/js
globals
har79-config
html-webpack-plugin
jest
license-checker
mini-css-extract-plugin
oss-attribution-generator
prettier-plugin-jsdoc
prettier-plugin-sh
@ianvs/prettier-plugin-sort-imports
prettier
sass
sass-loader
stylelint
stylelint-config-standard-scss
typescript
typescript-eslint
typesync
webpack-cli
webpack-dev-server
webpack
)
for p in "${packages[@]}"; do npm i -D "$p"; done
```

### `withReact`

```
packages=(
@babel/plugin-transform-react-jsx
@babel/preset-react
@types/react
@types/react-dom
eslint-config-react
react
react-dom
)
for p in "${packages[@]}"; do npm i -D "$p"; done
```
