import Vue from 'vue';
import Vuex from 'vuex';
import { storeName as homeStoreName, store as homeStore } from './home';
import { storeName as courseStoreName, store as courseStore } from './course';
import { storeName as questionStoreName, store as questionStore } from './question';
import { storeName as loginStoreName, store as loginStore } from './login';


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [loginStoreName]: {
      namespaced: true,
      ...loginStore,
    },
    [homeStoreName]: {
      namespaced: true,
      ...homeStore,
    },
    [courseStoreName]: {
      namespaced: true,
      ...courseStore,
    },
    [questionStoreName]: {
      namespaced: true,
      ...questionStore,
    },
  },
});


export default store;