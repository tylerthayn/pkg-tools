#!/usr/bin/env node

/**
* @memberof module:cli#
* @member {object} bump
*/
let $fs = require('fs')
let $path = require('path')
let Deasync = require('deasync')
let LatestVersion = Deasync(function (pkg, cb) {
	require('latest-version')(pkg.name).then(version => cb(null, version)).catch(() => cb(null, '0.0.0'))
})

const { program } = require('commander')
program
	.name('version bump')
	.version('0.1.0')
	.option('--major', 'bump major version', false)
	.option('--minor', 'bump minor version', false)
	.option('--patch', 'bump patch version', false)
	.option('--pkg <pkg>', 'path to package.json', './package.json')
	.option('--repo', 'start with package latest version released', false)
	.option('-t, --test', 'test mode, no actual modifications', false)

program.parse(process.argv)


let options = program.opts()
let pkg = require($path.resolve(options.pkg))

let version = options.repo ? LatestVersion(pkg) : pkg.version
log(`Using ${options.repo ? 'repository' : 'package.json'} version`)


let _version = version.split('.')
if (options.patch) {
	_version[2]++
} else if (options.minor) {
	_version[1]++
	_version[2] = 0
} else if (options.major) {
	_version[0]++
	_version[1] = 0
	_version[2] = 0
} else {
	console.log('No version level provided')
	process.exit()
}
_version = _version.join('.')

log(version + ' => ' + _version)

pkg.version = _version

if (!options.test) {
	$fs.writeFileSync($path.resolve(options.pkg), JSON.stringify(pkg, null, '\t'), 'utf-8')
}

