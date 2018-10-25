module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [
            {
                expand: true,
                cwd: "./src/shared",
                src: ["**"],
                dest: "./dist/shared"
            },
            {
                expand: true,
                cwd: "./src/client",
                src: ["**"],
                dest: "./dist/client"
            },
        ]
      }
    },
    ts: {
      default: {
        tsconfig: './tsconfig.json'
      }
    },
    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      all: {
        src: ["src/**/*.ts", "!node_modules/**/*.ts", "!obj/**/*.ts", "!typings/**/*.ts"]
      }
    },
    gyp: {
        conf: {
            command: 'configure',
        },
        build: {
            command: 'build',
        }
    },
    watch: {
      ts: {
        files: ["src/**/*.ts"],
        tasks: ["ts"]
      },
      scripts: {
        files: ['src/**/*.ts', '!node_modules/**/*.ts'], // the watched files
        tasks: ["tslint:all"], // the task to run
        options: {
          spawn: false // makes the watch task faster
        }
      }
    },
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-node-gyp');

  grunt.registerTask("default", [
    "ts",
    "tslint",
    "copy",
  ]);

  grunt.registerTask("watch", [
    "copy",
    "ts",
    "tslint",
    "watch",
  ]);

};
