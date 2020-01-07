#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')
const program = require('commander')

program
  .version('0.0.1', '-v, --version')
  .option(
    '-c, --config  [path]',
    'Path to configuration file.'
  )
  .option(
    '-s, --storeDir  [path]',
    'Specify directory where store is defined.'
  )
  .option(
    '-d, --distDir [path]',
    'Specify output directory of type definition.'
  )
  .option(
    '-b, --build',
    'Generate type definition file only once without monitoring.'
  )
  .parse(process.argv)

let config
try {
  const configFileName =
    program.config || 'vuex-guardian.config.js'
  config = {
    ...require('../dist/config').config,
    ...require(path.resolve(configFileName))
  }
} catch {
  config = require('../dist/config').config
} finally {
  require('../dist').run({
    ...config,
    ...(typeof program.storeDir === 'string'
      ? {
          storeDir: program.storeDir
        }
      : {}),
    ...(typeof program.distDir === 'string'
      ? {
          distDir: program.distDir
        }
      : {}),
    ...(program.build !== undefined
      ? {
          build: program.build
        }
      : {})
  })
}
