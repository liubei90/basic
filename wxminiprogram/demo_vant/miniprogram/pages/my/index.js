// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    msg: 'Hello World',
    userinfo: null,
  },
  onLoad() {
    this.handleUserinfo();
  },

  handleUserinfo() {
    this.setData({
      userinfo: app.globalData.userInfo,
    });
  },

  handleContact() {
    ;
  }
})
