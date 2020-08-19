module.exports = function (grunt) {
    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            },
            cold: {
                tasks: ['nodemon'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        clean: {
            build: ['dist']
        },
        copy: {
            env: {
                files: [{
                    expand: true,
                    cwd: 'env/',
                    src: '.env',
                    dest: '.'
                }]
            }
        },
        ts: {
            default: {
                tsconfig: true
            },
            options: {
                fast: 'never'
            }
        },
        eslint: {
            options: {
                configuration: '.eslintrc.js',
                force: true,
                fix: false
            },
            files: {
                src: ['**/*.ts', '!node_modules/**']
            }
        },
        watch: {
            files: '**/*.ts',
            tasks: ['ts', 'eslint']
        },
        nodemon: {
            dev: {
                script: 'dist/src/app.js',
                options: {
                    args: ['dev'],
                    nodeArgs: ['--inspect=0.0.0.0'],
                    cwd: __dirname,
                    ignore: ['node_modules/**'],
                    ext: 'js,png',
                    watch: ['dist'],
                    delay: 1000,
                    legacyWatch: true
                }
            }
        },        
    });
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-test');
  
    grunt.registerTask('build', ['clean', 'ts', 'eslint', 'copy']);

    grunt.registerTask('default', [
        'copy',
        'concurrent:dev'
      ]);
    
      grunt.registerTask('cold', [
        'copy',
        'concurrent:cold'
      ]);
    
      grunt.registerTask('test', [
        'clean',
        'ts',
        'eslint',
        'copy',
        'mochaTest:test'
      ]);
      grunt.registerTask('IT', [
        'clean',
        'ts',
        'mochaTest:IT'
      ]);
}