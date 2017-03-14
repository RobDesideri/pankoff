# Pankoff

> A web site static generator based on [Panini](https://github.com/zurb/panini) template engine system and  [Kickoff](https://github.com/TryKickoff/kickoff) front-end framework: the **Pankoff**.


## Features
|                	| Feature                    	| Description                                                                                   	|
|----------------	|----------------------------	|-----------------------------------------------------------------------------------------------	|
| :fast_forward: 	| #webperf                   	| Performance-first, responsive philosophy                                                      	|
| :oncoming_bus: 	| Rock-solid build tasks     	| We use gulp & webpack to deliver the best task runner & developer experience for your project 	|
| :eyeglasses:   	| Unopinionated & extendable 	| A few common UI elements, a grid & some other base styles. The rest is up to you.             	|
| :crystal_ball: 	| Future proof               	| Build complex layouts with flexbox & use ES2015 (ES6) for your javascript.                                                  	|
| :angry:        	| Lean & mean                	| CSS: 8.68 kB gzipped<br> JS: 2 kB gzipped<br> It is a boilerplate after all :wink:                 	|

## Tasks
| Command | Description |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `npm start` | Basic dev server using [Browsersync](http://www.browsersync.io/) |
| `npm run watch` | Watch all files for changes |
| `npm run deploy` | Install all dependencies and compile all assets for production deployment |
| `npm run compile:all` | Compile the CSS & JS, compress the images and run any other compilation tasks needed to run your app |
| `npm run compile:release` | Add the `--release` flag to any other task, e.g. `gulp javascript --release` or `gulp css --release` |
| `npm run compile:css` | [Sass](http://sass-lang.com/) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)), [Postcss](http://postcss.org/) with [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSNano](https://github.com/ben-eb/cssnano), Source Maps & more.. |
| `npm run compile:js` | [Babel](http://babeljs.io/), [Webpack](http://webpack.github.io/) |
| `npm run compile:svg` | Auto-generated [SVG sprites](https://github.com/w0rm/gulp-svgstore) |
| `npm run compile:html` | Build the html pages from Handlebars templating by [Panini](https://github.com/zurb/panini) engine |
| `npm run compress:images` | Image compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin) |
| `npm run lint:js` | Lint JS using [xo](https://github.com/sindresorhus/xo) |
| `npm run fix:js` | Fix JS linting issues using [xo](https://github.com/sindresorhus/xo) |
| `npm run lint:css` | Lint CSS using [stylelint](https://github.com/stylelint/stylelint). We use the [https://github.com/stylelint/stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) rules for our linting |
| `npm test` | Run javascript and css tests |
| `npm run clean:all` | Clean the compiled files |
| `npm run copy:all` | Run the copy tasks - useful for things like webfonts etc |
| `npm run release-patch` | Creates a patch release using [release-it](https://github.com/webpro/release-it) |
| `npm run release-minor` | Creates a minor release using [release-it](https://github.com/webpro/release-it) |
| `npm run release-major` | Creates a major release using [release-it](https://github.com/webpro/release-it) |
| `npm run release-premajor` | Creates a premajor release using [release-it](https://github.com/webpro/release-it) |

## Browser compatibility
Kickoff has been tested in the following browsers:

| [Chrome](https://www.google.com/chrome/) (latest) | [Firefox](https://www.mozilla.org/en-GB/firefox/new/) (latest) | [Safari](https://www.apple.com/safari/) (latest) | [Edge](http://www.microsoft.com/en-us/windows/microsoft-edge) (latest) | [Opera](https://www.opera.com/) (latest) |
|:----------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------:|------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_64x64.png" width="48" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_64x64.png" width="48" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_64x64.png" width="48" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_64x64.png" alt="Microsoft Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_64x64.png" width="48" alt="Opera"> |

We also support older versions of Internet Explorer but the support is limited. For example, the Kickoff grid relies on flexbox so Modernizr is needed to detect for it and then we can provide a fallback.

---

# Technical difference between Kickoff and Pankoff

## Configuration

### config.js
Edits on original _config.js_ kickoff

#### Variables edits
Set main distribution css file with *main.js* as name.  
```
config.css.distFile = 'main'
```

#### Member edits
Set  main distribution javascript file with *main.js* as name insted of *kickoff.js*:  
`config.js.entryPoints.kickoff` to `config.js.entryPoints.main`  


#### Adds
1. Html & Templating related configuration  
  
```
config.html = { 
  srcDir: `${config.srcDir}/html`,  
  distDir: `${config.distDir}`,  
  data: `${config.srcDir}/html/data`,  
  metaHead: `${config.srcDir}/html/data/metaHead.yml`,  
  pages: `${config.srcDir}/html/pages`,  
  template: `${config.srcDir}/html/template`,  
  templateHelpers: `${config.srcDir}/html/template/helpers`,  
  templateLayouts: `${config.srcDir}/html/template/layouts`,  
  templatePartials: `${config.srcDir}/html/template/partials`,  
}; 
```
2. Favicon related configuration
```
config.favicon = {
  logo: `${config.img.srcDir}/logo.png`
};
```
3. Server related configuration
```
config.server = {
  port: 8000,
  browser: 'C:\\Program Files (x86)\\Firefox Developer Edition\\firefox.exe'
};
```

## Tasks
Some edits and adds to tasks in `.kickoff/tasks`.  

### serve.js

#### Edits
Base directory to distribution folder, not the root workspace dir:
```
browserSync.server.baseDir =`${config.distDir}/`
  
// ...  
  
files: [
  `${config.css.distDir}/**/*.css`,
  `${config.js.distDir}/**/*.js`,
  `${config.img.distDir}/**/*`,
  `${config.svg.distDir}/**/*`,
  `${config.content.distDir}/**/*.html`,
]
```
#### Adds

* browserSync.browser option, from the config.js file settings:
```
browserSync.browser: `${config.browsersync.browser}`
```
* browserSync.port option, from the config.js file settings:
```
browserSync.port: `${config.browsersync.port}`
```

### html.js
This task build html pages from: 
1. template files
2. data files
3. favicon settings and files

### compile.js
Added the `html` task in the `compile` task.

## NPM configuration
Added these dev dependencies:
* gulp-inject-string (v1.1.0)
* gulp-real-favicon (v0.2.2)
* gulp-rename (v1.2.2)
* js-yaml v3.8.2)
* panini (v1.4.0)

## Project structure
Added these folders in the project structure:
* src/html
* src/html/data
* src/html/pages
* src/html/template
* src/html/template/helpers
* src/html/template/layouts
* src/html/template/partials
