/** CLI tools
* @module bin/cli
*/

/**
* @memberof module:bin/cli#
* @member {object} commands
*/
const { program } = require('commander')

program
	.name('pkg-tools')
	.version('0.1.0')
	.command('deps [cmd]', 'dependency tools')
	.command('docs [type]', 'docs generator')
	.command('pkg [cmd]', 'package.json tools')

program
  .command('copy')
  .description('copy standard files')
  .action(() => {
    console.log('copy command called')
  })

program.parse(process.argv)
