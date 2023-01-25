#!/usr/bin/env node

/** CLI tools
* @module cli
*/

const { program } = require('commander')

program
	.name('pkg-tools')
	.version('0.1.0')
	.command('bump', 'package version bump')
	.command('copy', 'copy standard files')
	.command('docs', 'docs generation')
	.command('pkg', 'package.json tools')
program.parse(process.argv)
