/**
 * @fileoverview GruntJs task to bump package version
 * @copyright Tyler Thayn 2023
 * @author Tyler Thayn <tylertthayn@gmail.com>
 * @license MIT
 *
 * @module tasks/bump
 */

module.exports = function(grunt) {
	grunt.registerTask('bump', 'Bump the package version', function() {
		let pkg = grunt.file.readJSON('./package.json')
		grunt.log.write(`version: ${pkg.version} => `)

		let version = pkg.version.split('.')
		if (this.flags.patch) {
			version[2]++
		} else if (this.flags.minor) {
			version[1]++
			version[2] = 0
		} else if (this.flags.major) {
			version[0]++
			version[1] = 0
			version[2] = 0
		} else {
			grunt.fatal('No version level provided')
		}
		pkg.version = version.join('.')
		grunt.log.writeln(pkg.version )
		grunt.file.write('package.json', JSON.stringify(pkg, null, '\t'))
	})
}