var path = require('path');
var fs = require('fs');
var original = JSON.parse(process.env.npm_config_argv).original;
var productName = original.pop();


function getProductName() {
  return productName;
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
    return require(configPath);
  }
}
module.exports = {
  getProductName,
  getProductConfig,
  resolveRootPath,
  resolveProductPath,
  resolveProductDistPath,
}