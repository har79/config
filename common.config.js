const ts = require('./tsconfig.json')

module.exports = {
  withPreact: true,

  alias: ts.compilerOptions.paths,
  extensions: ['.ts', '.js'] + this.withPreact ? ['.tsx'] : [],
  modules: [ts.compilerOptions.baseUrl, 'node_modules'],
  out: ts.compilerOptions.outDir,
  root: ts.compilerOptions.rootDir,
}
