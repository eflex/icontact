var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");

gulp.task("transform", function() {
  return gulp.src('./src/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./lib'))
})

gulp.task("watch", function() {
  gulp.watch("./src/*.js", ["transform"])
})

gulp.task("default", ["transform", "watch"])
