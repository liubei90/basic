// var detailData = require('../../mocks/GetDetailData1.json');
var detailData = require('./detailData')['detailData'];

const app = getApp()

Page({
  data: {
    _originDetailData: null,
    chartDatas: [],
    dims: [],
    indis: [],
  },
  onReady() {
    this.getDetailData().then((res) => {
      const data = res && res['data'];
      this.data._originDetailData = data;
      return this.processDetailData(data);
    }).then(() => {
      this.resetSeriesData();
    });
  },
  getDetailData() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(detailData);
      }, 200);
    });
  },
  processDetailData(data) {
    return new Promise((resolve, reject) => {
      const headerData = data['header_data'];
      const detailData = data['detail_data'];

      const chartDatas = [];
      for (let i = 0; i < detailData.length; i++) {
        const row = {};
        const rowItem = detailData[i];

        for (let j = 0; j < headerData.length; j++) {
          const headerItem = headerData[j];

          if (headerItem['id']) {
            row['isIndi'] = true;
          } else {
            row['isDim'] = true;
          }
          row[headerItem['name']] = rowItem[j];
        }

        chartDatas.push(row);
      }

      const dims = [];
      const indis = [];

      for (let i = 0; i < headerData.length; i++) {
        const headerItem = headerData[i];

        if (headerItem['id']) {
          indis.push(headerItem['name']);
        } else {
          dims.push(headerItem['name']);
        }
      }

      this.setData({
        chartDatas,
        dims,
        indis,
      }, () => {
        resolve();
      });
    });
  },
  resetSeriesData() {
    if (!this.data.chartDatas) {
      return;
    }

    const chartInstance = this.selectComponent('.echart_bar');

    if (chartInstance) {
      chartInstance.resetSeriesData();
    }

    const f2Instance = this.selectComponent('.f2_bar');
    
    if (f2Instance) {
      f2Instance.resetSeriesData();
    }
  },
});