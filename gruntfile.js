module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "./public",
            src: ["**"],
            dest: "./dist/public"
          },
          {
            expand: true,
            cwd: "./build",
            src: ["**"],
            dest: "./dist/build"
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

  grunt.registerTask("default", [
    "copy",
    "ts",
    "tslint",
  ]);

  grunt.registerTask("watch", [
    "copy",
    "ts",
    "tslint",
    "watch",
  ]);

};
