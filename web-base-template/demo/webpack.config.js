var HtmlWebpackPlugin = require('html-webpack-plugin');
var { resolveProductPath } = require('../build/utils');

module.exports = {
  entry: {
    app: resolveProductPath('./js', 'app.js'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolveProductPath('./index.html'),
      filename: 'index.html',
    }),
  ]
}