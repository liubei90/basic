import Vue from 'vue';
import Vuex from 'vuex';
import { storeName as homeStoreName, store as homeStore } from './home';
import { storeName as courseStoreName, store as courseStore } from './course';
import { storeName as questionStoreName, store as questionStore } from './question';


Vue.use(Vuex);

export const COMMON_FETCH_USER_INFO = 'COMMON_FETCH_USER_INFO';

const store = new Vuex.Store({
  state: {
    userInfo: null,
  },
  mutations: {
    [COMMON_FETCH_USER_INFO](state, data) {
      state.userInfo = data || null;
    }
  },
  actions: {
    [COMMON_FETCH_USER_INFO]({ commit, state }) {
      setTimeout(function() {
        commit(COMMON_FETCH_USER_INFO, { name: 'liu' });
      }, 2000)
    }
  },
  modules: {
    [homeStoreName]: {
      namespaced: true,
      ...homeStore
    },
    [courseStoreName]: {
      namespaced: true,
      ...courseStore
    },
    [questionStoreName]: {
      namespaced: true,
      ...questionStore
    },
  },
});


export default store;