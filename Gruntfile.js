module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint:{
			all:["dev/js/org/defs.js", "dev/js/parts/*.js", "dev/js/org/main.js"]
		},
		// uglify task
		uglify:{
			main:{
				files: {
					"app/js/main.min.js": ['app/js/main.js']
				}
			},
			plugins:{
				options: {
					preserveComments: 'all'
				},
				files: {
					"dev/js/plugins/jade-runtime.min.js":"dev/js/plugins-to-min/jade-runtime.js",
				}
			}
		},
		// less builder
		less: {
			build: {
				options: {
					yuicompress: true
				},
				files: {
					"css/style.min.css": "src/less/style.less"
				}
			}
		},
		// jade task
		jade: {
			dist: {
				options:{
					data: function(dest, src) {
						if (dest === "index.html"){
							return null;
						} else {
							return require('./src/json/'+dest.replace(".html","")+'.json');
						}
					}
				},
				files: {
					"index.html": ["src/jade/page/index.jade"],
					"illustration.html": ["src/jade/page/gallery.jade"],
					"painting.html": ["src/jade/page/gallery.jade"],
					"drawing.html": ["src/jade/page/gallery.jade"]
				}
			}
		},
		// watch task
		watch:{
			options:{
				livereload: true
			},
			less:{
				files: ['src/less/**'],
				tasks: [ 'less:build'],
				options: {
					livereload: false
				}
			},
			css:{
				files: ['css/style.min.css']
			},
			// scripts:{
			// 	files: ['dev/js/org/**', 'dev/js/parts/**', 'dev/js/plugins-to-min/**'],
			// 	tasks: ['jshint', 'uglify:plugins', 'concat', 'uglify:main']
			// },
			jade:{
				files: ['src/jade/**'],
				tasks: ['jade:dist']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default',['watch']);
	grunt.registerTask('icons', ['grunticon']);
	grunt.registerTask('scripts', ['uglify:plugins', 'concat', 'uglify:main']);
};