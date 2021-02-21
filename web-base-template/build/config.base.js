var path = require('path');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
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
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ],
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: 'vue-style-loader',
      //     },
      //     { 
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //       }
      //     }
      //   ]
      // },
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
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns:[
        {
          context: resolveProductPath(),
          from: './statics',
          to: resolveProductDistPath('./statics'),
        },
      ] 
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包业务中公共代码
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 2, // 同时引用了2次才打包
        },
        // 打包第三方库的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 10,
          minChunks: 2, // 同时引用了2次才打包
        }
      }
    },
    runtimeChunk: { name: 'manifest' } // 运行时代码
  }
}
