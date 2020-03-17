module.exports = function (grunt) {
  grunt.initConfig({
    htmlmin: {
      options: {
	removeComments:true,
        collapseWhitespace: true
      },
      files: {
        src: './index.html',
        dest: 'dist/index.html'
      }
    },
    cssmin:{
      files:{
	src:'./index.css',
	dest:'dist/index.css'
      }
    },
    uglify:{
	file:{
	  src:'./index.js',
	  dest:'dist/index.js'
	}
      }
    
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('minify', ['htmlmin','cssmin','uglify']); 
};
