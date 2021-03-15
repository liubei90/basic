// app.js

const util = require('./utils/util.js');

App({
  globalData: {
    isLogin: false,
    userInfo: null,
    session_key: null,
    openid: null,
    unionid: null,
    statusBarHeight: 36,
    systemInfo: null,
  },
  onLaunch() {
    this.login();
    this.getSystemInfo();
  },

  login() {
    const session_key = wx.getStorageSync('session_key');

    if (session_key) {
      wx.checkSession({
        success: () => {
          this.globalData.session_key = session_key;
          this.globalData.openid = wx.getStorageSync('openid');
          this.globalData.unionid = wx.getStorageSync('unionid');
        },
        fail: () => {
          this.getSessionKey();
        }
      });
    } else {
      this.getSessionKey();
    }
  },

  getSessionKey() {
    wx.login({
      success: ({ code }) => {
        wx.request({
          url: util.baseDomain + '/auth.code2Session?code=' + code,
          success: (res) => {
            console.log(res);
            if (res && res.statusCode === 200 && res.data && res.data.status) {
              this.setLoginStatus(res.data.data);
            } else {
              this.setLoginStatus();
            }
          },
          fail: () => { this.setLoginStatus(); },
        });
        ;
      },
      fail: () => {
        this.setLoginStatus();
      }
    });
  },

  setLoginStatus({ session_key = null, openid = null, unionid = null } = {}) {
    this.globalData.isLogin = session_key ? true : false;
    this.globalData.session_key = session_key;
    this.globalData.openid = openid;
    this.globalData.unionid = unionid;
    wx.setStorageSync('session_key', session_key);
    wx.setStorageSync('openid', openid);
    wx.setStorageSync('unionid', unionid);
  },

  getSystemInfo() {
    this.globalData.systemInfo = wx.getSystemInfoSync();
    this.globalData.statusBarHeight = this.globalData.systemInfo.statusBarHeight;
    console.log(this.globalData.systemInfo);
    console.log(this.globalData.statusBarHeight);
  },

})
