var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    concatCSS = require('gulp-concat-css'),
    critical = require('critical');

 
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

gulp.task('critical', function(){
  critical.generate({
    'inline': true,
    'src': 'index.html',
    'base': 'docroot',
    'dest': './docroot/index.html'
  });
});

gulp.task('js', function(){
  return gulp.src([
    './docroot/js/jquery-2.1.4.js',
    './docroot/js/masonry.pkgd.js',
    './docroot/js/lightbox.js',
    './docroot/js/bootstrap.js'
    ])
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('./docroot/js/'))
});



gulp.task('default', function(){
  return runSequence('less', 'css', 'critical', 'js');
});