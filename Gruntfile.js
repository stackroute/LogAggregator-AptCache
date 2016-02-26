
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		mochaTest: {
			all: {src: 'test/sinonStubTest.js'},
			options:{run: true}
		},
		copy: {
			package: {
				src: ['./package.json','./bower.json','./.bowerrc'],
				dest: './dist/'
			},
			server: {
				cwd: './',
				src: ['**/*','!package.json','!bower.json','!Gruntfile.js','!conf.js','!**/node_modules/**','!**/public/**','!**/test/**','!**/dist/**','!**/protractorspec/**'],
				dest: './dist/server/'
			},
			client: {
				expand:true,
				cwd: './public',
				src: ['**/**'],
				dest: './dist/public',
				extDot: 'first'
			}

		},
		clean: ['./dist'],
		execute: {
			dev: {
				src: './bin/www'
			},
			prod: {
				src: './dist/server/bin/www'
			}
		},
		env: {
			dev: {
				NODE_ENV: 'development',
				PORT: 8080
			},
			prod: {
				NODE_ENV: 'production',
				PORT: 2000
			}
		}
	});
	grunt.loadNpmTasks('grunt-mocha-test');
	//If required uncomment and execute
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-execute');
	grunt.loadNpmTasks('grunt-env');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-replace');
	grunt.registerTask('replace', function() {
		var data = grunt.file.readJSON('./package.json');
		data.scripts.start = "NODE_ENV=production PORT=2000 forever start server/bin/www";
		data.devDependencies={};
		var content = JSON.stringify(data);
		grunt.file.write('./dist/package.json', content);
	})
	grunt.registerTask('dist', 'Copy the required files to dist folder', ['clean', 'copy', 'replace']);
	grunt.registerTask('default', ['env:dev', 'mochaTest','clean', 'copy', 'replace']);
};
