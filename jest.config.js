import common from './common.config.cjs'

export default {
  moduleFileExtensions: common.extensions.map(s => s.substring(1)),
  moduleDirectories: common.modules,
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
