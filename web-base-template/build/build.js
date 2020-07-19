var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var doWebpack = require('./webpack').doWebpack;
var { 
  getProductName, 
  getProductConfig,
  resolveRootPath,
  resolveProductPath,
  resolveProductDistPath } = require('./utils');
var base = require('./config.base');
var productConfig = getProductConfig();
var productName = getProductName();


doWebpack(base, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    })
  ],
}, productConfig);

