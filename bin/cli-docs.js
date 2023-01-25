#!/usr/bin/env node

/**
* @memberof module:cli#
* @member {object} docs
*/
let ChildProcess = require('child_process')
let Docs = require('../lib/Docs')
let Glob = require('glob')
let $fs = require('fs-extra')
let $path = require('path')
const { program } = require('commander')

program
	.name('pkg-tools')
	.version('0.1.0')
	.option('--out <out>', 'Output folder path', './docs')
	.option('--pkg <pkg>', 'package.json file', './package.json')
	.option('--type <type>', 'Docs type: readme, docdash, docstrap', 'readme')
	.argument('<patterns...>', 'File glob patterns')
	.action((patterns, options) => {
		let files = Array.Flatten(Array.Flatten([patterns]).map(pattern => Glob.sync(pattern)))
		return options.type === 'readme' ? Readme(files, options) : JsDoc(files, options)
	})
program.showHelpAfterError()

program.parse(process.argv)


function Readme (files, options) {
	let template = $path.resolve($path.dirname($path.resolve(options.pkg)), 'build/templates/README.md')
	template = $fs.pathExistsSync(template) ? template : $path.resolve(__dirname, 'README.md')

	Docs(files, {
		ast: false,
		log: process.stdout,
		output: options.out,
		pkg: options.pkg,
		template: template,
		type: 'readme'
	})

}

function JsDoc (files, options) {
	let conf = JSON.parse($fs.readFileSync($path.resolve(__dirname, 'jsdoc.conf'), 'utf-8'))
	conf.opts.template = $path.resolve(__dirname, '../templates', options.type)
	$fs.writeFileSync($path.resolve(__dirname, 'jsdoc.conf'), JSON.stringify(conf, null, '\t'), 'utf-8')
	$fs.ensureDirSync($path.resolve(options.out))

	let JsDoc = $path.resolve($path.dirname(process.argv[0]), 'jsdoc.cmd')
	let cp = ChildProcess.spawn(JsDoc, [...Array.Flatten(files), '-c', $path.resolve(__dirname, 'jsdoc.conf'), '-d', $path.resolve(options.out)])
	cp.on('close', code => {log('done')})
	cp.on('error', (error) => {throw error})

}

