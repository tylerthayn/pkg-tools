
module.exports = function(grunt) {
	grunt.initConfig({
		jsdoc: {
			docdash: {
				src: ["tasks", "lib", "README.md"],
				options: {
					"destination": "docs",
					"template": "./templates/docdash",
					"configure": "./templates/docs.dash.conf"
				}
			},
			docstrap: {
				src: ["tasks", "lib", "README.md"],
				options: {
					"destination": "docs",
					"template": "./templates/docstrap",
					"configure": "./templates/docs.strap.conf"
				}
			}
		},
		jshint: {
			default: {
				src: ['Gruntfile.js', 'tasks/*.js'], //, 'lib/*.js'],
				options: {
					jshintrc: '.jshintrc'
				}
			}
		},
		readme: {
			default: {
				src: ["tasks/docs.js", "tasks/bump.js", "D:/TTS/development/js.core/src/*.js", "D:/TTS/development/js.core/src/**/*.js"],
				options: {
					output: './README.md',
					template: 'templates/readme'
				}
			}
		},
		ttsdocs: {
			default: {
				src: ["tasks/docs.js", "tasks/bump.js", "D:/TTS/development/js.core/src", "D:/TTS/development/js.core/src/Array", "D:/TTS/development/js.core/src/Function", "D:/TTS/development/js.core/src/Object", "D:/TTS/development/js.core/src/String", "D:/TTS/development/js.core/src/Extensions"],
				options: {
					output: './docs',
					template: './templates/docs'
				}
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-jshint')
	grunt.loadNpmTasks('grunt-jsdoc')
	grunt.loadTasks('tasks')
	grunt.registerTask('patch', ['bump:patch'])
	grunt.registerTask('minor', ['bump:minor'])
	grunt.registerTask('major', ['bump:major'])
	grunt.registerTask('docs', ['readme', 'jsdoc', 'ttsdoc'])
	grunt.registerTask('default', ['jshint', 'docs'])
}
