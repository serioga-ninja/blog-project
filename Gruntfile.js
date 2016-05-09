'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        clean: {
            dist: ['dist'],
            deploy: ['build']
        },

        // ngtemplates: {
        //     app: {
        //         cwd: 'app/components',
        //         src: '**/*.html',
        //         dest: 'dist/scripts/templates.js',
        //         options: {
        //             module: 'grapejuice_buzz',
        //             htmlmin: {
        //                 collapseWhitespace: true,
        //                 collapseBooleanAttributes: true
        //             },
        //             bootstrap: function (module, script) {
        //                 return 'angular.module("' + module + '").factory("TemplateLoader", ["$templateCache", function($templateCache) {\n' + script + '\nreturn {};\n}]);\n';
        //             }
        //         }
        //     }
        // },

        htmlbuild: {
            index: {
                src: 'dist/views/index.html',
                dest: 'dist/views/',
                options: {
                    relative: false,
                    scripts: {
                        start: {
                            cwd: 'dist',
                            files: ['scripts/app.js', 'scripts/templates.js']
                        },
                        app: {
                            cwd: 'dist',
                            files: ['scripts/**/*.js', '!scripts/*.js']
                        },
                        deps: {
                            cwd: 'dist',
                            files: ['deps/**/*.js']
                        }
                    },
                    styles: {
                        app: {
                            cwd: 'dist',
                            files: ['styles/**/*.css']
                        },
                        deps: {
                            cwd: 'dist',
                            files: ['deps/**/*.css']
                        }
                    }
                }
            }
        },

        copy: {
            buildIndex: {
                expand: true,
                cwd: 'app/',
                src: 'index.html',
                dest: 'dist/views/'
            },
            buildExt: {
                expand: true,
                cwd: 'app/',
                src: 'ext/**',
                dest: 'dist/'
            },
            buildMedia: {
                expand: true,
                cwd: 'app/',
                src: 'media/**',
                dest: 'dist/'
            },
            buildDeps: {
                expand: true,
                cwd: 'app/',
                src: 'deps/**',
                dest: 'dist/'
            },
            buildViews: {
                expand: true,
                cwd: 'app/',
                src: ['views/**/*.html'],
                dest: 'dist/'
            },
            deployApp: {
                expand: true,
                cwd: 'dist/',
                src: 'scripts/*.js',
                dest: 'deploy/'
            },
            deployMedia: {
                expand: true,
                cwd: 'dist/',
                src: 'media/**',
                dest: 'deploy/'
            },
            deployExt: {
                expand: true,
                cwd: 'dist/',
                src: [
                    'ext/bootstrap-sass/assets/fonts/bootstrap/*',
                    'ext/font-awesome/fonts/*',
                    'ext/zeroclipboard/dist/ZeroClipboard.swf'
                ],
                dest: 'deploy/'
            },
            deployViews: {
                expand: true,
                cwd: 'dist/',
                src: ['views/**/*.html', '!views/index.html'],
                dest: 'deploy/'
            }
        },

        concat: {
            options: {
                separator: grunt.util.linefeed
            },
            deployApp: {
                src: ['dist/scripts/*/**/*.js'],
                dest: 'deploy/scripts/app-rest.js'
            },
            deployDepsJS: {
                src: ['dist/deps/**/*.js'],
                dest: 'deploy/scripts/deps.js'
            },
            deployDepsCSS: {
                src: ['dist/deps/**/*.css'],
                dest: 'deploy/styles/deps.css'
            }
        },

    });

    grunt.registerTask('build', [
        'coffeelint',
        'clean:dist',
        'coffee',
        'sass',
        'ngtemplates',
        'copy:buildDeps',
        'copy:buildIndex',
        'wiredep',
        'htmlbuild',
        'copy:buildExt',
        'copy:buildMedia',
        'copy:buildViews'
    ]);

    grunt.registerTask('default', ['watch']);

    require('./grunt/auto-concat.js')(grunt);
};
