#!/usr/bin/env node

let Glob = require('glob')
let $fs = require('fs-extra')
let $path = require('path')

const { program } = require('commander')

program
  .name('pkg tools :: copy')
  .version('0.1.0')

program.parse(process.argv)

let folder = $path.resolve(__dirname, '../share')
Glob('*', {cwd: folder, dot: true, nodir: true}, (error, files) => {
	if (error) {throw error}
	Glob('**/*', {cwd: folder, dot: true, nodir: true}, (error, _files) => {
		if (error) {throw error}
		files = Array.Flatten([files, _files]).Unique()
		files.forEach(file => {
log($path.resolve(folder, file))
			if ($path.basename(file) === 'package.json') {return}

			let destFolder = $path.resolve($path.dirname(file))
			$fs.ensureDirSync(destFolder)
			let destFile = $path.resolve(destFolder, $path.basename(file))
log('\t'+destFile)
			if ($fs.pathExistsSync(destFile)) {
				let backup = $path.resolve($path.dirname(destFile), '~'+$path.basename(destFile))
log('\t\t'+backup)
				$fs.copySync(destFile, backup, {overwrite: true})
			}
			$fs.copySync($path.resolve(folder, file), destFile, {overwrite:true})
		})
	})
})
