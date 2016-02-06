// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/*/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        'src/directives/cytoscape-directive.js',
        'src/directives/graph-elements.js',
        'src/directives/graph-layout.js',
        'src/directives/graph-style.js',
        'src/services/*.js'])
        .pipe(concat('angular-cytoscape.js'))
        .pipe(gulp.dest('dst'))
        .pipe(rename('angular-cytoscape.min.js'))
        .pipe(uglify())

        .pipe(gulp.dest('dst'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['src/services/*.js', 'src/directives/*.js'], ['lint', 'scripts']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);