var gulp = require('gulp');//use the gulp package from the npm module
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();



gulp.task('sass', function(){
	return gulp.src('./scss/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: './'
		},
	})
});

gulp.task('watch',['browserSync', 'sass'], function(){
	gulp.watch('./scss/*.sass', ['sass']);
	gulp.watch('./js/*.js', browserSync.reload);
	gulp.watch('./index.html', browserSync.reload);
});

