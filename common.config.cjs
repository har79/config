const path = require('path')

const ts = require('./tsconfig.json')
const build = require('./tsconfig.build.json')

let options
let configPath = path.dirname(__filename)
while (options === undefined) {
  configPath = path.dirname(configPath)
  try {
    options = require(`${configPath}/options.config.cjs`)
  } catch (_) {} // eslint-disable-line no-unused-vars, no-empty
  if (configPath === '/') {
    break
  }
}
if (options === undefined) {
  configPath = '.'
  options = require(`${configPath}/options.config.cjs`)
}

module.exports = {
  configPath,
  withLodash: options.withLodash,
  withReact: options.withReact,

  extensions: ['.ts', ...(options.withReact ? ['.tsx'] : []), '.js'],
  modules: [ts.compilerOptions.baseUrl, 'node_modules'],
  out: ts.compilerOptions.outDir,
  src: build.compilerOptions.rootDir,
  useGoTemplate: options.useGoTemplate,
}
