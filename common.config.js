const ts = require('./tsconfig.json')
const build = require('./tsconfig.build.json')

module.exports = {
  withPreact: true,

  alias: ts.compilerOptions.paths,
  extensions: ['.ts', ...(this.withPreact ? ['.tsx'] : []), '.js'],
  modules: [ts.compilerOptions.baseUrl, 'node_modules'],
  out: ts.compilerOptions.outDir,
  src: build.compilerOptions.rootDir,
}
