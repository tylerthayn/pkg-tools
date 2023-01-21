const { program } = require('commander')

program
  .name('dependency tools')
  .version('0.1.0')
  .command('scan', 'package.json tools')
  .command('update', 'install default packages')
  .command('clean', 'add npm scripts to package.json')

program.parse(process.argv)
