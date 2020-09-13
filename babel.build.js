#!/usr/bin/env node

const common = require('./common.config')

require('child_process').execSync(
  [
    'npx babel',
    `${common.root}`,
    `--out-dir ${common.out}`,
    `--extensions "${common.extensions.join(',')}"`,
    '--source-maps inline',
  ].join(' '),
  {stdio: 'inherit'}
)
