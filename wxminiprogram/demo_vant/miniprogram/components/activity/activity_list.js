var model = require('./activity_model');

Component({
  properties: {
    
  },

  data: {
    itemList: [],
    isloading: false,
    isempty: false,
    iserror: false,
  },

  lifetimes: {
    // 不能在created中使用setData, 不生效
    attached: function() {
      this.setData({
        isloading: true
      });
      model.getActivityList().then((res) => {
        let isempty = false;

        if (res.length) {
          isempty = true;
        }
        
        this.setData({
          itemList: res,
          isloading: false,
          isempty,
        });
      }).catch(() => {
        this.setData({
          isloading: false,
          iserror: true,
        });
      });
    },
    // attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  methods: {

  },

});