// Import dependencies

var gulp = require("gulp");
var notify = require("gulp-notify");
var sass = require('gulp-sass')(require('sass'));
var styleguide = require("sc5-styleguide");
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var outputPath = 'output';
// assign paths

var source = 'src/**/*.scss';
// compile scss to css

gulp.task('styles', function(){
    return gulp.src([source])
    .pipe(sass().on('Error', notify.onError()))
    .pipe(gulp.dest(outputPath));
});

// generate styleguide

gulp.task('styleguide:generate', function(){
    return gulp.src([source])
    .pipe(styleguide.generate({
        title: 'Leicester City Council Styleguide',
        rootPath: outputPath,
        overviewPath: 'overview.md',
        commonClass: 'sg-common',
        server: 'true',
        includeDefaultStyles: 'false',
        userStyleFile: 'main.css',
        disableEncapsulation: 'true',
        parsers: { 
            scss: 'scss'
        }
    }))
    .pipe(gulp.dest(outputPath))
});

gulp.task('styleguide', ['styleguide:generate','styles']);

// default task

gulp.task('watch', ['styleguide'], function(){
    gulp.watch([source], ['styleguide']);
});