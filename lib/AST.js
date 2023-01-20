
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


function AST (ast) {
	if (typeof ast === 'string') {
		ast = JSON.parse($fs.readFileSync(ast, 'utf-8'))
	}

	ast = ast.filter(t => t.Get('comment', '') !== '')

	Define(ast, 'Data', {get: () => {
		let data = {}
		ast.forEach(item => {
			data[item.longname] = item
		})
		return data
	}})

	Define(ast, 'Filter', function (filters) {
		let _ast = Clone(this)
		filters.Keys().forEach(key => {
			_ast = _ast.filter(doclet => {
				let ret = false
				if (Array.isArray(filters[key])) {
					filters[key].forEach(v => {
						if (v == doclet.Get(key, '')) {
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


		/*
		this.Filter({memberof: item.longname, scope: 'inner'})
		this.Filter({memberof: item.longname, scope: 'static', kind: 'member'})
		this.Filter({memberof: item.longname, scope: 'static', kind: 'function'})
		this.Filter({memberof: item.longname, scope: 'instance', kind: 'member'})
		this.Filter({memberof: item.longname, scope: 'instance', kind: 'function'})
		*/

	})

	return ast
}


module.exports = AST


