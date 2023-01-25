#!/usr/bin/env node

let Glob = require('glob')
let Docs = require('../lib/Docs')
const { program } = require('commander')

let AST = require('../lib/AST')


program
	.name('pkg tools :: docs :: readme')
	.version('0.1.0')
	.option('-a, --ast <ast>', 'ast output file', false)
	.option('-o, --output <output>', 'output file', './README.md')
	.option('--pkg <pkg>', 'package.json file path', './package.json')
	.option('-t, --template <template>', 'template', './build/templates/README.md')
	.option('--type <type>', 'type: docs, readme', 'readme')
	.arguments('[paths...]')
	.action((paths, options) => {

		Docs(Array.Flatten(paths.map(path => Glob.sync(path))), options)
			.then(() => {
				console.log('ok')
			}).catch(error => {
				throw error
			})

	})


program.parse(process.argv)
