require('@tyler.thayn/js.core')
let ChildProcess = require('child_process')
let $fs = require('fs')
let $path = require('path')

//let ComponentRenderer = require('D:/TTS/development/pkg-tools/templates/docs/renderers/Component/index.js')

function Filter(ast,filters){let _ast=Clone(ast);filters.Keys().forEach(key=>{_ast=_ast.filter(d=>d[key]===filters[key])});return _ast}
function Sort (a, b) {return a.longname.localeCompare(b.longname, 'en'/*, { sensitivity: 'base' }*/)}
function StringifyParam(param){let s=`${param.name}`;return param.optional?`[${s}]`:s}

/**
* Task Options
* @typedef {object} Options
* @property {boolean|string} [ast] - AST data, ast file path, or null/false to generate.  JsDoc config must be provided if generating.
* @property {object} [jsdoc] - path to jsdoc config
* @property {null|string} [output] - output folder or null (stdout)
* @property {string[]} [sources] - list of file & folder paths
* @property {object|string} template - template or path to
*/

let defaults = {
	ast: null,
	jsdoc: './jsdoc.conf',
	output: './docs',
	sources: [],
	template: './node_modules/@tyler.thayn/pkg-tools/templates/docs',
	jsdocCmd: $path.resolve($path.dirname(process.argv[0]), 'jsdoc.cmd')

}

/**
* @event ast - ast change
* @event error
* @event source - source added
* @event generated
*/
function DocsGenerator (options = {}) {
	Object.Extensions.EventEmitter(this)
	this.options = Extend({}, defaults, options)

	this.ast = []
	this.template = require('./Template')

	return this
}

/**
* @param {string[]} [sources] - list of source file paths
*/
DocsGenerator.prototype.Generate = function (sources) {
//function Render (ast, output = null, options = {}) {
	return this.LoadAST(sources).then(() => {
		return new Promise((resolve, reject) => {
			// Filter non comment asts
			let ast = this.ast.filter(t => t.Get('comment', '') !== '')

			this.template.Start('doc', 0)//, {name: package.name})
			Filter(ast, {kind: 'typedef'}).sort(Sort).forEach(t => {this.Process(t, ast, 1)})
			Filter(ast, {scope: 'global', kind: 'class'}).sort(Sort).forEach(t => {this.Process(t, ast, 1)})

			Filter(ast, {scope: 'global', kind: 'function'}).sort(Sort).forEach(t => {this.Process(t, ast, 1)})
			Filter(ast, {scope: 'global', kind: 'member'}).sort(Sort).forEach(t => {this.Process(t, ast, 1)})
			this.template.End('doc')

			Filter(ast, {kind: 'typedef'}).sort(Sort).forEach(t => {this.options.log.write(JSON.stringify(t))})//.forEach(t => {Process(t, ast, 1)})


			$fs.writeFileSync('out.html', this.template.Export(), 'utf-8')
		})
	})
}

DocsGenerator.prototype.LoadAST = function (sources) {
	return new Promise((resolve, reject) => {
		let cp = ChildProcess.spawn(this.options.jsdocCmd, ['-X', ...sources])
		let data = ''
		cp.stdout.on('data', chunk => {data += chunk.toString()})
		cp.on('close', code => {
			Extend(this.ast, JSON.parse(data))
			resolve()
		})
		cp.on('error', (error) => {
			//grunt.fatal(error)
			reject(error)
		})

	})
}

DocsGenerator.prototype.Process = function (doclet, ast, indent = 0) {
	ComponentRenderer.Render(doclet.kind, doclet)

	this.template.Component(doclet, indent)
	this.template.Start('item', indent, doclet)

	let _ast = Filter(ast, {memberof: doclet.longname})
	if (_ast.length > 0) {
		//Template.Start('children', indent+3)

		let _ast = Filter(ast, {memberof: doclet.longname, scope: 'static'})
		if (_ast.length > 0) {
			//Template.Start('static', indent+4)
			Filter(ast, {memberof: doclet.longname, scope: 'static', kind: 'class'}).forEach(child => this.Process(child, ast, indent+1))
			Filter(ast, {memberof: doclet.longname, scope: 'static', kind: 'member'}).forEach(child => this.Process(child, ast, indent+1))
			Filter(ast, {memberof: doclet.longname, scope: 'static', kind: 'function'}).forEach(child => this.Process(child, ast, indent+1))
			//Template.End('static', indent+4)
		}

		_ast = Filter(ast, {memberof: doclet.longname, scope: 'instance'})
		if (_ast.length > 0) {
			//Template.Start('instance', indent+4)
			Filter(ast, {memberof: doclet.longname, scope: 'instance', kind: 'class'}).forEach(child => this.Process(child, ast, indent+1))
			Filter(ast, {memberof: doclet.longname, scope: 'instance', kind: 'member'}).forEach(child => this.Process(child, ast, indent+1))
			Filter(ast, {memberof: doclet.longname, scope: 'instance', kind: 'function'}).forEach(child => this.Process(child, ast, indent+1))
			//Template.End('instance', indent+4)
		}

		_ast = Filter(ast, {memberof: doclet.longname, kind: 'event'})
		if (_ast.length > 0) {
			//Template.Start('event', indent+4)
			Filter(ast, {memberof: doclet.longname, kind: 'event'}).forEach(child => this.Process(child, ast, indent+2))
			//Tempalte.End('event', indent+4)
		}

		//Template.End('children', indent+3)

	}

	this.template.End('item', indent, doclet)

}

/*
let pkg = JSON.parse(Fs.readFileSync(Path.resolve(__dirname, '../../../', 'package.json'), 'utf-8'))

Array.prototype.Debug = function (s = '') {
//	console.log(s.toString()+this.length)
	return this
}



function Render (ast, output = null, options = {}) {
	let Template = require(template)
	return {}
	function Process (doclet, ast, indent = 0) {
		Template.Start('item', indent, doclet)

		let _ast = Filter(ast, {memberof: doclet.longname})
		if (_ast.length > 0) {
			//Template.Start('children', indent+3)

			let _ast = Filter(ast, {memberof: doclet.longname, scope: 'static'})
			if (_ast.length > 0) {
				//Template.Start('static', indent+4)
				Filter(ast, {memberof: doclet.longname, scope: 'static', kind: 'class'}).Debug('\t').forEach(child => Process(child, ast, indent+1))
				Filter(ast, {memberof: doclet.longname, scope: 'static', kind: 'member'}).Debug('\t').forEach(child => Process(child, ast, indent+1))
				Filter(ast, {memberof: doclet.longname, scope: 'static', kind: 'function'}).Debug('\t').forEach(child => Process(child, ast, indent+1))
				//Template.End('static', indent+4)
			}

			_ast = Filter(ast, {memberof: doclet.longname, scope: 'instance'})
			if (_ast.length > 0) {
				//Template.Start('instance', indent+4)
				Filter(ast, {memberof: doclet.longname, scope: 'instance', kind: 'class'}).forEach(child => Process(child, ast, indent+1))
				Filter(ast, {memberof: doclet.longname, scope: 'instance', kind: 'member'}).forEach(child => Process(child, ast, indent+1))
				Filter(ast, {memberof: doclet.longname, scope: 'instance', kind: 'function'}).forEach(child => Process(child, ast, indent+1))
				//Template.End('instance', indent+4)
			}

			_ast = Filter(ast, {memberof: doclet.longname, kind: 'event'})
			if (_ast.length > 0) {
				//Template.Start('event', indent+4)
				Filter(ast, {memberof: doclet.longname, kind: 'event'}).forEach(child => Process(child, ast, indent+2))
				//Tempalte.End('event', indent+4)
			}

			//Template.End('children', indent+3)

		}

		Template.End('item', indent, doclet)

	}

	// Filter non comment asts
	ast = ast.filter(t => t.Get('comment', '') != '')

	Template.Start('doc', 0, {name: pkg.name})
	Filter(ast, {scope: 'global', kind: 'class'}).sort(Sort).Debug().forEach(t => {Process(t, ast, 1)})

	Filter(ast, {scope: 'global', kind: 'function'}).sort(Sort).Debug().forEach(t => {Process(t, ast, 1)})
	Filter(ast, {scope: 'global', kind: 'member'}).sort(Sort).Debug().forEach(t => {Process(t, ast, 1)})
	Template.End('doc')


	//Filter(ast, {kind: 'module'}).sort(Sort).forEach(t => {Process(t, ast)})
	//Filter(ast, {kind: '').sort(Sort).forEach(t => {Process(t, ast)})
//log(JSON.stringify(Template.data, null, '\t'))
//log(JSON.stringify(Template.names, null, '\t'))
	return Template.Export()

}
*/

//if (require.main === module) {
//	$fs.writeFileSync(process.argv[2], Render(JSON.parse($fs.readFileSync($path.resolve(__dirname, '../../tmp/ast'), 'utf-8')), process.argv[3]), 'utf-8')
//} else {
	module.exports = DocsGenerator
//}