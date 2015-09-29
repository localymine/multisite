'use strict';

var pkg = require('./package.json'),
    bundler = require('./gulp/bundler'),
    sass = require('./gulp/sass'),
    toc = require('./gulp/toc'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    prefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    compartment = require('compartment'),

    karma = require('karma').server,
    eslint = require('gulp-eslint'),
    babel = require('gulp-babel'),
    options = gutil.env,
    banner = "/*! Titon Toolkit v<%= pkg.version %> | <%= pkg.license %> | <%= pkg.homepage.replace('http://', '') %> */\n";

/**
 * Notification helpers.
 */

function success(message) {
    return notify({ title: 'Titon Toolkit - Success', message: message, onLast: true });
}

function failure() {
    return { errorHandler: notify.onError({ title: 'Titon Toolkit - Failure', message: '<%= error.message %>' }) };
}

/**
 * Determine which modules we should package.
 *
 * The --modules parameter can be used to filter down modules
 * The --[no-]normalize parameter will include or exclude normalize.css from the output
 * The --dist parameter will determine which folder to build to: build, or dist
 * The --rtl parameter will append a `-rtl` to the CSS filename
 */

var graph = new compartment();
    graph.loadManifest('./manifest.json');
    graph.addTypes({
        js: '', // Handled by RequireJS
        css: ''
    });

var toPackage = [],
    categories = ['layout', 'component', 'behavior'];

if (options.modules) {
    toPackage = options.modules.split(',');

} else {
    Object.keys(graph.manifest).forEach(function(key) {
        if (key === 'normalize') {
            return;
        }

        if (categories.indexOf(graph.manifest[key].category) >= 0) {
            toPackage.push(key);
        }
    });
}

// Include normalize first
/*if (options.normalize || !('normalize' in options)) {
    toPackage.unshift('normalize');
}*/

// Build the chain and generate all the paths we will need.
graph.buildChain(toPackage, categories);

var jsPaths = graph.getPaths('js'),
    cssPaths = graph.getPaths('css'),
    buildPath = options.dist ? './dist' : './build';

/**
 * Tasks to compile CSS and JavaScript files.
 */

gulp.task('css', function() {
    return gulp.src(cssPaths)
        .pipe(plumber(failure()))

        // Unminified
        .pipe(sass({ style: 'expanded' }))
        .pipe(concat('toolkit.css'))
        .pipe(prefixer({ browsers: ['last 3 versions'] }))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename(function(path) {
            if (options.rtl) {
                path.basename += '-rtl';
            }
        }))
        .pipe(gulp.dest(buildPath))

        // Minified
        .pipe(minify({ advanced: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(buildPath))
        .pipe(success('CSS compiled...'));
});

/*gulp.task('js', function() {
    return rjs(jsPaths, { version: pkg.version })
        .pipe(plumber(failure()))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))

        // Unminified
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest(buildPath))

        // Minified
        .pipe(uglify({
            // `some` includes more than just ! comments
            preserveComments: function(node, comment) {
                return comment.value.match(/^!/);
            }
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(buildPath))
        .pipe(success('JavaScript compiled...'));
});*/

gulp.task('lint', function() {
    return gulp.src(['./js-es6/**/*.js', './tests-es6/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('es6', ['lint'], function() {
    return gulp.src('./js-es6/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./build-es6/'));
});

gulp.task('test', ['lint'], function(done) {
    karma.start({
        configFile: __dirname + '/.karmarc'
    }, done);
});

gulp.task('docs', function() {
    return gulp.src('./docs/*')
        .pipe(plumber(failure()))
        .pipe(toc());
});

gulp.task('default', ['js', 'css']);

gulp.task('watch', ['js', 'css'], function() {
    gulp.watch('./js/**/*.js', ['js']);
    gulp.watch('./scss/**/*.scss', ['css']);
});
