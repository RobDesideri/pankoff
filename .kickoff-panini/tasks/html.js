/**
 * gulp html
 */
const gulp = require('gulp');
const config = require('../config');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const panini = require('panini');
const rename = require('gulp-rename');
const injectString = require('gulp-inject-string');
const realFavicon = require('gulp-real-favicon');
const gutil = require('gulp-util')

function buildHead() {
  let metArr = [];

	// Resolve relative path
	function resolveRelativePath(pathToResolve = '') {
		src = config.srcDir
		dist = config.distDir
		let pp = path.parse(pathToResolve)
		if (pathToResolve.startsWith(src)) {
			pp.dir = pp.dir.replace(src, '')
		} else if (pathToResolve.startsWith(dist)) {
			pp.dir = pp.dir.replace(dist, '')
		}

		return path.format(pp)
	}

  // HTML Meta tag builder
  function getMeta(name, content, charset = '') {
    if (charset === '') {
      return '<meta name="' + name + '" content="' + content + '">';
    } else {
      return '<meta charset="' + charset + '">';
    }
  }

  // All meta in metArr
  fs.exists(config.html.metaHead, (exists) => {
    if (exists) {
      let headYml = fs.readFileSync(config.html.metaHead, 'utf-8');
      let head = yaml.load(headYml);
      // Add custom meta from metaHead.yml file
      head.meta.forEach(function (item) {
        if (item.name === 'charset' && item.content !== '') {
          metArr.push(getMeta('', '', item.content));
        } else {
          metArr.push(getMeta(item.name, item.content));
        }
      });
    }
  });

  // All scripts sources in metArr
  for (var item in config.js.entryPoints) {
    if (config.js.entryPoints.hasOwnProperty(item)) {
      metArr.push('<script src="' + path.normalize(resolveRelativePath(config.js.distDir) + `/${item}.js`) + '"></script>');

    }
  }

  // Add stylesheet resource in metArr
  metArr.push('<link rel="stylesheet" href="' + path.normalize(resolveRelativePath(config.css.distDir + '/' + config.css.distFile)) + '.css">')

  let out = metArr.join('\n')
  return out;
}

gulp.task('faviconGen', function (callback) {
  let conf = {
    'masterPicture': config.favicon.logo,
    'dest': config.distDir,
    'iconsPath': '/',
    'design': {
      'ios': {
        'pictureAspect': 'noChange',
        'assets': {
          'ios6AndPriorIcons': false,
          'ios7AndLaterIcons': false,
          'precomposedIcons': false,
          'declareOnlyDefaultIcon': true
        }
      },
      'desktopBrowser': {},
      'windows': {
        'pictureAspect': 'noChange',
        'backgroundColor': '#da532c',
        'onConflict': 'override',
        'assets': {
          'windows80Ie10Tile': false,
          'windows10Ie11EdgeTiles': {
            'small': false,
            'medium': true,
            'big': false,
            'rectangle': false
          }
        }
      },
      'androidChrome': {
        'pictureAspect': 'noChange',
        'themeColor': '#ffffff',
        'manifest': {
          'display': 'standalone',
          'orientation': 'notSet',
          'onConflict': 'override',
          'declared': true
        },
        'assets': {
          'legacyIcon': false,
          'lowResolutionIcons': false
        }
      },
      'safariPinnedTab': {
        'pictureAspect': 'silhouette',
        'themeColor': '#5bbad5'
      }
    },
    'settings': {
      'compression': 5,
      'scalingAlgorithm': 'Spline',
      'errorOnImageTooSmall': false
    },
    'markupFile': './.realFavicon.json'
  };

  function checkFaviconUpdate(done) {

    fs.exists('./.realFavicon.json', (exists) => {
      if (exists) {
        let rfi = fs.readFileSync('./.realFavicon.json');
        let currentVersion = JSON.parse(rfi).version;
        realFavicon.checkForUpdates(currentVersion);
        done();
      } else {
				done();
      }
    });
  }

  fs.exists(config.favicon.logo, (exists) => {
    if (exists) {
      try {
        checkFaviconUpdate(() => realFavicon.generateFavicon(conf, () => { callback(); }));
      } catch (err) {
        console.log('Error by generateFavicon: \n' + err.stack);
      }
    }
  });
});

gulp.task('html', ['faviconGen'], () => {
  // panini template engine configuration
  let paniniConfig = {
    root: config.html.pages,
    data: config.html.data,
    helpers: config.html.templateHelpers,
    layouts: config.html.templateLayouts,
    partials: config.html.templatePartials
  };

  // get head elements by buildHead function
  let meta = buildHead()

  return gulp.src([`${config.html.pages}/*.{hbs,handlebars,html}`])
    .pipe(panini(paniniConfig))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(injectString.after('<head>', '\n' + meta + '\n'))
    .pipe(fs.existsSync('./.realFavicon.json') ? realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync('./.realFavicon.json')).favicon.html_code) : gutil.noop())
    .pipe(gulp.dest(config.html.distDir));
});
