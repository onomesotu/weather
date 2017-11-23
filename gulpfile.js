var gulp = require('gulp');//use the gulp package from the npm module
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();



gulp.task('sass', function(){
	return gulp.src('pages/weather/scss/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('pages/weather/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'pages/weather'
		},
	})
});

gulp.task('watch',['browserSync', 'sass'], function(){
	gulp.watch('pages/weather/scss/*.sass', ['sass']);
	gulp.watch('pages/weather/js/*.js', browserSync.reload);
	gulp.watch('pages/weather/index.html', browserSync.reload);
});

