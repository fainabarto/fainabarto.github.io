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
					"assets/js/main.min.js": ['src/js/main.js']
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
						page = dest.match(/[ru|en]\/(\S+)\.html/)[1],
						json = require('./src/json/db.json');
						json.page = page;
						json.lang = lang;
						json.gallery = require('./src/json/gallery.json');
						return json;
					}
				},
				files: {
					"ru/index.html": ["src/jade/page/index.jade"],
					"ru/illustration.html": ["src/jade/page/gallery.jade"],
					"ru/painting.html": ["src/jade/page/gallery.jade"],
					"ru/graphics.html": ["src/jade/page/gallery.jade"],
					"en/index.html": ["src/jade/page/index.jade"],
					"en/illustration.html": ["src/jade/page/gallery.jade"],
					"en/painting.html": ["src/jade/page/gallery.jade"],
					"en/graphics.html": ["src/jade/page/gallery.jade"]
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
		},
		copy:{
			jQuery:{
				src:["bower_components/jquery/jquery.min.js"],
				dest: "assets/js/vendor/",
				expand: true,
				flatten: true
			}
		},
		spritesheet: {
			dist:{
				sprites: {
					'src/img/style/sprite.png': ['src/img/sprite/*.png']
				},
				sheet: 'src/less/sprite/sprites.less',
				templateUrl: 'src/less/sprite/sprites.less.mustache'
			}
		},
		imagemin: {
			style: {
				options: {
					cache: false,
					optimizationLevel: 2,
					pngquant: true,
					progressive: true
				},
				files: [{
					expand: true,
					cwd: 'src/img/style',
					src: ['*.{png,jpg}'],
					dest: 'assets/img/'
				}]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-spritesheet');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	// Default task(s).
	grunt.registerTask('default',['watch']);
};