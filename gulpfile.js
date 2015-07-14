var gulp = require('gulp');

var clangFormat = require('clang-format');
var exec = require('gulp-exec');
var gulpFormat = require('gulp-clang-format');
var jsbeautifier = require('gulp-jsbeautifier');
var karma = require('karma').server;
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var jsSrc = ['*.js'];
var jsonSrc = ['*.json'];
var tsSrc = ['src/*.ts'];
var allSrc = jsSrc.concat(tsSrc);

gulp.task('tsc', function() {
  return gulp.src(tsSrc)
      .pipe(ts({module: 'amd', noEmitOnError: true, typescript: require('typescript')}))
      .pipe(gulp.dest('js'));
});

gulp.task('tslint', ['tsc'], function() {
  return gulp.src(tsSrc).pipe(tslint()).pipe(tslint.report('verbose', {emitError: false}));
});

gulp.task('test', ['tsc'], function(done) {
  karma.start({configFile: __dirname + '/karma.conf.js', singleRun: true}, done);
});

gulp.task('tdd', function(done) {
  karma.start({configFile: __dirname + '/karma.conf.js'}, done);
});

gulp.task('jsonfmt-verify', function() {
  return gulp.src(jsonSrc).pipe(jsbeautifier({config: '.jsbeautifyrc', mode: 'VERIFY_ONLY'}));
});

gulp.task('jsonfmt', function() {
  return gulp.src(jsonSrc).pipe(jsbeautifier({config: '.jsbeautifyrc'})).pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch(allSrc, ['default']);
});

function doCheckFormat() {
  return gulp.src(allSrc).pipe(gulpFormat.checkFormat('file', clangFormat));
}

gulp.task('check-format', function() {
  return doCheckFormat().on('warning', function(e) {
    console.log("NOTE: this will be promoted to an ERROR in the continuous build");
  });
});

gulp.task('enforce-format', function() {
  return doCheckFormat().on('warning', function(e) {
    console.log("ERROR: You forgot to run clang-format on your change.");
    console.log("See https://github.com/angular/angular/blob/master/DEVELOPER.md#formatting");
    process.exit(1);
  });
});

gulp.task('default', ['test', 'check-format', 'jsonfmt-verify', 'tslint'], function() {});
