/**
 * @fileoverview GruntJs task to generate package README
 * @copyright Tyler Thayn 2023
 * @author Tyler Thayn <tylertthayn@gmail.com>
 * @license MIT
 *
 * @module tasks/readme
 */
require('@tyler.thayn/js.core')
let Docs = require('../lib/Docs')
let $fs = require('fs-extra')
let $path = require('path')
let AST = require('../lib/AST')

/**
* Readme Task Options
* @typedef {object} module:tasks/readme~Options
* @property {boolean|string} [ast] - AST output file or false to skip
* @property {null|string} [output] - Output folder or null (stdout)
* @property {string} template - Template path
*/
let defaults = {
	ast: false, //'./tmp/package.ast',
	output: './README.md',
	template: './build/templates/README.md'
}

module.exports = function (grunt) {
	grunt.registerMultiTask('readme', 'Generate README.md', function() {
		this.requires('jshint')
		let done = this.async()
		let options = this.options(defaults)

		Docs(this.files.map(f => f.src), Extend({}, options, {log: grunt.log})).then(done).catch(done)

	})
}
