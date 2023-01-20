
module.exports = function(grunt) {
	grunt.initConfig({
		docs: {
			default: {
				src: ["tasks/docs.js", "tasks/bump.js", "D:/TTS/development/js.core/src", "D:/TTS/development/js.core/src/Array", "D:/TTS/development/js.core/src/Function", "D:/TTS/development/js.core/src/Object", "D:/TTS/development/js.core/src/String", "D:/TTS/development/js.core/src/Extensions"],
				//src: ["tasks/docs.js", "tasks/bump.js"],
				options: {
					//output: './docs',
					template: './templates/docs'
				}
			},
			readme: {
				options: {
					output: './docs/README.md',
					template: './templates/readme'
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
		}
	})

	grunt.loadNpmTasks('grunt-contrib-jshint')
	grunt.loadTasks('tasks')
	grunt.registerTask('patch', ['bump:patch'])
	grunt.registerTask('minor', ['bump:minor'])
	grunt.registerTask('major', ['bump:major'])
	grunt.registerTask('default', ['jshint', 'docs:default'])
}
