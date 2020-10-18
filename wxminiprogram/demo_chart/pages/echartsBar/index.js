import * as echarts from '../../libs/ec-canvas/echarts';

const app = getApp()

function sleep(d) {
  const start = new Date();
  while (true) {
    const end = new Date();
    if (end - start > d * 1000) {
      break;
    }
  }
}

const defaultOptions = {
  legend: {},
  tooltip: {},
  xAxis: {
    type: 'category',
    interval: 0,
  },
  yAxis: {},
  // dataZoom: [
  //   {
  //       type: 'slider',
  //       realtime: true,
  //       start: 0,
  //       end: 4
  //   }
  // ],
};

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
    ec: {},
    _chart: null,
  },
  methods: {
    _getOptions() {
      const chartDatas = this.data.chartDatas || [];
      const dimNames = this.data.dimNames || [];
      const indiNames = this.data.indiNames || [];

      const dataset = {
        dimensions: [...dimNames.slice(0, 1), ...indiNames.slice()],
        source: chartDatas
      }

      const series = indiNames.map(() => ({ type: 'bar' }));

      const options = Object.assign({}, defaultOptions, {
        dataset,
        series,
      });

      return options;
    },
    onChartInit(event) {
      const { canvas, width, height, dpr } = event.detail;
      let chart = this._chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      canvas.setChart(chart);
      chart.setOption(this._getOptions());
  
      return chart;
    },
    resetSeriesData() {
      if (this.data.chartDatas && this._chart) {
        this._chart.clear();
        this._chart.setOption(this._getOptions());
      };
    },
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
    },
    ready() {
      // 渲染完成
      console.log('ready');
      // sleep(2);
      // console.log('ready end');
      const ecCanvas = this.selectComponent('.ec-canvas-instance');
      // console.log('attached', ecCanvas);
      if (ecCanvas) {
        ecCanvas.init();
      }
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