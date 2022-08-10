// Import dependencies

var gulp = require("gulp");
var notify = require("gulp-notify");
var sass = require('gulp-sass')(require('sass'));
var styleguide = require("sc5-styleguide");
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var concat = require("gulp-concat");
var outputPath = 'styleguide';
var cssPath = 'styleguide/css';
// assign paths
var imgSrc = 'src/images/**';
var source = 'src/**/*.scss';
// compile scss to css

gulp.task('styles', function(){
    return gulp.src([source])
    .pipe(sass().on('Error', notify.onError()))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('images', function() {
  return gulp.src([imgSrc])
    .pipe(gulp.dest(outputPath + '/images'));
});

// generate styleguide

gulp.task('styleguide:generate', function(){
    return gulp.src([source])
    .pipe(styleguide.generate({
        title: 'Leicester City Council Styleguide',
        overviewPath: 'overview.md',
        commonClass: 'sg-common',
        appRoot: '/styleguide',
        extraHead: [
                '<link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend&display=swap" rel="stylesheet">'
          ],
        includeDefaultStyles: 'false',
        disableEncapsulation: 'true',
        parsers: { 
            scss: 'scss'
        }
    }))
    .pipe(gulp.dest(outputPath))
});


gulp.task('styleguide', gulp.series('styleguide:generate','styles','images'));

// default task

gulp.task('watch', function(){
    gulp.watch([source], gulp.series('styleguide'));
});

gulp.task('default', gulp.series('styleguide', 'styles','watch'));