#!/usr/bin/env node

const common = require('./common.config')

require('child_process').execSync(
  [
    'npx babel',
    `${common.src}`,
    `--out-dir ${common.out}`,
    `--extensions "${common.extensions.join(',')}"`,
    '--source-maps true',
  ].join(' '),
  {stdio: 'inherit'}
)
