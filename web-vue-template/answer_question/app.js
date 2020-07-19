import Vue from 'vue';
import store from './models/index';
import router from './routes';
import App from './app.vue';
// import './common.css';


var app = new Vue({
  render(h) {
    return h(App)
  },
  store,
  router,
});

app.$mount('#app');