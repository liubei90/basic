Page({
  data: {
    motto: 'authsetting',
    imgsrc: '',
  },
  onLoad() {
  },
  onShow() {
    this.consoleSetting();
  },

  authFuncCallback() {
    return {
      success(res) {
        console.dir(res);
      },
      fail(err) {
        console.error(err);
      },
      complete: () => {
        this.consoleSetting();
      }
    }
  },
  consoleSetting() {
    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        console.dir(res);
      },
      fail(err) {
        console.dir(err);
      }
    });
  },
  openSetting() {
    wx.openSetting({
      withSubscriptions: true,
      success(res) {
        console.dir(res);
      },
      fail(err) {
        console.dir(err);
      }
    });
  },
  doAuth(scope, authFun) {
    wx.getSetting({
      withSubscriptions: true,
      success: (res) => {
        console.dir(res);
        // 未进行过授权
        if (res.authSetting[scope] === undefined) {
          authFun();
        } 
        // 进行授权时被拒绝
        else if (res.authSetting[scope] === false) {
          this.openSetting();
          // wx.openSetting({
          //   withSubscriptions: true,
          //   success: (res) => {
          //     console.dir(res);
          //     wx.getSetting({
          //       withSubscriptions: true,
          //       success: (res_2) => {
          //         // 设置面板授权失败， 提示授权失败
          //         if (res_2.authSetting[scope] === false) {
          //           ;
          //         } 
          //         // 授权成功
          //         else {
          //           authFun();
          //         }
          //       },
          //       fail: (err) => {
          //         ;
          //       }
          //     })
          //   },
          //   fail: (err) => {
          //     // 打开设置面板失败，做授权失败提示
          //     console.dir(err);
          //   }
          // });
        } 
        // 授权成功
        else if (res.authSetting[scope] === true) {
          authFun();
        }
      },
      fail(err) {
        console.dir(err);
      }
    });
  },
  authorize(e) {
    wx.authorize({
      scope: e.currentTarget.dataset.scope,
      success(res) {
        console.dir(res);
      },
      fail(err) {
        console.error(err);
      },
      complete: () => {
        this.consoleSetting();
      }
    });
  },
  onGetUserInfoByOpenTypeBtn(e) {
    console.dir(e);
    this.consoleSetting();
  },
  onGetUserInfo() {
    wx.getUserInfo({
      success(res) {
        console.dir(res);
      },
      fail(err) {
        console.error(err);
      },
      complete: () => {
        this.consoleSetting();
      }
    });
  },
  onGetLocation() {
    this.doAuth('scope.userLocation', () => {
      wx.getLocation({
        success(res) {
          console.dir(res);
        },
        fail(err) {
          console.error(err);
        },
        complete: () => {
          this.consoleSetting();
        }
      });
    });
  },
  onChooseLocation() {
    wx.chooseLocation(this.authFuncCallback());
  },
  onStartLocationUpdate() {
    wx.startLocationUpdate(this.authFuncCallback());
  },
  onStartLocationUpdateBackground() {
    wx.startLocationUpdateBackground(this.authFuncCallback());
  },
  onGetWeRunData() {
    wx.getWeRunData(this.authFuncCallback());
  },
  onStartRecord() {
    let r = wx.getRecorderManager();
    r.start();
  },
  onSaveImageToPhotosAlbum() {
    wx.saveImageToPhotosAlbum(this.authFuncCallback());
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          imgsrc: res.tempImagePath
        })
      },
      fail(err) {
        console.error(err);
      }
    })
  },
  getPhoneNumber(res) {
    console.log(res);
  },
})
