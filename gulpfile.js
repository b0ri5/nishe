var gulp = require('gulp');

var exec = require('gulp-exec');
var jsbeautifier = require('gulp-jsbeautifier');
var karma = require('karma').server;
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

var src = ['src/*.ts'];

gulp.task('tsc', function() {
  return gulp.src(src)
    .pipe(ts({
      module: 'amd',
      typescript: require('typescript')
    }))
    .pipe(gulp.dest('js'));
});

gulp.task('lint', function() {
  return gulp.src(src)
    .pipe(tslint())
    .pipe(tslint.report('verbose', {
      emitError: false
    }));
});

gulp.task('test', function(done) {
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
  gulp.src(['*.js', '*.json'])
    .pipe(jsbeautifier({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_ONLY'
    }));
});

gulp.task('jsfmt', function() {
  gulp.src(['*.js', '*.json'])
    .pipe(jsbeautifier({
      config: '.jsbeautifyrc'
    }));
});

gulp.task('tsfmt-verify', function() {
 var options = {
     continueOnError: true
               };
  gulp.src('src/*.ts')
    .pipe(exec('node_modules/typescript-formatter/bin/tsfmt <%= file.path %> | diff --ignore-blank-lines <%= file.path %> -', options))
    .pipe(exec.reporter());
});

gulp.task('tsfmt', function() {
  gulp.src('src/*.ts')
    .pipe(exec('node_modules/typescript-formatter/bin/tsfmt --replace <%= file.path %>'))
    .pipe(exec.reporter());
});

gulp.task('watch', ['tsc', 'lint'], function() {
  gulp.watch(src, ['tsc', 'lint']);
});

gulp.task('fmt', ['jsfmt', 'tsfmt'], function() {
});
