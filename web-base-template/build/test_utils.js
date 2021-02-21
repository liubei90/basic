var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var {
  getProductName,
  getPageNames,
  getProductConfig,
  resolveRootPath,
  resolveProductPath,
  resolveProductDistPath
} = require('./utils');
var base = require('./config.base');
var mergeOptions = require('./webpack').mergeOptions;


function test1() {
  console.log(getProductName());

  console.log(getPageNames());

  console.log(getProductConfig());

  console.log(resolveRootPath());

  console.log(resolveProductPath());

  console.log(resolveProductDistPath());
}

function test2() {
  console.dir(mergeOptions([base, {
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
  }, getProductConfig()]), {depth: 10})
}

// test1();
test2();