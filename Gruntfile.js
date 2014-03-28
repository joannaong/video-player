'use strict';

/*
 *	Commands available for building
 *	- "grunt build"
 *		- run this command to build your site for different environments
 *			- environments include: "local", "dev", "stage", "test", "prod"
 *			- sample command: "grunt build:stage"
 *			- by default it will run "grunt build:local" if no environment
 *			  is specified
 *		- this is usually only necessary for testing the integration and for
 *		  deploying ot those servers
 *	- "grunt server"
 *		- run this command while you are developing to test and build
 *		- if you are making change sto this grunt file, the page structure,
 *		  or the data files it may be necessary to terminate this process
 *		  and restart it in order to fetch the new data
 */

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    image_resize: {
      options: {
        width: 90,
        height: 51,
        overwrite: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '_s3/img/detroit/',
          src: ['*.jpg'],
          dest: '_s3/img/detroit_thumb/'
        }]
      },
    },

    jade: {
      dist: {
        files: {
          "demo/index.html": "src/template/index.jade"
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js/',
          src: ['**/*.js'],
          dest: 'demo/js/'
        }, {
          expand: true,
          cwd: 'src/asset/data',
          src: ['**'],
          dest: 'demo/asset/data'
        }]
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    watch: {
      jade: {
        files: ['src/template/**/*'],
        tasks: ['jade'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      compass: {
        files: ['src/css/**/*'],
        tasks: ['compass'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      copy: {
        files: ['src/js/**/*', 'src/**/*'],
        tasks: ['copy'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
	
  });

  // Main build command
  grunt.registerTask('default', ['jade', 'copy', 'compass']);
  grunt.registerTask('resize', ['image_resize']);
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

};