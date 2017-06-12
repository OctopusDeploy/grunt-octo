'use strict';
var octo = require('@octopusdeploy/octopackjs');
var chalk = require('chalk');

var TASK_NAME = 'octo-pack';
var DESCRIPTION = 'A Grunt wrapper for octopack library to package projects.';

module.exports = function(grunt) {
    grunt.registerMultiTask(TASK_NAME, DESCRIPTION, function() {
        var done = this.async();
        /*
            If a current working directory was supplied in the configuration,
            use it. Otherwise default to the process current working directory.
         */
        var cwd = this.data.cwd ? this.data.cwd : process.cwd();
        /*
            Get a reference to the files found by Grunt. These already
            take the cwd value into account.
         */
        var files = this.filesSrc;
        var options = this.options({
                dst: './'
            });
        if(files.length === 0) {
            grunt.log.warn('No packages found.');
            done();
        } else {
            try {
                var pkg = octo.pack(options.type, {id: options.id, version: options.version});
                this.filesSrc.forEach(function(f) {
                    /*
                        Add the files with the name parameter excluding the cwd, but with the
                        file parameter being the complete path. This way the resulting package
                        can exclude directory names.

                        For example, this configuration will result in an archive with files
                        like /file1.txt.

                        'octo-pack': {
                             prod: {
                                options: {
                                    dst: './bin',
                                    type: 'zip'
                                },
                                src: ['*.txt'],
                                cwd: 'dist'
                            }
                        }

                        Whereas this configuration will result in an archive with files
                        like /dist/file1.txt.

                        'octo-pack': {
                             prod: {
                                options: {
                                    dst: './bin',
                                    type: 'zip'
                                },
                                src: ['dist/*.txt']
                            }
                        }
                    */
                    pkg.append(f, cwd + "/" + f);
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