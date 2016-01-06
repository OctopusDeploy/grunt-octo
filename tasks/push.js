'use strict';
var octo = require('@robert.erez/octo-pack');
var path = require('path');
var chalk = require('chalk');

var TASK_NAME = 'octo-push';
var DESCRIPTION = 'A Grunt wrapper for octopack library to push packages to an Octopus Deploy instance.';

module.exports = function(grunt) {
  grunt.registerMultiTask(TASK_NAME, DESCRIPTION, function () {
    var done = this.async(),
        files = grunt.file.expand(this.filesSrc),
        options = this.options({});

    function pushOptions(file) {
      return {
        apikey: options.apiKey,
        replace: !!options.replace,
        host: options.host,
        verbose: false,
        name: path.basename(file)
      };
    }

    if (files.length === 0) {
      grunt.log.warn('No packages found.');
    } else {
      pushPackage(files.pop());
    }

    function pushPackage(file) {
      try {
        octo.push(file, pushOptions(file), pushComplete);
      } catch (err) {
        grunt.fatal(err);
      }
    }

    function pushComplete(err, data) {
      if (err) {
        onFail(err);
      } else {
        onSuccess(data);
      }
    }

    function onFail(err) {
      var msg = err.statusMessage || err.statusCode;
      if (err && err.body && err.body.Errors && err.body.Errors[0]) {
        msg = err.body.Errors[0] + ' (' + err.statusCode + ')';
      }
      grunt.fatal(msg);
    }

    function onSuccess(data) {
      grunt.log.ok('Pushed package', chalk.cyan(data.Title + ' v' + data.Version + ' (' + fileSizeString(data.PackageSizeBytes) + ')'), 'to ', chalk.cyan(options.host));
      if (files.length === 0) {
        done();
      } else {
        pushPackage(files.pop());
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
