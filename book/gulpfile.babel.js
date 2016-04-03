'use strict';

import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import watchify from 'watchify';
import streamify from 'gulp-streamify';
import buffer  from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import plumber  from 'gulp-plumber';
import tap from 'gulp-tap';
import _ from 'lodash';

var paths = {
  _source:'./source',
  build:'./static',
  buildStyle:'./static/stylesheets/',
  buildScript:'./static/javascripts/',
};
var entries = [`${paths._source}/app.js`,`${paths._source}/search.js`];
var customOpts = {
  entries: entries,
  debug: true,
  cache: {},
  packageCache: {}
};

var opts = _.assign({}, watchify.args, customOpts);

function bundle(file_source,func){
  var b = //watchify(
    browserify(opts);
  //);
  b.on('update',func)
   .on('log', gutil.log);
  return b.transform(babelify, {
        presets: ["es2015"]
  }).bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(file_source))
    .pipe(gulp.dest(paths.buildScript));
}

function bundleWithApp(){
  return bundle(`app.js`,bundleWithApp);
}

function bundleWithSearch(){
  return bundle(`search.js`,bundleWithSearch);
}

var event = ['app','search'];
var func_event = {
  'app':bundleWithApp,
  'search': bundleWithSearch
}

gulp.task('default',event);

event.map( item => {
  gulp.task(item,function(){
    return func_event[item]();
  });
})

