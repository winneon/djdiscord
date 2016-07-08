"use strict";

const gulp = require("gulp");
const typings = require("gulp-typings");
const ts = require("gulp-typescript");
const babel = require("gulp-babel");
const browserify = require("browserify");

gulp.task("typings", () => {
	return gulp.src("typings.json").pipe(typings());
});

gulp.task("compile", () => {
	return gulp.src([ "src/**/*.ts", "typings/**/*.d.ts" ]).pipe(ts({
		module: "commonjs",
		moduleResolution: "node",
		noResolve: true,
		noExternalResolve: true,
		target: "es6"
	})).pipe(babel()).pipe(gulp.dest("lib"));
});

gulp.task("browserify", () => {
	return browserify({
		entries: "lib/index.js",
		debug: true
	}).bundle().pipe(gulp.dest("dist"));
});

gulp.task("default", [ "compile" ]);
gulp.task("dist", [ "compile", "browserify" ]);
