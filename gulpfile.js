var gulp = require('gulp');

var exec = require('gulp-exec');
var jsbeautifier = require('gulp-jsbeautifier');
var karma = require('karma').server;
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var jssrc = ['*.js', '*.json'];
var tssrc = ['src/*.ts'];
var allsrc = jssrc.concat(tssrc);

gulp.task('tsc', function() {
  return gulp.src(tssrc)
    .pipe(ts({
      module: 'amd',
      noEmitOnError: true,
      typescript: require('typescript')
    }))
    .pipe(gulp.dest('js'));
});

gulp.task('tslint', ['tsc'], function() {
  return gulp.src(tssrc)
    .pipe(tslint())
    .pipe(tslint.report('verbose', {
      emitError: false
    }));
});

gulp.task('test', ['tsc'], function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('tdd', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('jsfmt-verify', function() {
  return gulp.src(jssrc)
    .pipe(jsbeautifier({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_ONLY'
    }));
});

gulp.task('jsfmt', function() {
  return gulp.src(jssrc)
    .pipe(jsbeautifier({
      config: '.jsbeautifyrc'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('tsfmt-verify', ['tsc'], function() {
  return gulp.src(tssrc)
    .pipe(exec('node_modules/typescript-formatter/bin/tsfmt <%= file.path %> | diff --ignore-blank-lines <%= file.path %> -'))
    .pipe(exec.reporter());
});

gulp.task('tsfmt', function() {
  return gulp.src(tssrc)
    .pipe(exec('node_modules/typescript-formatter/bin/tsfmt --replace <%= file.path %>'))
    .pipe(exec.reporter());
});

gulp.task('watch', function() {
  gulp.watch(allsrc, ['default']);
});

gulp.task('fmt', ['jsfmt', 'tsfmt'], function() {});
gulp.task('fmt-verify', ['jsfmt-verify', 'tsfmt-verify'], function() {});

gulp.task('default', ['test', 'fmt-verify', 'tslint'], function() {});
