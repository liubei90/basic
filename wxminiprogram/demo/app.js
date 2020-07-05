//app.js
App({
  onLaunch: function () {
    let self = this;
    if (!self.isLogin()) {
      this.getLoginCode().then(function(code) {
        return self.login(code);
      }).then(function(res) {
        wx.setStorageSync('access_token', res.data.data.access_token)
      });
    }
    
    // this.preAuthorize();
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  },
  preAuthorize: function() {
    let self = this;
    // let scopes = ['scope.userInfo', 'scope.userLocation', 'scope.record'];
    Promise.resolve().then(function() {
      // scope.userInfo 只能通过<button open-type="getUserInfo"/>获取授权
      // return self.authScope('scope.userInfo');
      return true;
    }).then(function() {
      return self.authScope('scope.userLocation');
    }).then(function() {
      return self.authScope('scope.record');
    });
  },
  authScope: function(scope) {
    // let scope = 'scope.record';
    return new Promise(function(resolve, reject) {
      wx.getSetting({
        success: (result)=>{
          console.log(result.authSetting);
          if (!result.authSetting[scope]) {
            wx.authorize({
              scope: scope,
              success: (result)=>{
                wx.showToast({
                  title: '授权' + scope + '成功',
                  duration: 1500,
                });
                resolve();
              },
              fail: ()=>{
                wx.showToast({
                  title: '授权' + scope + '失败',
                  duration: 1500,
                  icon: 'none'
                });
                reject();
              },
            });
          }
        },
        fail: ()=>{
          wx.showToast({
            title: '获取用户设置失败',
            duration: 1500,
          });
          reject();
        }
      });
    })
  },
  isLogin: function() {
    // 检测是否缓存token
    let token = wx.getStorageSync('access_token');
    return !!token
  },
  login: function(code) {
    return new Promise(function(resolve, reject) {
      let request = wx.request({
        url: 'http://localhost:8001/auth/wx-login?code=' + code,
        method: 'GET',
        success: (result)=>{
          console.log(result);
          wx.showToast({
            title: '登录接口调用成功',
            duration: 1500,
          });
          resolve(result);
        },
        fail: ()=>{
          wx.showToast({
            title: '登录接口调用失败',
            duration: 1500,
          });
          reject();
        },
      });
    });
  },
  getLoginCode: function() {
    return new Promise(function(resolve, reject) {
      wx.login({
        success: (result)=>{
          console.log(result);
          wx.showToast({
            title: '获取code成功',
            duration: 1500,
          });
          resolve(result.code);
        },
        fail: ()=>{
          wx.showToast({
            title: '获取code失败',
            icon: 'none',
            duration: 1500,
          });
          reject();
        },
      });
    });
  },
})