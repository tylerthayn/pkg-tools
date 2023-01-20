/**
 * @fileoverview GruntJs task to generate project documentation.
 * @copyright Tyler Thayn 2023
 * @author Tyler Thayn <tylertthayn@gmail.com>
 * @license MIT
 *
 * @module pkg-tools/tasks/docs
 */

/**
* Task Options
* @typedef {object} Options
* @property {boolean|string} [ast] - AST output file or false to skip
* @property {object} jsdoc
* @property {string} [jsdoc.path] - path to jsdoc program
* @property {string} jsdoc.config - path to jsdoc config
* @property {object} [options] - options passed to template()
* @property {null|string} [output] - Output folder or null (stdout)
* @property {string} template - Template path
*/

require('@tyler.thayn/js.core')
let ChildProcess = require('child_process')
let $path = require('path')

let defaults = {
	ast: './tmp/ast',
	jsdoc: {
		path: $path.resolve($path.dirname(process.argv[0]), 'jsdoc.cmd'),
		config: $path.resolve('./jsdoc.conf')
	},
	options: {},
	output: null,
	template: $path.resolve(__dirname, '../templates/docs')
}

module.exports = function (grunt) {
	grunt.registerMultiTask('docs', 'Generate package documentation', function() {
		this.requires('jshint')
		let done = this.async()

		let options = this.options(defaults)
		let template = require($path.resolve(options.template))

		grunt.log.write('Generating ast...')
		let cp = ChildProcess.spawn(options.jsdoc.path, ['-c', options.jsdoc.config, '-X'])
		let data = ''
		cp.stdout.on('data', chunk => {data += chunk.toString()})
		cp.on('close', code => {
			grunt.log.ok()

			data = JSON.parse(data)
			if (options.ast) {
				grunt.log.write('Writing ast to file "'+options.ast+'"...')
				grunt.file.write(options.ast, data)
				grunt.log.ok()
			}

			grunt.log.write('Calling template()...')
			let ret = template(data, options.output, options.options || {})
			if (Type(ret, 'promise')) {
				ret.then(() => {
					grunt.log.ok()
					done(true)
				}).catch(error => {
					grunt.fatal(error)
					done(error)
				})
			} else {
				grunt.log.ok()
				done(true)
			}
		})
		cp.on('error', (error) => {
			grunt.fatal(error)
			done(error)
		})
	})
}

/**
* @example <caption>Basic Usage</caption>
* module.exports = function(grunt) {
*	grunt.initConfig({
*		docs: {
*			default: {
*				options: {
*					output: './docs',
*					template: './node_modules/@tyler.thayn/pkg-tools/templates/docs'
*				}
*			},
*			readme: {
*				options: {
*					output: './docs',
*					template: './node_modules/@tyler.thayn/pkg-tools/templates/readme'
*				}
*			}
*		},
*		jshint: {
*			default: {
*				src: ['Gruntfile.js', 'tasks/*.js'],
*				options: {
*					jshintrc: '.jshintrc'
*				}
*			}
*		}
*	})
*
*	grunt.loadNpmTasks('grunt-contrib-jshint')
*	grunt.loadNpmTasks('@tyler.thayn/pkg-tools')
*	grunt.registerTask('default', ['jshint', 'docs:readme', 'docs:default'])
*}
*/
