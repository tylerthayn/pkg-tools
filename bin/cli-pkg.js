const { program } = require('commander')

program
  .name('pkg tools')
  .version('0.1.0')
  .command('merge [cmd]', 'package.json tools')
  .command('install [cmd]', 'install default packages')
  .command('scripts [cmd]', 'add npm scripts to package.json')

program.parse(process.argv)
