import common from './common.config.cjs'

const modules = common.modules
const i = modules.indexOf('.')
if (i !== -1) {
  modules[i] = '<rootDir>'
}

export default {
  moduleFileExtensions: common.extensions.map(s => s.substring(1)),
  // Workaround https://github.com/jestjs/jest/issues/12889.
  moduleDirectories: modules,
  collectCoverageFrom: [`${common.src}/**`],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
}
