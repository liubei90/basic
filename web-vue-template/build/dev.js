var webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
var base = require('./config.base');
var doWebpack = require('./webpack').doWebpack;
var { 
  getProductName, 
  getProductConfig,
  resolveRootPath,
  resolveProductDistPath } = require('./utils');
var productConfig = getProductConfig();


var compiler = doWebpack(base, {
  mode: 'development',
  module: {
    // rules: [
    //   {
    //     test: /\.css$/,
    //     use: [
    //       // { loader: 'style-loader' },
    //       { loader: 'vue-style-loader' },
    //       { 
    //         loader: 'css-loader',
    //         options: {
    //           modules: true,
    //         } 
    //       }
    //     ]
    //   }
    // ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}, productConfig, false);

var devOptions = {
  contentBase: resolveProductDistPath(),
  hot: true,
}
var server = new webpackDevServer(compiler, devOptions);

server.listen(8088, 'localhost', () => {
  console.log('dev server listening at http://localhost:8088');
})
