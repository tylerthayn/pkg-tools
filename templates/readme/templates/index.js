let $fs = require('fs')
let $path = require('path')

module.exports = {
	'readme': $fs.readFileSync($path.join(__dirname, 'readme.handlebars'), 'utf-8')
}

Define(module.exports, '_partials', {
	item: $fs.readFileSync($path.join(__dirname, 'item.partial'), 'utf-8'),
	outline: $fs.readFileSync($path.join(__dirname, 'outline.partial'), 'utf-8'),
	param: $fs.readFileSync($path.join(__dirname, 'param.partial'), 'utf-8'),
	type: $fs.readFileSync($path.join(__dirname, 'type.partial'), 'utf-8')
})
