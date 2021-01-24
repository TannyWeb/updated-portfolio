var gulp = require('gulp');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var connect = require('gulp-connect');


gulp.task ('css', function(){
    
    gulp.src('sass/main.sass')
        .pipe(sass({compress: false, path: ['sass']}))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('css'))
        .pipe(connect.reload())
    
    
});

gulp.task('js', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/modernizr/modernizr.js',

  ])
    .pipe( concat('output.min.js') ) // concat pulls all our files together before minifying them
    .pipe(uglify())
    .pipe(gulp.dest('js'))
})


gulp.task ('watch', function(){
    
    gulp.watch ('sass/*.sass', ['css']);
    
    
    
});

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true,
    open: true
  });
});


gulp.task('start', gulp.series('connect', 'watch'));

