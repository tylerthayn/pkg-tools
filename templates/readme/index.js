let Handlebars = require('handlebars')

let Keys = {
	'Scope>Kind>Name': (ctx) => {
		let keys = []
		Object.keys(ctx).filter(k => ctx[k]._.scope == 'static').filter(k => ctx[k]._.kind == 'member').sort().forEach(k => keys.push(k))
		Object.keys(ctx).filter(k => ctx[k]._.scope == 'static').filter(k => ctx[k]._.kind == 'function').sort().forEach(k => keys.push(k))
		Object.keys(ctx).filter(k => ctx[k]._.scope == 'instance').filter(k => ctx[k]._.kind == 'member').sort().forEach(k => keys.push(k))
		Object.keys(ctx).filter(k => ctx[k]._.scope == 'instance').filter(k => ctx[k]._.kind == 'function').sort().forEach(k => keys.push(k))
		return keys
	},
	'Kind>Name': (ctx) => {
		let keys = []
		Object.keys(ctx).filter(k => ctx[k]._.kind == 'member').sort().forEach(k => keys.push(k))
		Object.keys(ctx).filter(k => ctx[k]._.kind == 'function').sort().forEach(k => keys.push(k))
		return keys
	},
	'Name': (ctx) => {
		return Object.keys(ctx)
	}
}
let configs = {
	params: {
		showType: false
	}
}
Handlebars.registerHelper('Brace', function (which = false) {return which ? '{' : '}'})
Handlebars.registerHelper('Capitalize', function (ctx) {return ctx.toString().Capitalize()})
Handlebars.registerHelper('Equals', function (a, b) {return a === b})
Handlebars.registerHelper('Get', function (k, v) {return configs.Get(k, v)})
Handlebars.registerHelper('Has', function (ctx, name) {return Reflect.has(ctx, name)})
Handlebars.registerHelper('HasChildren', function (ctx) {return Object.keys(ctx).length > 0})
Handlebars.registerHelper('Include', function (path) {return $fs.readFileSync(path, 'utf-8')})
Handlebars.registerHelper('Join', function (names, s) {return names.join(s)})
Handlebars.registerHelper('JSON', function (ctx) {return JSON.stringify(ctx, null, '\t')})
Handlebars.registerHelper('Scope', function (scope) {return scope == 'static' ? '~s~ ' : ''})
Handlebars.registerHelper('Each', function (ctx, sort = 'Name', options) {return Keys[sort](ctx).map(k => {return options.fn({name: k, value: ctx[k]})}).join('\n')})

let _templates = require('./templates'), templates = {}
Object.keys(_templates._partials).forEach(k => Handlebars.registerPartial(k, _templates._partials[k]))
Object.keys(_templates).forEach(k => templates[k] = Handlebars.compile(_templates[k]))

module.exports = (ast, pkg, options) => {
	return new Promise((resolve, reject) => {
		let outline = ast.Outline(true)
		logj(outline)
		let output = templates['readme']({
			outline: outline,
			pkg: JSON.parse($fs.readFileSync('./package.json'))
		})
		log(output)
		resolve(output)

	})
}
