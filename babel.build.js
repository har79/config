#!/usr/bin/env node

const config = require('./common.config')

require('child_process').execSync(
  [
    'npx babel',
    `${config.root}`,
    `--out-dir ${config.out}`,
    `--extensions "${config.extensions.join(',')}"`,
    '--source-maps inline',
  ].join(' '),
  {stdio: 'inherit'}
)
