var HtmlWebpackPlugin = require('html-webpack-plugin');
var { resolveProductPath } = require('../build/utils');

module.exports = {
  entry: {
    page1: resolveProductPath('./pages/page1', 'app.js'),
    page2: resolveProductPath('./pages/page2', 'app.js'),
    page3: resolveProductPath('./pages/page3', 'app.js'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolveProductPath('./pages/page1', './index.html'),
      filename: 'page1.html',
      chunks: ['page1'],
    }),
    new HtmlWebpackPlugin({
      template: resolveProductPath('./pages/page2', './index.html'),
      filename: 'page2.html',
      chunks: ['page2'],
    }),
    new HtmlWebpackPlugin({
      template: resolveProductPath('./pages/page3', './index.html'),
      filename: 'page3.html',
      chunks: ['page3'],
    }),
  ],
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      '@': resolveProductPath(),
    }
  },
}
