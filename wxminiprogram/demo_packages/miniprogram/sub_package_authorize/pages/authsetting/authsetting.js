Page({
  data: {
    motto: 'authsetting',
  },
  onLoad() {
  },
  onShow() {
    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        console.dir(res);
      },
      fail(err) {
        console.dir(err);
      }
    })
  },

  authorize(e) {
    wx.authorize({
      scope: e.currentTarget.dataset.scope,
      success(res) {
        console.dir(res);
      },
      fail(err) {
        console.error(err);
      }
    });
  },
  onGetUserInfo() {
    wx.getUserInfo({
      success(res) {
        console.dir(res);
      },
      fail(err) {
        console.error(err);
      },
    });
  },
  onGetLocation() {
    wx.getLocation({
      success(res) {
        console.dir(res);
      },
      fail(err) {
        console.error(err);
      },
    });
  },
  onChooseLocation() {
    wx.chooseLocation({
      success(res) {
        console.dir(res);
      },
      fail(err) {
        console.error(err);
      },
    });
  },
})
