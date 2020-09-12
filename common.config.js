const ts = require('./tsconfig.json')

module.exports = {
  alias: ts.compilerOptions.paths,
  extensions: ['.ts', '.tsx', '.js'],
  modules: [ts.compilerOptions.baseUrl, 'node_modules'],
}
