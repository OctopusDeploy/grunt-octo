/*
 * grunt-octo
 * https://github.com/Robert/empty
 *
 * Copyright (c) 2015 Robert Erez
 * Licensed under the MIT license.
 */

'use strict';
var octo = require('@robert.erez/octo-pack');
var path = require('path');
var chalk = require('chalk');

var TASK_NAME = 'octo';
var DESCRIPTION = 'A Grunt wrapper for octopack library to push projects to Octopus Deploy.';

module.exports = function(grunt) {


  grunt.registerMultiTask(TASK_NAME, DESCRIPTION, function() {
    var done = this.async();
     var options = this.options();

    this.files.forEach(function(file) {
      if(file.src.length === 0){
        grunt.log.warn('No packages found.');
      } else {
        file.src.forEach(function (f) {
          if (!grunt.file.exists(f)) {
            grunt.log.warn('Source file', chalk.cyan('\''+ f +'\''), 'not found.');
            return false;
          } else {
            pushFile(f, done);
            return true;
          }
        });
      }
    });


    function pushFile(filePath, done){
      var pushOptions = {
        apikey: options.apiKey,
        replace: !!options.replace,
        host: options.host,
        verbose: false,
        name: path.basename(filePath)
      };

      octo.push(filePath, pushOptions).then(success, fail).done();

      function success(response) {
        grunt.log.ok('Pushed package', chalk.cyan(response.Title + ' v'+ response.Version +' (' + fileSizeString(response.PackageSizeBytes) + ')'), 'to ', chalk.cyan(options.host));
        done();
      }

      function fail(err) {
        grunt.log.error('Error uploading file', chalk.cyan('\''+ filePath +'\''));

        if(err.body.Errors) {
          err.body.Errors.forEach(function(msg){ grunt.log.error(msg); });
        } else {
          grunt.log.error(err.body.ErrorMessage);
        }
        done(false);
      }
    }

  });

};

function fileSizeString(bytes) {
  if(bytes < 1024) {
    return bytes + ' B';
  }

  var units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
  var u = -1;
  do {
    bytes /= 1024;
    ++u;
  } while(bytes >= 1024 && u < units.length - 1);
  return bytes.toFixed(2)+' '+units[u];
}
