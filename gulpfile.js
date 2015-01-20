var gulp = require('gulp');
var util = require('gulp-util');
var marked = require('gulp-marked');
var applyTemplate = require('gulp-apply-template');
var clone = require('gulp-clone');
var rename = require('gulp-rename');
var highlight = require('highlight.js');
var del = require('del');
var path = require('path');
var git = require('gulp-git');
var exec = require('child_process').exec;
var sass = require('gulp-sass');

gulp.task('clean', function(cb){
	del([],cb);
});


// get README from master branch and copy it into 0.0/API.md
gulp.task('build:getapi' ,function(cb){
	exec('mkdir -p src/0.0 && git show master:README.md > src/0.0/API.md', cb);
});

gulp.task('build:md', ['build:getapi'] ,function () {
	return gulp.src('src/**/*.md')
		//.pipe(frontMatter({property: 'page', remove: true}))
		.pipe(marked({
			highlight: function(code){
				return highlight.highlightAuto(code).value;
			}
		}))
		.pipe(applyTemplate({engine:'swig', template: function(context,file){
			context.basename = path.basename(file.path,'.html');
			return path.join(path.dirname(file.path), 'md.swig');
		}}))
		.pipe(rename({extname: '.html'}))
		.pipe(gulp.dest('.'));
});

gulp.task('build:js', function(){
	var cloneSink = clone.sink();

	return gulp.src('src/**/*.js')
		// create activation pages using clone
		.pipe(cloneSink)
		.pipe(applyTemplate({engine:'swig', template: function(context, file){
			context.url = path.join(path.relative('bower_components/piquest/src/', '0.0/scripts'), path.basename(file.path));
			return path.join(path.dirname(file.path), 'js.swig');
		}}))
		.pipe(rename({extname: '.html'}))
		.pipe(cloneSink.tap())
		.pipe(gulp.dest('.'));
});

gulp.task('build:css', function(){
	return gulp.src('src/**/*.scss')
		.pipe(sass({errLogToConsole: true}))
		.pipe(gulp.dest('.'));
});

gulp.task('build',  ['build:js', 'build:md', 'build:css']);

gulp.task('watch', function(){
	gulp.watch(['src/**/*'], ['build']);
});

gulp.task('build:bower', function(cb){
	exec('bower update', cb);
});

gulp.task('deploy', function(){
	gulp.run(['build'])
	// update bower
	// copy latest api.md(s) into the correct folder (using git.exec('git show master:quest/API.md'))
	// build
	// git add
	// git push
});

gulp.task('default', ['build']);