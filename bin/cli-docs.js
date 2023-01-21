const { program } = require('commander')

program
	.name('pkg tools :: docs')
	.version('0.1.0')
	.command('readme [paths...]', 'README.md generator')

program.parse(process.argv)
