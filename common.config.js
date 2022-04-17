const ts = require('./tsconfig.json')
const build = require('./tsconfig.build.json')
let options
try {
  options = require('../../options.config')
} catch (_) {
  options = require('./options.config')
}

module.exports = {
  withPreact: options.withPreact,

  alias: ts.compilerOptions.paths,
  extensions: ['.ts', ...(options.withPreact ? ['.tsx'] : []), '.js'],
  modules: [ts.compilerOptions.baseUrl, 'node_modules'],
  out: ts.compilerOptions.outDir,
  src: build.compilerOptions.rootDir,
}
