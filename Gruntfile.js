'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    "octo-push": {
        options: {
          host: 'http://localhost',
          apiKey: 'API-IS5PHRN7VVTMAU8GFXFLA0NXMO',
          replace: true
        },
      src: ['./bin/**/*']
    },
    "octo-pack": {
      prod: {
        options: {
          dst: './bin'
        },
        src: ['tasks/**/*']
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        commit: false,
        createTag: false,
        push: false
      }
    },
    clean: {
      build: ['./bin/**/*']
    }
    });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('publish',  ['clean', 'octo-pack:prod', 'octo-push', 'bump']);
};
