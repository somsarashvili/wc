const gulp = require('gulp');
const jsonmin = require('gulp-jsonmin');

function minifyJson() {
  return gulp
    .src('./dist/**/*.json') // Change this path to match your JSON files location
    .pipe(jsonmin())
    .pipe(gulp.dest('./dist')); // Change this path to match your desired output folder
}
gulp.task('default', () => {
  return minifyJson();
});