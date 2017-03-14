/**
 * gulp images
 */

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const config = require('../config');
const newer = require('gulp-newer');

gulp.task('images', () => {
	return gulp.src([`${config.img.srcDir}/**/*`])
	.pipe(newer(`${config.img.distDir}/**/*`))
		// Temp solution for imagemin bug (see https://github.com/sindresorhus/gulp-imagemin/issues/245)
		// .pipe(
		// 	imagemin()
		// )
		.pipe(
			gulp.dest(`${config.img.distDir}`)
		);
});

