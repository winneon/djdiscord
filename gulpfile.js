"use strict";

const gulp = require("gulp");
const typings = require("gulp-typings");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const babel = require("gulp-babel");

gulp.task("typings", () => {
	return gulp.src("typings.json").pipe(typings());
});

gulp.task("compile", () => {
	return gulp.src([ "src/**/*.ts", "typings/**/*.d.ts" ]).pipe(sourcemaps.init()).pipe(ts({
		module: "commonjs",
		moduleResolution: "node",
		noResolve: true,
		noExternalResolve: true,
		target: "es6"
	})).pipe(babel()).pipe(sourcemaps.write(".")).pipe(gulp.dest("lib"));
});

gulp.task("default", [ "compile" ]);
gulp.task("dist", [ "compile" ]);
