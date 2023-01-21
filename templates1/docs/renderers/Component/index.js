/**
* @module Handlebars
*/

require('@tyler.thayn/js.core')
let $fs = require('fs-extra'), $path = require('path')
let Handlebars = require('handlebars').create()


Handlebars.registerHelper('Join', function (names, s) {
	return names.join(s)
})
Handlebars.registerHelper('Location', function (meta) {
	return '<a href="'+$path.resolve(meta.path, meta.filename)+'" target="_blank">'+$path.relative($path.resolve('./'), $path.resolve(meta.path, meta.filename))+':'+meta.lineno+'</a>'
})


let renderer = {
	context: {},
	options: {
		output: './docs3'
	},
	templates: {}
}

/** Get Handlebars property
* @memberof module:Handlebars.
* @function Get
* @param {string} key - Object path key
* @param {*} value - Default value
* @returns {*} property
*/
Define(Handlebars, 'Get', (k, v) => {
	return renderer.Get(k, v)
})

/** Set Handlebars property
* @memberof module:Handlebars.
* @function Set
* @param {string} key - object path key
* @param {*} value - property value
* @returns {object} Handlebars - Handlebars object for chaining
*/
Define(Handlebars, 'Set', (k, v) => {
	renderer.Set(k, v)
	return Handlebars
})

/** Register a Template
* @memberof module:Handlebars.
* @function registerTemplate
* @param {string} name - template name
* @param {string|function} template - template data, template path or template function
* @param {object} [options] - template options to compile with
* @returns {object} Handlebars - Handlebars object for chaining
*/
Define(Handlebars, 'registerTemplate', (name, template, options = {}) => {
	if (typeof name !== 'string') {throw new Error('Template names must be a string value')}
	name = name.replace(/\.(html|handlebars|tpl)$/, '')

	if (typeof template === 'function') {
		renderer.templates[name] = template
	} else if (typeof template === 'string') {
		if (!template.includes('{')) {
			template = $fs.readFileSync($path.join(__dirname, 'templates', template), 'utf-8')
		}
		renderer.templates[name] = Handlebars.compile(template, options)
	}
	return Handlebars
})

/** Unregister a Template
* @memberof module:Handlebars.
* @function unregisterTemplate
* @param {string} name - template name
* @returns {Handlebars} Handlebars - Handlebars object for chaining
*/
Define(Handlebars, 'unregisterTemplate', (name) => {
	name = name.replace(/\.(html|handlebars|tpl)$/, '')
	try {
		delete renderer.templates[name]
	} catch (e) {}
	return Handlebars
})

/** Render a tempalte
* @memberof module:Handlebars.
* @function Render
* @param {string} name - template name
* @param {object} context - template context
* @param {object} [options] - template options
* @returns {string} ouptut - rendered template output
*/
Define(Handlebars, 'Render', (name, context = {}, options = {}) => {
	name = name.replace(/\.(html|handlebars|tpl)$/, '')
if (name == 'typedef') {

	try {
		let out = renderer.templates[name](Extend({}, renderer.context, context), Extend({}, renderer.options, options))
		let path = $path.resolve(Handlebars.Get('options.output', './Docs3'), context.longname.replace(/^module\:/, '')+'.html')

		$fs.ensureDirSync($path.dirname(path))

		$fs.ensureDirSync($path.dirname(path))
		$fs.writeFileSync(path, out, 'utf-8')
	} catch (e) {
		log(e)
		return ''
	}
}
})

$fs.readdirSync($path.join(__dirname, 'helpers')).forEach(entry => {
	Handlebars.registerHelper(entry.replace(/\.js$/, ''), require($path.resolve(__dirname, 'helpers', entry)))
})
$fs.readdirSync($path.join(__dirname, 'partials')).forEach(entry => {
	Handlebars.registerPartial(entry.replace(/\.(html|handlebars|tpl)$/, ''), $fs.readFileSync($path.join(__dirname, 'partials', entry), 'utf-8'))
})
$fs.readdirSync($path.join(__dirname, 'templates')).forEach(entry => {
	Handlebars.registerTemplate(entry.replace(/\.(html|handlebars|tpl)$/, ''), $fs.readFileSync($path.join(__dirname, 'templates', entry), 'utf-8'))
})

/**
* @alias module:Handlebars
*/
module.exports = Handlebars
