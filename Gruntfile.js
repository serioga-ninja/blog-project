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
            },
            buildTemplates: {
                expand: true,
                cwd: 'src/client/app/',
                src: 'templates/**',
                dest: 'dist/'
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    './dist/scripts/appaz.js': ['src/client/app/**/*.js']
                }
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
        },

        watch: {
            javascript: {
                files: ['src/client/app/**/*.js'],
                tasks: ['concat']
            }
        },
    });

    grunt.registerTask('default', [
        'clean:dist',
        'ngtemplates',
        'copy',
        'concat',
        'watch'
    ]);

    // grunt.registerTask('default', ['watch']);
};
