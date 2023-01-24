require('@tyler.thayn/js.core')
let $fs = require('fs'), $path = require('path')
let Glob = require('glob')
let Clipboard = require('clipboardy')


let workerDefaults = {
	loader: 'node' //node|requirejs//
}

function Worker (...args) {
	Object.Extensions.EventEmitter(this)
	this.options = Extend({}, workerDefaults, Type(args.last, 'object') ? args.pop() : {})

	this.q = args.length > 0 ? Array.Flatten(args) : []
	this.deps = []
	this.refs = {}

	this.Add = function (dep, caller) {
log(dep)
		// Add dep reference
		if (!Reflect.has(this.refs, dep)) {this.refs[dep] = []}
		this.refs[dep].push(caller)

		// external pkg: add to deps if not already included
		if (!IsFile(dep) && !this.deps.includes(dep)) {
			this.deps.push(dep)
			this.emit('package', dep)
		}

		// new file: add to queue
		if (IsFile(dep)) {
			dep = $path.resolve($path.dirname(caller), dep)

			try {
				let stat = $fs.statSync(dep)
				if (stat.isDirectory()) {
					dep = $path.join(dep, 'index.js')
				}
			} catch (e) {}

			dep = dep.endsWith('.js') ? dep : dep+'.js'
			if (!this.deps.includes(dep) && !this.q.includes(dep)) {
				this.q.push(dep)
				this.emit('file', dep)
			}
		}


		return this
	}

	this.Start = function (...args) {
		let options = Extend({}, this.options, Type(args.last, 'object') ? args.pop() : {})

		//Add any files to the queue
		if (args.length > 0) {args.forEach(arg => this.Add(arg))}

		//Files still to process?
		if (this.q.length > 0) {
			let file = this.q.shift()
			this.deps.push(file)

			//log(`Parsing file "${file}"...`)
			$fs.readFile(file, 'utf-8', (error, contents) => {
				if (error) {
					//this.emit('error', error)
					return this.Start(options)
				}
				if (options.loader === 'node') {
					let matches = contents.match(/require\((?:'|")[\@a-zA-Z_.\/]+?(?:'|")\)/g)
					if (matches !== null && Type(matches, 'array')) {
						matches.forEach(m => {
							let dep = m.replace(/^require\(('|")/, '').replace(/('|")\)/, '').trim()
							this.Add(dep, file)
						})
					}
					return this.Start(options)
				} else if (options.loader === 'requirejs') {

				} else {
					console.log(`Warning: invalid loader (${options.loader})`)
				}
			})

		} else {
			this.emit('done', this.refs)
		}
	}

	return this
}

function Sort(a, b) {
    return a.localeCompare(b, 'en');
}

function IsFile (f) {
	if (/(\\|\/)/.test(f) && !f.startsWith('@')) {
		return true
	}
	return false
}

let pkg = require($path.resolve(__dirname, '../package.json'))
function ComparePackageDeps (deps) {
	let pkgDeps = Array.Flatten([pkg.devDependencies.Keys(), pkg.dependencies.Keys()]).Unique()

	return deps.filter(d => !pkgDeps.includes(d))
}


let traverseDefaults = {

}

function ListByTraverse (...args) {
	return new Promise((resolve, reject) => {

		let options = Extend({}, traverseDefaults, Type(args.last, 'object') ? args.pop() : {})
		let files = process.argv.slice(3)
		let pkgs = []

		let w = new Worker(files, options)
		//w.on('error', reject)
		//w.on('file', file => {log('FILE:'+file)})
		w.on('package', pkg => pkgs.push(pkg))
		w.on('done', (refs) => {
			Clipboard.write(ComparePackageDeps(pkgs).join(' '))
			resolve(refs.Pick(pkgs.Unique().sort(Sort)))
		})

		w.Start()

	})
}


let globDefaults = {
	nodir: true
}

function ListByGlob (...args) {
	return new Promise((resolve, reject) => {
		let options = Extend({}, globDefaults, Type(args.last, 'object') ? args.pop() : {})

		Promise.all(Array.Flatten(args).map(folder => {
			return new Promise((resolve, reject) => {
				Glob(folder, options, (error, files) => {
					if (error) return reject(error)
					resolve(files)
				})
			})
		})).then(files => {
			let pkgs = []
			let w = new Worker(Array.Flatten(files).Unique(), options)
			//w.on('error', reject)
			//w.on('file', file => {log('FILE:'+file)})
			w.on('package', pkg => pkgs.push(pkg))
			w.on('done', (refs) => {
				Clipboard.write(ComparePackageDeps(pkgs).join(' '))
				resolve(refs.Pick(pkgs.Unique().sort(Sort)))
			})

			w.Start()

		}).catch(reject)

	})
}

function Summary (...args) {
	log(args)
}


if (module === require.main) {
	let fn = process.argv[2] === 'traverse' ? ListByTraverse : ListByGlob
	let paths = process.argv.slice(3)
	if (process.argv[2] === 'traverse') {paths = paths.map(f => $path.resolve(f))}

	fn(paths, {}).then(deps => {
		logj(deps)
	}).catch(log)

} else {
	module.exports = {
		ListByGlob: ListByGlob,
		ListByTraverse: ListByTraverse
	}
}


