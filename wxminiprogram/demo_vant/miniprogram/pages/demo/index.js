// index.js

const util = require('../../utils/util.js');
// 获取应用实例
const app = getApp()

Page({
  data: {
    subscribe_result: '',
    send_subscribe_result: '',
  },
  onLoad() {
  },

  handleSubscribe() {
    wx.requestSubscribeMessage({
      tmplIds: ['PAboCNd3LLUGIPKqZC_zNipWZRXTKK_VhWSWOF5ceMc'],
      success: ({ errMsg }) => {
        if (errMsg === 'requestSubscribeMessage:ok') {
          this.setData({
            subscribe_result: '订阅成功',
          });
        } else {
          this.setData({
            subscribe_result: '订阅失败' + errMsg,
          });
        };
      },
      fail: ({ errMsg }) => {
        this.setData({
          subscribe_result: '订阅失败' + errMsg,
        });;
      },
    });
  },

  handleSendSubscribe() {
    let openid = app.globalData.openid;

    if (!openid) return;

    wx.request({
      url: util.baseDomain + '/demo/send_subscribe?openid=' + openid,
      success: (res) => {
        this.setData({
          subscribe_result: '已经消费',
          send_subscribe_result: '发送成功',
        });
      },
      fail: () => {
        this.setData({
          subscribe_result: '已经消费',
          send_subscribe_result: '发送失败',
        });
      },
    });
  },

})
