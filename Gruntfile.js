module.exports = function(grunt) {

	// Jade config variables
	var lang, json, obj;
	var imageList = function(size){
		json = require('./src/json/gallery.json');
		obj = {};
		for(item in json){
			for (var i = 0; i < json[item].length; i++) {
				obj['assets/img/gallery/' + item + '/' + size + '/' + json[item][i].image] = 'src/img/gallery/' + item + '/' + json[item][i].image;
			}
		}
		return obj;
	};

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
		},
		image_resize: {
			gallery_thumb:{
				options: {
					width: 150,
					height: 150,
					overwrite: false,
					quality: 0.9
				},
				files: imageList('thumb')
			},
			galery_big:{
				options: {
					height: 600,
					width: 470,
					overwrite: false,
					quality: 0.9,
					upscale: true
				},
				files: imageList('big')
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
				files: ['src/jade/**', 'src/json/db.json'],
				tasks: ['jade:dist']
			},
			gallery: {
				files: ['src/json/gallery.json'],
				tasks: ['image_resize', 'jade:dist']
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
	grunt.loadNpmTasks('grunt-image-resize');
	// Default task(s).
	grunt.registerTask('default',['watch']);
};