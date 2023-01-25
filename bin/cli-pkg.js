#!/usr/bin/env node

const { program } = require('commander')

program
  .name('pkg tools')
  .version('0.1.0')
  .command('merge', 'package.json tools')
  .command('install', 'install default packages')

program.parse(process.argv)
