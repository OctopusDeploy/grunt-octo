'use strict';
var octo = require('@octopusdeploy/octopackjs');
var chalk = require('chalk');

var TASK_NAME = 'octo-pack';
var DESCRIPTION = 'A Grunt wrapper for octopack library to package projects.';

module.exports = function(grunt) {
    grunt.registerMultiTask(TASK_NAME, DESCRIPTION, function() {
        var done = this.async(),
            files = grunt.file.expand(this.filesSrc),
            options = this.options({
                dst: './'
            });
        if(files.length === 0) {
            grunt.log.warn('No packages found.');
            done();
        } else {
            try {
                var pkg = octo.pack(options.type, {id: options.id, version: options.version});
                files.forEach(function(f) {
                    pkg.append(f);
                });
                pkg.toFile(options.dst, function (err, data) {
                    if(err) {
                        grunt.log.fatal(err);
                        done(false);
                    } else {
                        grunt.log.ok('Packed \'' + chalk.cyan(data.name) + '\' with ' + chalk.magenta(Object.keys(files).length + ' files'));
                        done();
                    }
                });
            }catch(err){
                grunt.fatal(err);
                done(false);
            }
        }
    });
};