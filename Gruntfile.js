'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        clean: {
            dist: ['dist'],
            deploy: ['build']
        },

        ngtemplates: {
            app: {
                cwd: 'src/client/app/templates',
                src: '**/*.html',
                dest: 'dist/scripts/templates.js',
                options: {
                    module: 'blog-project',
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    },
                    bootstrap: function (module, script) {
                        return 'angular.module("' + module + '").factory("TemplateLoader", ["$templateCache", function($templateCache) {\n' + script + '\nreturn {};\n}]);\n';
                    }
                }
            }
        },

        copy: {
            buildExt: {
                expand: true,
                cwd: 'src/client/',
                src: 'ext/**',
                dest: 'dist/'
            },
            buildMedia: {
                expand: true,
                cwd: 'src/client/',
                src: 'media/**',
                dest: 'dist/'
            }
        },

        concat: {
            options: {
                separator: grunt.util.linefeed
            },
            dist: {
                src: ['src/client/app/**/*.js'],
                dest: 'dist/scripts/app.js'
            },
        }
    });

    grunt.registerTask('default', [
        'clean:dist',
        'ngtemplates',
        'copy',
        'concat'
    ]);

    // grunt.registerTask('default', ['watch']);
};
