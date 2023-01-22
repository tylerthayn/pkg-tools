let $fs = require('fs')
let $path = require('path')

let Handlebars = require('Handlebars')
Handlebars.registerHelper('CamelCase', function (s) {
    return s.CamelCase(true)
})
Handlebars.registerHelper('JSON', function (o) {
    return JSON.stringify(o, null, '\t')
})
Handlebars.registerHelper('Returns', function (rets, options) {
	return rets.map(r => options.fn(r))
})
Handlebars.registerHelper('Iterate', function (list, options) {
	return list.map(r => options.fn(r))
})
Handlebars.registerHelper('ParseLinks', function (s) {
	return s
})
Handlebars.registerHelper('Kind', function (type, doclet) {
	return doclet.kind == type
})

Handlebars.registerHelper('Usage', function (type, doclet) {
	return ''
})

Handlebars.registerHelper('Filename', function (path) {
	return $path.basename(path)
})

Handlebars.registerHelper('Join', function (names, s) {
	return names.join(s)
})

Handlebars.registerHelper('Location', function (meta) {
	return '<a href="'+$path.resolve(meta.path, meta.filename)+'" target="_blank">'+$path.relative($path.resolve('./'), $path.resolve(meta.path, meta.filename))+':'+meta.lineno+'</a>'
})

function _Properties (doclet) {
	log('==='+doclet.name+'====')
	let o = {}
	doclet.properties.filter(p => Reflect.Has(p, 'properties')).forEach(prop => {
		_Properties(prop)
		//o.Set(prop.name, prop)
	})
//	Object.keys(o).forEach(k => {
//console.log(k)

	//})


}



Handlebars.registerHelper('HasChildren', function (properties, property) {
	for (let i=0; i<properties.length; i++) {
		if (properties[i].name.startsWith(property) && properties[i].name != property) {
			return true
		}
	}
	return false
})

function PropertiesArrayToObject (properties, copy = true) {
	let props = {}
	properties.forEach(p => {
		props.Set(p.name, copy ? p : {})
	})
	return props
}


function HasChildren (properties, property) {
	for (let i=0; i<properties.length; i++) {
		if (properties[i].name.startsWith(property) && properties[i].name != property) {
			return true
		}
	}
	return false
}
Handlebars.registerHelper('Properties', function (properties, options) {
	return properties.filter(prop => HasChildren(properties, prop.name))
})


let sections = {}

let templates = {}
//$fs.readdirSync($path.resolve(__dirname, 'templates')).forEach(t => {
//	templates[t.replace(/\.(handlebars|tmpl|html)/, '')] = Handlebars.compile($fs.readFileSync($path.resolve(__dirname, 'templates', t), 'utf-8'))
//})

log(templates)
let html = $fs.readFileSync($path.resolve(__dirname, 'Template.html'), 'utf-8')
html.match(/\<\!-- (?:start|end):(.+?) --\>.+?\<\!-- (?:start|end):\1 --\>/sg).forEach(m => {
	let data = m.match(/\<\!-- (start|end):(.+?) --\>/)
	sections.Set(data[2]+'.'+data[1], Handlebars.compile(m.match(/\<\!-- (?:start|end):.+? --\>(.+?)\<\!-- (?:start|end):.+? --\>/s)[1].trim()))
})

Handlebars.registerHelper('Properties', function (doclet) {
	let ret = ''
	doclet.Get('properties', []).forEach(prop => {
		let s = sections.Get('Properties.start', () => {return ''})(prop)
		Out('\t'.Repeat(level) + s.replace(/^/mg, '\t'.Repeat(level)))

	})
})


exports.out = []
function Out (s) {
	exports.out.push(s)
}

exports.data = {}
exports.names = []

function StringifyParam(param){let s=`${param.name}`;return param.optional?`[${s}]`:s}

exports.Component = function (doclet = {}, level = 0) {
	let s = sections.Get(doclet.kind+'.start', () => {return ''})(doclet)
	Out('\t'.Repeat(level) + s.replace(/^/mg, '\t'.Repeat(level)))
/*
log(doclet.name+'-------------')
	if (doclet.kind == 'typedef') {
		let o = {}
		doclet.properties.forEach(prop => {
			o.Set(prop.name, prop)
		})
		console.log(o.Keys())
	} else {
		return ''
	}
*/
}

exports.Export = function () {
	return exports.out.join('\n')
}

exports.End = function (section, level, doclet) {
	let s = sections.Get(section+'.end',)(doclet)
	Out('\t'.Repeat(level) + s.replace(/^/mg, '\t'.Repeat(level)))

//	Out('\t'.Repeat(level) + '</'+section+'>\n')
//	return sections.Get(section+'.end', '')
/*
	if (section == 'children') {

	} else if (section == 'doc') {

	} else if (section == 'instance') {



	} else if (section == 'item') {


	} else if (section == 'static') {


	}


	return ''
*/
}

exports.Render = function (doclet, level) {
	//exports.data.Set(doclet.longname, doclet)
	//exports.names.push(doclet.longname)

//	Out(sections['Item']({doclet: doclet, level: level}))

/*
	if (doclet.kind == 'class' || doclet.kind == 'module' || doclet.kind == 'namespace') {
		Out('\n'+'\t'.repeat(level)+'### '+doclet.longname+'  \n')
	} else if (doclet.kind == 'function') {
		Out('\t'.repeat(level)+doclet.name+'('+(doclet.params ? doclet.params.map(p => StringifyParam(p)).join(', ') : '')+')  '+doclet.Get('returns', []).map(ret => '{'+ret.Get('type.names', []).join('|')+'}'))
	} else if (doclet.kind == 'member') {
		Out('\t'.repeat(level)+doclet.name+' '+'{'+doclet.type.names.join('|')+'}  ')
	} else if (doclet.kind == 'event') {
		Out('\t'.repeat(level)+doclet.name)
	}
*/

}


exports.Start = function (section, level = 0, doclet = {}) {
	let s = sections.Get(section+'.start', () => {return ''})(doclet)
	Out('\t'.Repeat(level) + s.replace(/^/mg, '\t'.Repeat(level)))

//	Out('\t'.Repeat(level) + '<'+section+'>\n')
//	return sections.Get(section+'.start', '')
/*
	if (section == 'children') {
		return sections.Get(section+'.start', '')
	} else if (section == 'doc') {
		return sections.Get(section+'.start', '')
	} else if (section == 'instance') {



	} else if (section == 'item') {


	} else if (section == 'static') {


	}
	return ''
*/
}



