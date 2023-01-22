
module.exports = function(grunt) {
	grunt.initConfig({
		clean: ['docs', 'README.md'],
		jsdoc: {
			docdash: {
				src: ["bin/*.js", "tasks/*.js", "lib/**/*.js", "lib/*.js", "templates/readme/**/*.js", "templates/readme/*.js", "README.md"],
				filter: (path) => {return path.includes('!')},
				options: {
					"destination": "docs",
					"template": "./templates/docdash",
					"configure": "./templates/docs.dash.conf"
				}
			},
			docstrap: {
				src: ["bin/*.js", "tasks/*.js", "lib/**/*.js", "lib/*.js", "templates/readme/*.js", "README.md"],
				options: {
					"destination": "docs",
					"template": "./templates/docstrap",
					"configure": "./templates/docs.strap.conf"
				}
			}
		},
		jshint: {
			default: {
				src: ["bin/*.js", "tasks/*.js", "lib/*.js", "lib/**/*.js", "templates/readme/*.js", "README.md"],
				filter: () => {return false},
				//filter: function (path) {return !path.includes('!')},
				options: {
					jshintrc: '.jshintrc'
				}
			}
		},
		readme: {
			default: {
				src: ["bin/*.js", "tasks/*.js", "lib/**/*.js", "lib/*.js", "templates/readme/**/*.js", "templates/readme/*.js"],
				options: {
					output: './README.md',
					template: 'build/templates/README.md'
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

	grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-contrib-jshint')
	grunt.loadNpmTasks('grunt-jsdoc')
	grunt.loadTasks('tasks')
	grunt.registerTask('patch', ['bump:patch'])
	grunt.registerTask('minor', ['bump:minor'])
	grunt.registerTask('major', ['bump:major'])
	grunt.registerTask('docs', ['jshint', 'readme', 'jsdoc:docdash'])
	grunt.registerTask('default', ['jshint', 'docs'])
}
