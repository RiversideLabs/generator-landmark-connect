var gulp = require('gulp');
var shell = require('gulp-shell');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('install-plugins', shell.task([
  'cordova plugin add org.apache.cordova.device',
  'cordova plugin add org.apache.cordova.file',
  'cordova plugin add org.apache.cordova.geolocation',
  'cordova plugin add org.apache.cordova.inappbrowser',
  'cordova plugin add https://github.com/driftyco/ionic-plugins-keyboard.git',
  'cordova plugin add org.apache.cordova.media',
  'cordova plugin add org.apache.cordova.splashscreen',
  'cordova plugin add org.apache.cordova.statusbar'
]));

gulp.task('sass', function(done) {
  gulp.src('./scss/landmark.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass']);
