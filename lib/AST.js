let ChildProcess = require('child_process')
let $fs = require('fs-extra')
let $path = require('path')

let JsDoc = $path.resolve($path.dirname(process.argv[0]), 'jsdoc.cmd')

function Filter(ast, filters) {
    let _ast = Clone(ast);
    filters.Keys().forEach(key => {
        _ast = _ast.filter(d => d[key] === filters[key]);
    });
    return new AST(_ast);
}

function Sort(a, b) {
    return a.longname.localeCompare(b.longname, 'en');
}

function StringifyParam(param) {
    let s = `${param.name}`;
    return param.optional ? `[${s}]` : s;
}

/**
* @class AST
* @param {array} ast
*/
function AST (ast) {
	ast = ast.filter(t => ((t.Get('comment', '') !== '') || (t.Get('files', []).length > 0)))

	/**
	* @memberof AST#
	* @member {object} Data
	*/
	Define(ast, 'Data', {get: () => {
		let data = {}
		ast.forEach(item => {
			data[item.longname] = item
		})
		return data
	}})

	/**
	* @memberof AST#
	* @function Filter
	* @param {filter[]} filters
	* @returns {AST} ast
	*/
	Define(ast, 'Filter', function (filters) {
		let _ast = Clone(this)
		filters.Keys().forEach(key => {
			_ast = _ast.filter(doclet => {
				let ret = false
				if (Array.isArray(filters[key])) {
					filters[key].forEach(v => {
						if (v === doclet.Get(key, '')) {
							ret = true
						}
					})
				} else {
					if (doclet[key] === filters[key]) {
						ret = true
					}
				}
				return ret
			})
		})
		_ast = new AST(_ast)
		_ast._ = Reflect.has(this, '_') ? this._ : this
		return _ast
	})

	/**
	* @memberof AST#
	* @function Outline
	* @param {null|boolean|ast|doclet}
	* @returns {object} outline
	*/
	Define(ast, 'Outline', function (item) {
		let o = {}

		if (typeof item === 'boolean') {
			o.classes = this.Filter({kind: 'class'}).Outline()
			o.modules = this.Filter({kind: 'module'}).Outline()
			o.namespaces = this.Filter({kind: 'namespace'}).Outline()
			o.global = Extend(
				{},
				this.Filter({scope: 'global', kind: 'member'}).Outline(),
				this.Filter({scope: 'global', kind: 'function'}).Outline()
			)
		} else if (typeof item === 'undefined') {
			this.forEach(e => {
				o[e.name] = this.Outline(e)
			})
		} else if (Array.isArray(item)) {
			item.forEach(e => {
				o[e.name] = this.Outline(e)
			})
		} else {
			item.name = item.name.trim()
			Define(o, '_', item)
			let _ = Reflect.has(this, '_') ? this._ : this
			let children = _.Filter({memberof: item.longname})
			if (children.length > 0) {
				_.Filter({memberof: item.longname}).forEach(child => {
					o[child.name] = this.Outline(child)
				})
			} else {
				//return item.longname
			}
		}

		return o
	})


	return ast
}

/**
* @async
* @memberof AST.
* @function Load
* @param {(string|string[])} file - JSON string or Array of file paths
* @returns {Promise.<AST>} ast
*/
Define(AST, 'Load', (file) => {
	return new Promise((resolve, reject) => {
		if (typeof file === 'string') {
			$fs.readFile(file, 'utf-8', (error, contents) => {
				if (error) {return reject(error)}
				return resolve(new AST(JSON.parse(contents)))
			})
		} else if (Array.isArray(file)) {
			let data = ''
			let cp = ChildProcess.spawn(JsDoc, [...Array.Flatten(file), '-c', $path.resolve(__dirname, 'jsdoc.conf'), '-X'])
			cp.stdout.on('data', chunk => {data += chunk.toString()})
			cp.on('close', code => {
console.log(data)
				resolve(new AST(JSON.parse(data.toString())))
			})
			cp.on('error', reject)
		} else {
			return reject('Invalid AST file')
		}
	})
})

module.exports = AST


