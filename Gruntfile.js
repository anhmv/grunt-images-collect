/*
 * grunt-images-collect
 * https://github.com/anhmv/grunt-images-collect
 *
 * Copyright (c) 2017 AnhMV
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            tests: ['tmp']
        },

        copy: {
            main: {
                files: [
                    {src: ['test/fixtures/testing.js'], dest: 'tmp/fixtures/testing.js'}
                ]
            }
        },

        collectImages: {
            main: {
                options: {
                    sourceFolder: 'test/fixtures/img/',
                    destinationFile: 'tmp/fixtures/testing.js',
                    placeholder: /('|")(PLACEHOLDER)('|")/g,
                    prefix: ''
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('test', ['clean', 'copy', 'collectImages', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
