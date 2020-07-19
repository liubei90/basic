import Vue from 'vue';
import Vuex from 'vuex';
import { storeName as homeStoreName, store as homeStore } from './home';

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
    }
  },
});


export default store;