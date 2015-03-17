
var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	inject = require('gulp-inject'),
	del = require('del'),
	bowerMainFiles = require('main-bower-files');

var _ = require('underscore');

var paths = {
	buildStyle:'stylesheets',
	buildSCript:'javascripts',
	srcStatic:'static'
}

gulp.task('default',['watch']);


gulp.task('watch',['serve'],function(){
	gulp.watch(paths.buildSCript,['scripts']);
	gulp.watch(paths.buildStyle,['style']);
})

gulp.task('serve',['copyAll'],function(){
});


gulp.task('style.copy',function(){
	var css = _.filter(bowerMainFiles(),function(i){
		return i.match(/.css$/);
	});
	gulp.src(css).pipe(gulp.dest(paths.srcStatic+"/"+paths.buildStyle));
});

gulp.task('scripts.copy',function(){
	var js = _.filter(bowerMainFiles(),function(i){
		return i.match(/.js$/);
	});
	gulp.src(js).pipe(gulp.dest(paths.srcStatic+"/"+paths.buildSCript));
});


gulp.task('scripts', ['scripts.copy'], function () {

	var appScriptFiles = gulp.src([bowerScript], {
		read: false
	});

	return gulp.src(appScriptFiles)
		.pipe(gulp.dest(paths.srcStatic));
});

gulp.task('copyAll', ['scripts.copy','style.copy'], function () {

});
