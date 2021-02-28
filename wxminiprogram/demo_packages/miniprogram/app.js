// app.js
App({
  onLaunch(options) {
    console.log('App onLaunch', options);
  },
  onShow(options) {
    console.log('App onShow', options);
  },
  onHide(options) {
    console.log('App onHide', options);
  },
  onError(err) {
    console.log('App onError', err);
  },
  onPageNotFound(options) {
    console.log('App onPageNotFound', options);
  },
  onUnhandledRejection(options) {
    console.log('App onUnhandledRejection', options);
  },
  onThemeChange(options) {
    console.log('App onThemeChange', options);
  },
})
