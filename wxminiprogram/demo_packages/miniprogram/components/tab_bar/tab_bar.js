// 

Component({
  properties: {
    defaultActive: {
      type: String,
    } 
  },
  data: {
    active: "",
  },
  lifetimes: {
    attached() {
      console.log(this.data.defaultActive);
      this.setData({
        active: this.data.defaultActive,
      });
    },
  },
  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      wx.redirectTo({
        url: event.detail,
      });
    },
  },
});
