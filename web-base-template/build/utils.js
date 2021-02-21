var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var original = JSON.parse(process.env.npm_config_argv).original;
var args = require('minimist')(original.slice(2));
console.log(args);

var productName = args.product;
var page = args.page;

function getProductName() {
  return productName;
}

function getPageNames() {
  if (!page) {
    return [];
  }

  return Array.isArray(page) ? page : [page]
}

function resolveRootPath(...args) {
  return path.resolve(...args);
}

function resolveProductPath(...args) {
  return path.resolve(productName, ...args);
}

function resolveProductDistPath(...args) {
  return path.resolve('./dist', productName, ...args);
}

function getProductConfig() {
  var configPath = resolveProductPath('webpack.config.js');
  if (fs.existsSync(configPath)) {
    productConfig = require(configPath);
    pages = getPageNames();

    // TODO: pages为空的情况需要处理
    if (pages.length > 0) {
      // 过滤entry
      const newEntry = {};
      for (let i = 0; i < pages.length; i++) {
        if (productConfig['entry'][pages[i]]) {
          newEntry[pages[i]] = productConfig['entry'][pages[i]];
        }
      }
      productConfig['entry'] = newEntry;

      // 过滤plugins
      const plugins = productConfig['plugins'];

      productConfig['plugins'] = plugins.filter((item) => {
        if (item instanceof HtmlWebpackPlugin) {
          chunks = item['options']['chunks'];

          if (Array.isArray(chunks) && chunks.some((p) => pages.indexOf(p) > -1)) {
            return true
          }

          return false;
        }

        return true;
      });
    }

    return productConfig;
  }
}
module.exports = {
  getProductName,
  getPageNames,
  getProductConfig,
  resolveRootPath,
  resolveProductPath,
  resolveProductDistPath,
}