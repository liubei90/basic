var path = require('path');
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
    ]
  },
  plugins: [
  ],
}, productConfig);

