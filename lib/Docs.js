/**
* @module Docs
*/
require('@tyler.thayn/js.core')
let $fs = require('fs-extra')
let $path = require('path')
let AST = require('./AST')

/**
* Docs Options
* @typedef {object} module:Docs~Options
* @property {boolean|string} [ast] - AST output file or false to skip
* @property {null|string} [output] - Output folder or null (stdout)
* @property {string} template - Template path
*/
let defaults = {
	ast: './tmp/package.ast',
	log: process.stdout,
	output: './README.md',
	pkg: './package.json',
	template: './build/templates/README.md',
	type: 'readme'
}

module.exports = (files, options = {}) => {
	return new Promise((resolve, reject) => {
		options = Extend({}, defaults, options)

		options.log.write('Generating AST...')
		AST.Load(files).then(ast => {
			options.log.write('ok\n')

			if (options.ast) {
				options.log.write(`Saving AST (${options.ast})...`)
				$fs.ensureDirSync($path.dirname($path.resolve(options.ast)))
				$fs.writeFileSync(options.ast, JSON.stringify(ast, null, '\t'), 'utf-8')
				options.log.write(`ok\n`)
			}

			options.log.write(`Loading Builder (${options.type})...`)
			let Build = require(options.type === 'readme' ?
				$path.resolve(__dirname, '../templates/readme/index.js')
				:
				$path.resolve(__dirname, '../templates/docs/index.js')
			)
			options.log.write(`ok\n`)

			options.log.write(`Starting build...`)
			Build(ast, options).then(() => {
				options.log.write(`ok\n`)
				resolve()
			}).catch(reject)

		}).catch(reject)

	})
}

