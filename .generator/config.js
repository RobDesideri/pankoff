/**
 * Global build task vars
 * Both Webpack and Gulp use these vars. Change as much as you like :)
 */
const gutil = require('gulp-util');
const pkg = require('../package');

const ConfigOptions = function () {
  const config = this;

  config.isRelease = (gutil.env.release ? true : false);

  config.srcDir = './src'; // config.srcDir
  config.distDir = './dist'; // config.distDir

  // CSS-related vars
  config.css = {
    scssDir: `${config.srcDir}/scss`, // config.css.scssDir
    distDir: `${config.distDir}/css`, // config.css.distDir

    // Renaming this changes the name of the generated CSS file
    // Make sure you update your template file
    distFile: 'main', // config.css.distFile

    // We are supporting the last 2 browsers, any browsers with >5% market share,
    // and ensuring we support IE9+ with prefixes
    browsers: ['> 5%', 'last 2 versions', 'ie > 8'], // config.css.browsers
  };

  // Javascript-related vars
  config.js = {
    srcDir: `${config.srcDir}/js`, // config.js.srcDir

    entryPoints: {
      main: [`${this.srcDir}/js/script.js`],
      styleguide: [`${this.srcDir}/js/styleguide.js`],

      // Create more entry-points by adding to this array, e.g.
      // foo: [`${this.srcDir}/js/bar.js`],
    },

    distDir: `${config.distDir}/js`, // config.js.distDir
  };

  // Image-related vars
  config.img = {
    srcDir: `${config.srcDir}/img`, // config.img.srcDir
    distDir: `${config.distDir}/img`, // config.img.distDir
  };

  // SVG-related vars
  config.svg = {
    srcDir: `${config.srcDir}/svg`, // config.svg.srcDir
    distDir: `${config.distDir}/svg`, // config.svg.distDir
  };

  // Webfont-related vars - unused by default
  config.fonts = {
    srcDir: `${config.srcDir}/fonts`, // config.fonts.srcDir
    distDir: `${config.distDir}/fonts`, // config.fonts.distDir
  };

  config.gulp = {
    // Reports which file was changed
    onChange: function (evt) {
      gutil.log(gutil.colors.cyan.bold('❯❯ File: ' + evt.path.replace(new RegExp('/.*(?=/' + config.srcDir.substr(2) + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
    }
  };

  // Banners and info
  config.misc = {
    banner: `/**
 * ${pkg.title} v${pkg.version}
 * ${pkg.homepage}
 * ${pkg.repo}
 */
`,

    // Output file-size and gzip file-size. May slow-down build.
    showFileSize: true,
  };

  // Html&Templating-related vars (Handlebars, ecc.)
  config.html = {
    srcDir: `${config.srcDir}/html`, // config.html.srcDir
    distDir: `${config.distDir}`, // config.html.distDir
    data: `${config.srcDir}/html/data`, // config.html.data
    metaHead: `${config.srcDir}/html/data/htmlHeadMeta.yml`, // config.html.metaHead
    pages: `${config.srcDir}/html/pages`, // config.html.pages
    template: `${config.srcDir}/html/template`,  // config.html.template
    templateHelpers: `${config.srcDir}/html/template/helpers`,  // config.html.templateHelpers
    templateLayouts: `${config.srcDir}/html/template/layouts`,  // config.html.templateLayouts
    templatePartials: `${config.srcDir}/html/template/partials`,  // config.html.templatePartials
  };

  // Favicon-related vars (Handlebars, ecc.)
  config.favicon = {
    logo: `${config.img.srcDir}/logo.png` // config.img.logo
  };

  // Server-related vars
  config.server = {
    port: 8000,
    browser: 'C:\\Program Files (x86)\\Firefox Developer Edition\\firefox.exe'
  };
}

module.exports = new ConfigOptions();
