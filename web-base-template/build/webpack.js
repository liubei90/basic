var webpack = require('webpack');
var merge = require('webpack-merge').merge;


function mergeOptions(options) {
  return merge({}, ...options);
}

function doWebpack(...options) {
  var isRun = true;

  if (typeof(options[options.length - 1]) === 'boolean') {
    isRun = options.pop();
  }

  var webpackConfig = mergeOptions(options);
  console.log(JSON.stringify(webpackConfig, null, 4));
  var compiler = webpack(webpackConfig);

  if (isRun) {
    compiler.run((err, stats) => {
      if (err) {
        throw err;
      }
    
      console.log(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }));
    });
  }

  return compiler;
}

module.exports = {
  doWebpack: doWebpack,
  mergeOptions: mergeOptions,
}