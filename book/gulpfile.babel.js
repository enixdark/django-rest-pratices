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
const args = process.argv.slice(2);
var entries = []
var event = ['app','search','profile'];
var paths = {
  _source:'./source',
  build:'./static',
  buildStyle:'./static/stylesheets/',
  buildScript:'./static/javascripts/',
};

if (args.length > 0){
  args.forEach( e => entries.push(`${paths._source}/${e}.js`));
}
else{
  event.forEach( e => entries.push(`${paths._source}/${e}.js`));
}


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

function bundleWithProfile(){
  return bundle(`profile.js`,bundleWithApp);
}

var func_event = {
  'app':bundleWithApp,
  'search': bundleWithSearch,
  'profile': bundleWithProfile
}

gulp.task('default',event);

event.map( item => {

  gulp.task(item,function(){
    return func_event[item]();
  });
})

