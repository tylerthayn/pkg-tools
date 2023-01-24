/** CLI tools
* @module cli
*/

const { program } = require('commander')

program
	.name('pkg-tools')
	.version('0.1.0')
	.command('bump', 'package version bump')
	.command('pkg', 'package.json tools')
	.command('copy', 'copy standard files')
program.parse(process.argv)
