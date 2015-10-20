var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    concatCSS = require('gulp-concat-css');

 
gulp.task('less', function(){
  return gulp.src('./docroot/less/bootstrap.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./docroot/css'));
});

gulp.task('css', function(){
  return gulp.src(['./docroot/css/bootstrap.css', 
                   './docroot/css/lightbox.css',
                   './docroot/css/starter-template.css'])
    .pipe(concatCSS('styles.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./docroot/css/'))
});

gulp.task('default', function(){
  return runSequence('less', 'css');
});