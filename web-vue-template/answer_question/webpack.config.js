var HtmlWebpackPlugin = require('html-webpack-plugin');
var { resolveProductPath } = require('../build/utils');

module.exports = {
  entry: {
    app: resolveProductPath('app.js'),
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      '@': resolveProductPath(),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolveProductPath('./index.html'),
      filename: 'index.html',
    }),
  ]
}