let Glob = require('glob')
const { Command } = require('commander')
const program = new Command()
let AST = require('../lib/AST')


program
	.name('pkg tools :: docs :: readme')
	.version('0.1.0')
	.option('-a, --ast <ast>', 'ast output file', false)
	.option('-o, --out <out>', 'output file', './~README.md')
	.option('-t, --template <template>', 'template', $path.resolve(__dirname, '../templates/readme'))
	.arguments('[paths...]')
	.action((paths, options) => {
		AST.Load(Array.Flatten(paths.map(path => Glob.sync(path)))).then(ast => {
			if (options.ast) {
				$fs.ensureDirSync($path.dirname($path.resolve(options.ast)))
				$fs.writeFileSync(options.ast, JSON.stringify(ast, null, '\t'), 'utf-8')
			}
			require($path.resolve(options.template+'/index.js'))(ast, JSON.parse($fs.readFileSync('./package.json', 'utf-8'), options)).then(readme => {
				$fs.writeFileSync(options.out, readme.toString(), 'utf-8')
			}).catch(log)
		}).catch(log)

	})



	//.argument('[paths...]', 'file paths')
	//.action((...args) => {
	//	logj(args)
	//})

program.parse(process.argv)
