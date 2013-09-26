module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// concat task
		concat:{
			options:{
				separator: ";\n"
			},
			plugins:{
				src: ["src/js/plugin/*.js"],
				dest: "js/plugins.js"
			},
			main:{
				src: ["src/js/org/define.js", "src/js/part/*.js", "src/js/org/main.js"],
				dest: "js/main.js"
			}
		},
		jshint:{
			all:["src/js/org/defs.js", "src/js/part/*.js", "src/js/org/main.js"]
		},
		// uglify task
		uglify:{
			main:{
				files: {
					"js/main.min.js": ['js/main.js']
				}
			},
			plugins:{
				options: {
					preserveComments: 'all'
				},
				files: {
					// plugins from plugin.src folder, example:
					"src/js/plugin/jquery.formstyler.min.js":"src/js/plugin.src/jquery.formstyler.js",
				}
			}
		},
		svgmin: {
			options: {
				plugins: [{
					removeViewBox: false
				}]
			},
			dist: {
				files: {
					"src/img/svgmin/bg_city.svg":"src/img/svg/bg_city.svg"
					// list of svg files
				}
			}
		},
		// grunticon task
		grunticon: {
			myIcons: {
				options: {
					src: "src/img/svg/",
					dest: "img/icon/",
					cssprefix: "icon-",
					loadersnippet:"insert.html"
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
					"css/main.min.css": "src/less/main.less"
				}
			},
			live: {
				options: {
					yuicompress: false
				},
				files: {
					"css/main.css": "src/less/main.less"
				}
			}
		},
		sprite:{
			clouds:{
				src: ["src/img/sprites/clouds/*.png"],
				destImg: "src/img/sprites/clouds.png",
				destCSS: "json/clouds.json",
				algorithm: 'binary-tree',
				padding: 2
			},
		},
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 1
				},
				files: {
					"img/clouds.png": "src/img/sprites/clouds.png",
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
				tasks: ['less:live', 'less:build'],
				options: {
					livereload: false
				}
			},
			css:{
				files: ['css/main.css']
			},
			scripts:{
				files: ['src/js/org/**', 'src/js/part/**', 'src/js/plugin.src/**'],
				tasks: ['jshint', 'uglify:plugins', 'concat', 'uglify:main']
			},

			views:{
				files: ["../../src/Cbw/DefaultBundle/Resources/views/**"]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Console tasks
	grunt.registerTask('default',['watch']);
	grunt.registerTask('icons', ['grunticon']);
	grunt.registerTask('scripts', ['uglify:plugins', 'concat', 'uglify:main']);
	grunt.registerTask('build',[ 'uglify:plugins','concat', 'uglify:main', 'grunticon', 'less:build']);
};