/** CLI tools
* @module cli
*/

const { program } = require('commander')

program
	.name('pkg-tools')
	.version('0.1.0')
	.command('bump', 'package version bump')
	.command('deps', 'dependency tools')
	.command('docs', 'docs generator')
	.command('pkg', 'package.json tools')

program
  .command('copy')
  .description('copy standard files')
  .action(() => {
    console.log('copy command called')
  })

program.parse(process.argv)
