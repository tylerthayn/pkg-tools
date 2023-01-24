let $fs = require('fs-extra')
let $path = require('path')

const { program } = require('commander')

program
  .name('pkg tools :: merge package.json defaults')
  .version('0.1.0')

program.parse(process.argv)

$fs.copyFileSync('./package.json', './~package.json')

$fs.readFile($path.resolve(__dirname, '../share/package.json'), 'utf-8', (error, contentsDefault) => {
	if (error) throw error

	$fs.readFile($path.resolve('./package.json'), 'utf-8', (error, contents) => {
		if (error) throw error

		$fs.writeFile($path.resolve('./package.json'), JSON.stringify(
			Extend({},
				JSON.parse(contentsDefault),
				JSON.parse(contents)
			),
			null,
			'\t'
		), 'utf-8', error => {
			if (error) throw error
		})
	})

})
