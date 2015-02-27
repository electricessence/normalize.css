var gulp = require('gulp');
var tasks = [];

(function() {
	var less = require('gulp-less');
	var sourcemaps = require('gulp-sourcemaps');

	var srcFolder = 'less', ext = 'less';
	var sourceFiles = [srcFolder + '/*.' + ext, '!' + srcFolder + '/_*.' + ext];

	var cleancss = new (require("less-plugin-clean-css"))({advanced: true});

	var
		REL = '.release', MIN = '.min',
		NORMAL = tasks[0] = 'less',
		NORMAL_MIN = tasks[1] = NORMAL + MIN,
		RELEASE = tasks[2] = NORMAL + REL,
		RELEASE_MIN = tasks[3] = RELEASE + '.min';

	gulp.task(
		NORMAL, function() {

			gulp.src(sourceFiles)
				.pipe(sourcemaps.init())
				.pipe(less())
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest('./css'))
			;

		});

	gulp.task(
		RELEASE, function() {

			gulp.src(sourceFiles)
				.pipe(less())
				.pipe(gulp.dest('./css/release'))
			;

		});

	gulp.task(
		NORMAL_MIN, function() {

			gulp.src(sourceFiles)
				.pipe(sourcemaps.init())
				.pipe(less({plugins:[cleancss]}))
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest('./css/min'))
			;

		});

	gulp.task(
		RELEASE_MIN, function() {

			gulp.src(sourceFiles)
				.pipe(less({plugins:[cleancss]}))
				.pipe(gulp.dest('./css/release/min'))
			;

		});
})();

gulp.task('default', tasks, function() {});
