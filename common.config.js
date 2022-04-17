const ts = require('./tsconfig.json')
const build = require('./tsconfig.build.json')
let options
let configPath
try {
  options = require('../../options.config')
  configPath = '../..'
} catch (_) {
  options = require('./options.config')
  configPath = '.'
}

module.exports = {
  configPath: configPath,
  withPreact: options.withPreact,

  alias: ts.compilerOptions.paths,
  extensions: ['.ts', ...(options.withPreact ? ['.tsx'] : []), '.js'],
  modules: [ts.compilerOptions.baseUrl, 'node_modules'],
  out: ts.compilerOptions.outDir,
  src: build.compilerOptions.rootDir,
}
