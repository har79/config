const common = require('./common.config')

module.exports = {
  moduleFileExtensions: common.extensions.map(s => s.substring(1)),
  moduleDirectories: common.modules,
}
