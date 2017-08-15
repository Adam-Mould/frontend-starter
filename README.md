# Frontend Starter

A custom built front-end starter project, which can be used to speed up initial setup of your next project. The starter files are geared towards automation for fast development iteration, and outputting production ready JavaScript and CSS.

## Tech Stack
* Bootstrap 4
* GulpJS
* RollupJS
* Node/NPM
* SASS

## Quick start
```
npm install
npm run build
npm start
```
You will now have a localhost instance running of the site on [http://127.0.0.1:8080](http://127.0.0.1:8080)

## Features

- [Node package manager (NPM)](https://www.npmjs.com) handling all package dependencies.
- [GulpJS](http://gulpjs.com) is used to automate the workflow throughout development, and prepare the site ready for deployment. Run `gulp --tasks` to see the available tasks, or refer to `gulpfile.babel.js`.
- [BootStrap 4](https://getbootstrap.com) versioned using NPM, imported using SCSS partials, and ES2015 module importing in JavaScript.
- [RollupJS](rollupjs.org) module bundling for JavaScript.
- [BabelJS](https://babeljs.io) to transpile the JavaScript.
- [ESLint](http://eslint.org) linting our JavaScript against AirBnb standards.
- [SCSS](http://sass-lang.com) and the awesome [Bourbon mixin library](http://bourbon.io/) are setup and ready to use.

The `gulp` task will create a new folder `dist` at the root level. This will contain the bundled JavaScript file, and compiled CSS file.