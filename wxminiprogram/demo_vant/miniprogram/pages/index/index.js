// index.js
var util = require('../../utils/util');

// 获取应用实例
const app = getApp()

Page({
  data: {
    msg: 'Hello World',
    statusBarHeight: app.globalData.statusBarHeight,
    citys: [
      { text: '全部', value: '' },
      { text: '郑州', value: '1' },
      { text: '信阳', value: '2' },
      { text: '新乡', value: '3' },
      { text: '平顶山', value: '4' }
    ],
    quanyi: [
      { text: '全部', value: '' },
      { text: '大服务体系', value: '1' },
      { text: '品牌联盟', value: '2' }
    ],
    types: [
      { text: '全部', value: '' },
      { text: '电影小镇', value: '1' },
      { text: '酒店', value: '2' },
      { text: '绿色基地', value: '3' },
      { text: '物业', value: '4' }
    ],
    cityValue: '',
    quanyiValue: '',
    typeValue: '',
    searchBKC: 0,
    searchHeight: 0,
    triggered: false,
    suggestionTop: 0,
    isFix: false,
    filterTop: 0,
    filterHeight: 0,
  },
  onLoad() {
    this.handleScroll = util.throttle((scrollTop) => {
      const nv = Math.min((scrollTop / (this.data.suggestionTop - this.data.searchHeight)), 1);

      this.setData({
        searchBKC: nv,
        isFix: (nv > 0.99) ? true : false,
        filterTop: (nv > 0.99) ? (scrollTop + this.data.searchHeight) : 0,
      });
    }, 0);
  },

  // 渲染完成
  onReady() {
    // 获取推荐列表位置
    const query = wx.createSelectorQuery();
    query.select('#search-section').boundingClientRect((res) => {
      this.data.searchHeight = res.height;
    });
    query.select('#suggestion-section').boundingClientRect((res) => {
      this.data.suggestionTop = res.top;
    });
    query.select('#suggestion_filter').boundingClientRect((res) => {
      this.setData({
        filterHeight: res.height,
      });
    });
    query.exec();
  },

  onPullDownRefresh() {

  },

  onPageScroll({ scrollTop }) {
    const nv = Math.min((scrollTop / (this.data.suggestionTop - this.data.searchHeight)), 1);

    this.setData({
      searchBKC: nv,
      isFix: (nv > 0.99) ? true : false,
      filterTop: (nv > 0.99) ? this.data.searchHeight : 0,
    });
  },

  handlePageScroll(event) {
    // this.handleScroll(event.detail.scrollTop);
    const scrollTop = event.detail.scrollTop;
    const nv = Math.min((scrollTop / (this.data.suggestionTop - this.data.searchHeight)), 1);

    this.setData({
      searchBKC: nv,
      isFix: (nv > 0.99) ? true : false,
      filterTop: (nv > 0.99) ? (scrollTop + this.data.searchHeight) : 0,
    });
  },

  handleRefresherRefresh(event) {
    console.log('handleRefresherRefresh', event);
    this.setData({
      triggered: true
    });
  },

  handleRefreshAbort() {
    console.log('handleRefresherRefresh');
    this.setData({
      triggered: false
    });;
  },

  handleDropdownOpen(event) {
    console.log(event);
    this.setData({
      scrollTop: this.data.suggestionTop,
    });
  }
})
