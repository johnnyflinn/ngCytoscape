// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/*/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        'src/modules/*.js',
        'src/config/*.js',
        'src/controllers/*.js'
       ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dst'))

});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['src/*/*.js'], ['lint', 'scripts']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);