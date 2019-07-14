module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      demo: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'demo/js/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      dist: {
        src: 'src/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      },
      demo: {
        src: 'src/css/<%= pkg.name %>.css',
        dest: 'demo/css/<%= pkg.name %>.min.css'
      },
      demo1: {
        src: 'demo/css/main.css',
        dest: 'demo/css/main.min.css'
      },
      app: {
        src: 'app/css/main.css',
        dest: 'app/css/main.min.css'
      }
    },
    watch: {
      css: {
        files: ['src/css/<%= pkg.name %>.css'],
        tasks: ['cssmin']
      },
      cssdemo: {
        files: ['demo/css/main.css'],
        tasks: ['cssmin']
      },
      cssapp: {
        files: ['app/css/main.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['src/js/<%= pkg.name %>.js'],
        tasks: ['uglify']
      }
    },
    copy: {
      dist: {
        files: [{
            cwd: 'src/img',
            src: '**/*',
            dest: 'dist/img',
            expand: true
          },
          {
            cwd: 'src/css',
            src: '**/*',
            dest: 'dist/css',
            expand: true
          },
          {
            cwd: 'src/js',
            src: '**/*',
            dest: 'dist/js',
            expand: true
          }
        ],
      },
      demo: {
        files: [{
            cwd: 'dist/img',
            src: '**/*',
            dest: 'demo/img',
            expand: true
          },
          {
            cwd: 'demo',
            src: '**/*',
            dest: 'app/demo',
            expand: true
          },
        ],
      },
      git: {
        files: [{
            cwd: 'dist',
            src: '**/*',
            dest: '../git/corner-popup/dist',
            expand: true
          },
          {
            cwd: 'src',
            src: '**/*',
            dest: '../git/corner-popup/src',
            expand: true
          },
          {
            cwd: 'demo',
            src: '**/*',
            dest: '../git/corner-popup/demo',
            expand: true
          },
          {
            cwd: 'docs',
            src: '**/*',
            dest: '../git/corner-popup/docs',
            expand: true
          },
          {
            cwd: '',
            src: 'Gruntfile.js',
            dest: '../git/corner-popup',
            expand: true
          },
          {
            cwd: '',
            src: 'package.json',
            dest: '../git/corner-popup',
            expand: true
          },
          {
            cwd: '',
            src: 'readme.txt',
            dest: '../git/corner-popup',
            expand: true
          }
        ],
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dist', ['copy:dist']);
  grunt.registerTask('demo', ['copy:demo']);
  grunt.registerTask('git', ['copy:git']);
  grunt.registerTask('all', ['copy:dist', 'copy:demo', 'copy:git']); 
};