module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      target: {
        files: {
          'dist/css/nanogallery.min.css': 'css/nanogallery.css',
          'dist/css/nanogallery.woff.min.css': 'css/nanogallery.woff.css',
          'dist/css/themes/clean/nanogallery_clean.min.css': 'css/themes/clean/nanogallery_clean.css',
          'dist/css/themes/clean/nanogallery_clean.woff.min.css': 'css/themes/clean/nanogallery_clean.woff.css',
          'dist/css/themes/light/nanogallery_light.min.css': 'css/themes/light/nanogallery_light.css',
          'dist/css/themes/light/nanogallery_light.woff.min.css': 'css/themes/light/nanogallery_light.woff.css'
        }
      }
    },
    uglify: {
      options: {
        //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        preserveComments: 'some'
      },
      build: {
        src: 'jquery.<%= pkg.name %>.js',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  // Default task(s).
  grunt.registerTask('default', ['uglify','cssmin']);

};