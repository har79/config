const common = require('./common.config')

module.exports = {
  moduleFileExtensions: common.extensions.map(s => s.substring(1)),
  moduleDirectories: common.modules,
  collectCoverageFrom: [`${common.root}/**`],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
}
