// LESSON PLAN NOTE
// use module approach to require gulp and other dev dependencies
// gulp is a toolkit that will help you automate time consuming tasks in your workflow
var gulp = require('../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/gulp');
var sourcemaps = require('../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/gulp-sourcemaps');
var source = require('../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/vinyl-source-stream');
var buffer = require('../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/vinyl-buffer');
var browserify = require('../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/browserify');
var babel = require('../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/babelify');
var concat = require('../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/gulp-concat');
var merge = require('../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/merge-stream');

// for transpiling ES2015 to ES5 via Babel
gulp.task('build', function(){

  // ./src/app.js is the entry point in your project folder (change it to as required)
  var bundler = browserify('./src/rainworld-tracker.js', { debug: true }).transform(babel);

  bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('rainworld-tracker.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      // where transpiled JS is output
      .pipe(gulp.dest('./js'));

      console.log(">>> I am busy transpiling JS :)");
});
// no need to use Watchify as gulp has gulp.watch built in (although not as efficient)
gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('default', ['watch','build']);