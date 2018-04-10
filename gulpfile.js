const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();

gulp.task('default', function(){
  console.log("Hooray - you created a Gulp tasks.");
});

gulp.task('html', function() {
console.log("imagine something useful to my html");
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
  .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
  .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
});

  watch('./app/assets/styles/**/*.css', function() {
  gulp.start('cssInject');
});

});

gulp.task('cssInject', ['styles'] ,function(){
  return gulp.src('./app/temp/styles/styles.css')
  .pipe(browserSync.stream());
});