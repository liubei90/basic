Page({
  data: {

  },

  onShow() {
    // 调用失败，需要用户主动点击按钮触发。
    this.handleDoSth();
  },

  handleDoSth() {
    // do sth;
    wx.requestSubscribeMessage({
      tmplIds: [
        'FFE6dckXtbOlZyKzvVwQ62iD-5PqTaK_t5DvAQr2Z0E', 
        'PAboCNd3LLUGIPKqZC_zNipWZRXTKK_VhWSWOF5ceMc'
      ],
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {
        console.log(err);
      },
    });
  }
})