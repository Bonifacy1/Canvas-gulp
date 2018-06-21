const babel = require('gulp-babel');
const uglify = require('gulp-uglify')
const gulp = require('gulp');
const pump = require('pump')

gulp.task('default', (cb) =>{
    pump(
        [gulp.src("src/app.js"),
        babel(),
        uglify(),
        gulp.dest("dist")], cb
    );
});
