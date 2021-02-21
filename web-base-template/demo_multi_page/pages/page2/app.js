import Vue from 'vue';
import '../../css/index.css';

import Main from './main';

var app = new Vue({
  render(h) {
    return h(Main)
  },
});

app.$mount('#app');