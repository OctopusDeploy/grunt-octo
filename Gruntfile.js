/*
 * grunt-octo
 * https://github.com/Robert/empty
 *
 * Copyright (c) 2015 Robert Erez
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    octo: {
      pack: {
        options: {
          host: 'http://localhost',
          apiKey: 'API-T9LQKPDFHOYN3CS3UGEP3A504',
          replace: true
        },
        src: '<%= compress.main.options.archive %>'
      }
    },
    compress: {
      main: {
        options: {
          archive: './bin/<%= pkg.name %>.<%= pkg.version %>.tar.gz',
          mode: 'tgz'
        },
        files: [
          { src: ['test/**'] }
        ]
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        commit: false,
        createTag: false,
        push: false
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('publish', ['compress:main', 'octo:pack', 'bump']);
};
