let $fs = require('fs-extra')
let $path = require('path')

const { program } = require('commander')

program
  .name('pkg tools :: copy')
  .version('0.1.0')

program.parse(process.argv)

$fs.readdirSync($path.resolve(__dirname, '../share'), (error, entries) => {
	if (error) throw error
	entries.forEach(entry => {
		if (entry == 'package.json') return

		let dest = $path.resolve('./', entry)
		$fs.pathExists(dest, (error, exists) => {
			if (error || exists) return
			$fs.copy($path.resolve(__dirname, '../share', entry), dest, (error) => {})
		})
	})
})
