let Handlebars = require('handlebars')
let AST = require('../lib/AST')

let ast = new AST('tts.ast')

Handlebars.registerHelper('Each', function (ctx, options) {
  return Object.keys(ctx).map(k => {
	return options.fn(ctx[k])
	})
})

Handlebars.registerHelper('Capitalize', function (ctx) {
  return ctx.toString().Capitalize()
})
Handlebars.registerHelper('JSON', function (ctx) {
  return JSON.stringify(ctx, null, '\t')
})

log('Classes')
//logj(ast.Outline(ast.Filter({kind: 'class'})))

//logj(ast.Data.Keys())
outline = ast.Outline(true)
//logj(outline)
//log(outline.classes.Array._)
log('\n')

let Render = Handlebars.compile($fs.readFileSync('./test/menu.html', 'utf-8'))
let RenderItem = Handlebars.compile($fs.readFileSync('./test/item.html', 'utf-8'))
log(Render(outline))

Object.keys(outline).forEach(k => {
	Object.keys(outline[k]).forEach(kk => {
		log(RenderItem(outline[k][kk]))
	})
})

/*
log('Modules')
ast.Filter({kind: 'module'}).forEach(item => {
	log('\t'+item.name)
})
log('\n')

log('Namespaces')
ast.Filter({kind: 'namespace'}).forEach(item => {
	log('\t'+item.name)
})
log('\n')

/*
log('Global')
ast.Filter({kind: 'global'}).forEach(item => {
	log('\t'+item.name)
})
log('\n')
*/


