var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jeet = require('jeet');
var nib = require('nib');
var rupture = require('rupture');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');

gulp.task('javascript', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './client/app.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .on('error', gutil.log)
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('stylus', function () {
    gulp.src('./stylus/master.styl')
        .pipe(stylus({use: [jeet(), rupture(), nib()]}))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function () {
    gulp.watch('stylus/*.styl', ['stylus']);
    gulp.watch('client/*.js', ['javascript']);
});

gulp.task('default', ['javascript', 'stylus', 'watch']);
