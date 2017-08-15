'use strict';

import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import cssnano from 'cssnano';
import del from 'del';
import eslint from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import pixrem from 'pixrem';
import postcss from 'gulp-postcss';
import resolve from 'rollup-plugin-node-resolve';
import rollup from 'rollup-stream';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';

const paths = {
    styles: {
        entry: 'assets/scss/index.scss',
        src: 'assets/scss/**/*.scss',
        dest: 'dist',
    },
    scripts: {
        entry: 'assets/js/index.js',
        src: 'assets/js/**/*.js',
        dest: 'dist',
    },
};

export const clean = () => del(['dist']);

/**
 * SCSS Compilation using node-sass
 */
const postcssPlugins = (dev = false) => {
    const plugins = [
        autoprefixer({browsers: ['last 10 versions', 'ie >= 10']}),
        pixrem(),
    ];

    if (!dev) {
        plugins.push(cssnano());
    }

    return plugins;
};

export const styles = () => {
    const dev = process.env.NODE_ENV === 'development';

    return gulp.src(paths.styles.entry)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(gulpif(dev, sourcemaps.init()))
        .pipe(sass({
            includePaths: [
                require('node-bourbon').includePaths,
                'node_modules/bootstrap/scss/',
            ],
            outputStyle: dev ? 'nested' : 'compressed',
        }).on('error', sass.logError))
        .pipe(gulpif(dev, sourcemaps.write()))
        .pipe(postcss(postcssPlugins(dev)))
        .pipe(gulp.dest(paths.styles.dest));
};

/**
 * Module bundle JS using RollupJS
 */
export const scripts = () => {
    const dev = process.env.NODE_ENV === 'development';

    return rollup({
        entry: paths.scripts.entry,
        format: 'iife',
        moduleName: 'library',
        sourceMap: dev,
        plugins: [
            eslint({
                throwOnWarning: !dev,
                throwOnError: !dev,
            }),
            resolve(),
            json(),
            babel({
                exclude: 'node_modules/**',
            }),
        ],
    })
    .pipe(source('index.js'))
    .pipe(gulp.dest(paths.scripts.dest));
};

export const watch = () => {
    process.env.NODE_ENV = 'development';
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
};


const build = gulp.series(clean, gulp.parallel(styles, scripts));

/**
 * Export a default task
 */
export default build;
