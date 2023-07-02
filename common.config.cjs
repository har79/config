const ts = require('./tsconfig.json')
const build = require('./tsconfig.build.json')

let options
let configPath
try {
  options = require('../../options.config.cjs')
  configPath = '../..'
} catch (_) {
  options = require('./options.config.cjs')
  configPath = '.'
}

module.exports = {
  configPath: configPath,
  withReact: options.withReact,

  extensions: ['.ts', ...(options.withReact ? ['.tsx'] : []), '.js'],
  modules: [ts.compilerOptions.baseUrl, 'node_modules'],
  out: ts.compilerOptions.outDir,
  src: build.compilerOptions.rootDir,
}
