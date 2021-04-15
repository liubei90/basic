/*
 * @Author: liubei
 * @Date: 2021-04-15 14:06:40
 * @LastEditTime: 2021-04-15 15:52:53
 * @Description: 
 */
const util = require('../../utils/util.js');
// 获取应用实例
const app = getApp()
const data = require('./mp-html-data.js');

Page({
  data: {
    html: '',
  },
  onLoad() {
    this.setData({
      // html: '<div>Hello World!</div>'
    })
  },
  onShow() {
    setTimeout(() => {
      this.setData({
        html: data.htmlstr3.replace('display: inline-block;', '')
      });
    }, 1000);
  },

})
