// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var Server = require('karma').Server;
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
            'src/services/cytoCreateGraph.js',
            'src/services/cytoElementsHelpers.js',
            'src/services/cytoData.js',
            'src/services/cytoEvents.js',
            'src/services/cytoGraphDefaults.js',
            'src/services/cytoHelpers.js',
            'src/services/cytoLayoutDefaults.js'
        ])
        .pipe(concat('ngCytoscape.js'))
        .pipe(gulp.dest('dst'))
        .pipe(rename('ngCytoscape.min.js'))
        .pipe(uglify())

        .pipe(gulp.dest('dst'));
});
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});
// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['src/services/*.js', 'src/directives/*.js'], ['lint', 'scripts']);
});
gulp.task('build', ['lint','test','scripts']);
// Default Task
gulp.task('dev', ['lint', 'scripts', 'watch']);