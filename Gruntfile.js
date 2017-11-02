module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  var _ = require('lodash');

  var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return _.extend(options, customOptions, travisOptions);
  };

  var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', '*.js', '*.css', '*.html'],
        tasks: [ 'watch']
      }
    },

    // connect
    connect: {
      options: {
        port: 5000,
        livereload: 93729,
        hostname: '0.0.0.0'
      },
      demo: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '')
            ];
          }
        }
      }
    },

    // open
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

  });

  // grunt.registerTask('default', ['jshint', 'karma:unit']);
  // grunt.registerTask('test', ['karma:unit']);
  // grunt.registerTask('test-server', ['karma:server']);
  grunt.registerTask('server', ['open', 'connect', 'watch']);
};
