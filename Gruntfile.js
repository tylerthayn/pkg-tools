
module.exports = function(grunt) {
	grunt.initConfig({
		bump: {},
		clean: ['tmp', 'docs', 'README.md'],
		jsdoc: {
			docdash: {
				src: ["bin/*.js", "tasks/*.js", "lib/**/*.js", "lib/*.js", "templates/readme/**/*.js", "templates/readme/*.js"],
				filter: (path) => {return !path.includes('!')},
				options: {
					"destination": "docs",
					"template": "./templates/docdash",
					"configure": "./templates/docs.dash.conf",
					"recurse": true
				}
			},
			docstrap: {
				src: ["bin/*.js", "tasks/*.js", "lib/**/*.js", "lib/*.js", "templates/readme/**/*.js", "templates/readme/*.js", "README.md"],
				filter: (path) => {return !path.includes('!')},
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
				filter: (path) => {return !path.includes('!')},
				options: {
					jshintrc: '.jshintrc'
				}
			}
		},
		readme: {
			default: {
				src: ["bin/*.js", "tasks/*.js", "lib/**/*.js", "lib/*.js", "templates/readme/**/*.js", "templates/readme/*.js"],
				filter: (path) => {return !path.includes('!')},
				options: {
					output: './README.md',
					template: 'build/templates/README.md'
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
	grunt.registerTask('default', ['clean', 'docs'])
}
