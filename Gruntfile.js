module.exports = function(grunt) {
	// Jade config variables
	var lang, json;

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint:{
			all:['src/js/main.js']
		},
		// uglify task
		uglify:{
			main:{
				files: {
					"assets/js/main.min.js": ['app/js/main.js']
				}
			}
		},
		// less builder
		less: {
			build: {
				options: {
					cleancss: true
				},
				files: {
					"assets/css/style.min.css": "src/less/style.less"
				}
			}
		},
		// jade task
		jade: {
			dist: {
				options:{
					data: function(dest, src) {
						lang = dest.match(/(ru|en)\//)[1],
						json = (dest.match(/index.html/))
								? require('./src/json/index.json')
								: require('./src/json/'+dest.replace(".html","").replace(/ru\/|en\//,'')+'.json');
						json.lang = lang;
						return json;
					}
				},
				files: {
					"ru/index.html": ["src/jade/page/index.jade"],
					"ru/illustration.html": ["src/jade/page/gallery.jade"],
					"ru/painting.html": ["src/jade/page/gallery.jade"],
					"ru/drawing.html": ["src/jade/page/gallery.jade"],
					"en/index.html": ["src/jade/page/index.jade"],
					"en/illustration.html": ["src/jade/page/gallery.jade"],
					"en/painting.html": ["src/jade/page/gallery.jade"],
					"en/drawing.html": ["src/jade/page/gallery.jade"]
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
				files: ['assets/css/style.min.css']
			},
			scripts:{
				files: ['src/js/main.js'],
				tasks: ['jshint', 'uglify']
			},
			jade:{
				files: ['src/jade/**', 'src/json/**'],
				tasks: ['jade:dist']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default',['watch']);
};