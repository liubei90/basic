var path = require('path');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // { 
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     hmr: process.env.NODE_ENV === 'development',
          //   }
          // },
          {
            loader: 'vue-style-loader',
          },
          { 
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          { 
            loader: 'css-loader',
          }
        ]
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
    new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].[hash].css',
    //   chunkFilename: '[id].[hash].css',
    // }),
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
