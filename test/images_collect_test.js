'use strict';

var grunt = require('grunt');

exports.images_collect = {

  setUp: function(done) {
    done();
  },

  defaultTest: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/fixtures/testing.js');
    var expected = grunt.file.read('test/expected/testing.js');
    test.equal(actual, expected, 'should describe what the grunt task generating.');

    test.done();
  }
};
