var path = require('path');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var {
  getProductName,
  resolveProductPath,
  resolveProductDistPath,
  resolveRootPath } = require('./utils');
var productName = getProductName();

module.exports = {
  output: {
    publicPath: './',
    path: resolveProductDistPath(),
  },
  resolve: {
    modules: [
      resolveRootPath('node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: './images',
              publicPath: './images/'
            }
          }
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     { loader: 'css-loader' }
      //   ]
      // },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns:[
    //     {
    //       context: resolveProductPath(),
    //       from: './statics',
    //       to: resolveProductDistPath('./statics'),
    //     },
    //   ] 
    // }),
  ],
}
