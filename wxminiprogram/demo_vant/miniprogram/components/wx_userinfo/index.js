let app = getApp();

Component({
  options: {
    // styleIsolation: 'shared',
    // virtualHost: true
  },
  properties: {},
  data: {
    show: false,
  },
  created() {
    if (app.globalData.userInfo) return;

    wx.getSetting({
      success: (res) => {
        console.log(res, res.authSetting['scope.userInfo']);
        if (!res.authSetting['scope.userInfo']) {
          console.log('未授权scope.userInfo， 展示授权按钮');
          wx.hideTabBar();
          this.setData({
            show: true
          });
        } else {
          wx.getUserInfo({
            success: (res) => {
              this.handGetUserinfo({
                detail: res
              });
            }
          });
        }
      }
    });
  },
  attached() {
    ;
  },
  methods: {
    handGetUserinfo(event) {
      console.log(event);
      if (!event.detail.userInfo) return;

      this.setData({ show: false });
      app.globalData.userInfo = event.detail.userInfo;
      this.triggerEvent('userinfo');
      wx.showTabBar();
    },

    handError(err) {
      console.log(err);
    },

    handleLoginSuccess() {
      this.setData({
        show: false
      });
      this.triggerEvent('login');
    },

    doLogin() {
      // 1. 检测session是否存在;
      const session = this.getSession();
      // 2. session不存在，重新获取
      if (!session) {
        this.getSessionFromServer();
      }
      else {
        // 3. session存在，检测是否过期
        wx.checkSession({
          success: () => {
            // session有效，直接登录
            this.handleLoginSuccess();
          },
          fail: () => {
            // session过期，重新获取
            this.getSessionFromServer();
          }
        });
      }
    },

    getSession() {
      return wx.getStorageSync('sessionKey');
    },

    setSessionAndOpenid(session, openid) {
      wx.setStorageSync('sessionKey', session);
      wx.setStorageSync('openid', openid);
    },

    getSessionFromServer() {
      wx.login({
        success: (res) => {
          const code = res.code;
          // 模拟后端接口获取sessionKey
          setTimeout(() => {
            const openId = '123456';
            const sessionKey = '654321';

            this.setSessionAndOpenid(sessionKey, openId);
            this.handleLoginSuccess();
          }, 100);
        },
        fail: () => {},
      });
    },
  },
})