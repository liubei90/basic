// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
  },
  onLoad(options) {
    console.log('Page index onLoad', options)
  },
  onShow(options) {
    console.log('Page index onShow', options)
  },
  onReady(options) {
    console.log('Page index onReady', options)
  },
  onHide(options) {
    console.log('Page index onHide', options)
  },
  onUnload(options) {
    console.log('Page index onUnload', options)
  },
  onPullDownRefresh(options) {
    console.log('Page index onPullDownRefresh', options)
  },
  onReachBottom(options) {
    console.log('Page index onReachBottom', options)
  },
  onShareAppMessage(options) {
    console.log('Page index onShareAppMessage', options)
  },
  onShareTimeline(options) {
    console.log('Page index onShareTimeline', options)
  },
  onAddToFavorites(options) {
    console.log('Page index onAddToFavorites', options)
  },
  onPageScroll(options) {
    console.log('Page index onPageScroll', options)
  },
  onResize(options) {
    console.log('Page index onResize', options)
  },
  onTabItemTap(options) {
    console.log('Page index onTabItemTap', options)
  },

  handleLogin() {
    console.log('handleLogin', app.globalUserinfo);
  },

  redirect() {
    wx.redirectTo({
      url: '../empty/index',
      success: () => {
        console.log('redirectTo empty');
      },
      fail: (err) => {
        console.error(err);
      }
    });
  }
})
