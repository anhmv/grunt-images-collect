/*
 * grunt-images-collect
 * https://github.com/anhmv/grunt-images-collect
 *
 * Copyright (c) 2017 AnhMV
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var read = require('fs-readdir-recursive'),
        path = require('path'),
        fs = require('fs');

    grunt.registerMultiTask('collectImages', 'A simple task to collect all images in a specify folder into a json object', function () {
        var options = this.options({
            sourceFolder: '',
            destinationFile: '',
            placeholder: '',
            prefix: ''
        });

        if (options.sourceFolder && options.destinationFile && options.placeholder) {

            var files = read(options.sourceFolder),
                images = {default: {}};

            files.forEach(function (imagePath) {
                var baseName = path.basename(imagePath),
                    folders = imagePath.split('/');

                if (folders.length > 1) {
                    var parent = folders[0];
                    if (!images.hasOwnProperty(parent)) {
                        images[parent] = {};
                    }
                    images[parent][baseName] = options.prefix + imagePath;
                } else {
                    images.default[baseName] = options.prefix + imagePath;
                }
            });

            var data = fs.readFileSync(options.destinationFile, 'utf8');
            var result = data.replace(options.placeholder, JSON.stringify(images));

            fs.writeFile(options.destinationFile, result, 'utf8', function (error) {
                if (error) {
                    return grunt.log.writeln(error);
                }
            });
        }

    });
};
