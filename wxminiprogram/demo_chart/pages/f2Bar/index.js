// const F2 = require('@antv/f2/index')['F2'];
// const ScrollBar = require('@antv/f2/index')['F2'];
// const Pan = require('@antv/f2');

// F2.Chart.plugins.register(ScrollBar);

Component({
  properties: {
    dimNames: {
      type: Array,
      value: null,
    },
    indiNames: {
      type: Array,
      value: null,
    },
    chartDatas: {
      type: Array,
      value: null
    }
  },
  data: {
    _chart: null,
    onInitChart(F2, config) {

      const chart = new F2.Chart({ 
        ...config, 
        // plugins: ScrollBar,
      });
      return chart;
    },
  },
  methods: {
    resetSeriesData() {
      console.log('resetSeriesData');
      const f2ChartInstance = this.selectComponent('.f2-chart');
      const chartDatas = this.data.chartDatas || [];

      if (f2ChartInstance && chartDatas.length) {
        const chart = this.data._chart = f2ChartInstance.chart;
        const data = this.processData();

        const options = {
          x: {
            tickCount: 50
          }
        };
        chart.source(data, options);
        chart.interval().position('x*y').color('z').adjust({
          type: 'dodge',
          marginRatio: 0.05 // 设置分组间柱子的间距
        });
        chart.interaction('pan');
        // chart.scrollBar({
        //   mode: 'x',
        //   xStyle: {
        //     offsetY: -5
        //   }
        // });
        chart.render();
      }
    },
    processData() {
      const chartDatas = this.data.chartDatas || [];
      const dimNames = this.data.dimNames || [];
      const indiNames = this.data.indiNames || [];
      const res = [];

      if (chartDatas.length) {
        const x = dimNames[0];

        for (var r = 0; r < chartDatas.length; r++) {
          const row = chartDatas[r];

          for (var i = 0; i < indiNames.length; i++) {
            const indiName = indiNames[i];
            res.push({
              'x': row[x], // 维度数据
              'y': row[indiName], // 指标
              'z': indiName, // 图例
            })
          };
        }
      }

      return res;
    }
  },
  lifetimes: {
    created() {
      // 页面白屏
      console.log('created');
      // sleep(2);
      // // 页面白屏
      // console.log('created end');
      // const ecCanvas = this.selectComponent('.ec-canvas-instance');
      // console.log('created', ecCanvas);
    },
    attached() {
      // 页面白屏
      console.log('attached');
      // sleep(2);
      // // 页面白屏，
      // // 函数返回后渲染完成
      // console.log('attached end');
      // const ecCanvas = this.selectComponent('.ec-canvas-instance');
      // // console.log('attached', ecCanvas);
      // if (ecCanvas) {
      //   ecCanvas.init();
      // }
    },
    ready() {
      // 渲染完成
      console.log('ready');
      // sleep(2);
      // console.log('ready end');
    },
    moved() {
      console.log('moved');
      // sleep(2);
      // console.log('moved end');
    },
    detached() {
      console.log('detached');
      // sleep(2);
      // console.log('detached end');
    },
  },
  pageLifetimes: {

  },
});