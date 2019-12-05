let gulp         = require('gulp'),
    pug          = require('gulp-pug'),
    sass         = require('gulp-sass'),
    stylus       = require('gulp-stylus'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('pug', function () {
  return gulp.src('./project/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('docs'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('stylus', function () {
  return gulp.src('./project/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 3 versions']
    }))
    .pipe(gulp.dest('./docs/css/'))
    .pipe(browserSync.reload({stream: true}))
});



gulp.task('html', function(){
  return gulp.src('./docs/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('./docs/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});



gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "docs/"
      }
  });
});



gulp.task('watch', function(){
  gulp.watch('./project/stylus/**/*.styl', gulp.parallel('stylus'));
  // gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('./project/**/*.pug', gulp.parallel('pug'));
  gulp.watch('./docs/*.html', gulp.parallel('html'));
  gulp.watch('./docs/js/*.js', gulp.parallel('script'));
});



gulp.task('default', gulp.parallel('stylus', 'html', 'script', 'browser-sync', 'watch'));







