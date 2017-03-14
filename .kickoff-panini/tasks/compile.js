/**
 * gulp compile
 */
const gulp = require('gulp');
const config = require('../config');

gulp.task('compile', [
	'precompile',
	'css',
	'javascript',
	'images',
	'svg',
	'copy',
	'html',
], () => {
	console.log();
	console.log('❯❯ Kickoff-panini compiled');
	console.log();
	});

gulp.task('precompile', () => {
	if (config.isRelease) {
		console.log();
		console.log('❯❯ Creating an optimized production build...');
		console.log();
	}
});
