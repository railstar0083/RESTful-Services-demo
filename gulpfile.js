var gulp = require('gulp'),
	sass = require('gulp-sass')
	postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});
	
gulp.task('default', function () {
    gulp.src('app/styles/*.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({ browsers: ['last 5 versions'] })]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/public/css'))
		.pipe(browserSync.reload({
		  stream: true
		}));

});

gulp.task('watch', ['browserSync'], function () {
    
	gulp.watch('app/styles/*.scss', ['default']);

});