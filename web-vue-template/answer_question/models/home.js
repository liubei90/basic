import img2 from '@/views/home/images/apple-2.jpg';
import img3 from '@/views/home/images/apple-3.jpg';

export const storeName = 'home';
export const FETCH_BANNERS = 'FETCH_BANNERS';
export const FETCH_RECOMMEND_TYPES = 'FETCH_RECOMMEND_TYPES';
export const FETCH_RECOMMEND_COURSE = 'FETCH_RECOMMEND_COURSE';


export const store = {
  state: {
    banners: null,
    recommendTypes: null,
    recommendCourse: null,
  },
  mutations: {
    [FETCH_BANNERS](state, data) {
      state.banners = data || null;
    },
    [FETCH_RECOMMEND_TYPES](state, data) {
      state.recommendTypes = data || null;
    },
    [FETCH_RECOMMEND_COURSE](state, data) {
      state.recommendCourse = data || null;
    }
  },
  actions: {
    [FETCH_BANNERS]({ commit, state }) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          const data = [
            { src: img2, path: null },
            { src: img3, path: null },
          ];
          commit(FETCH_BANNERS, data);
          resolve(data);
        }, 2000);
      });
    },
    [FETCH_RECOMMEND_TYPES]({ commit, state }) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          const data = [
            { title: '语文', src: 'https://img.yzcdn.cn/vant/cat.jpeg' },
            { title: '数学', src: 'https://img.yzcdn.cn/vant/cat.jpeg' },
            { title: '英语', src: 'https://img.yzcdn.cn/vant/cat.jpeg' },
          ];
          commit(FETCH_RECOMMEND_TYPES, data);
          resolve(data);
        }, 2000);
      });
    },
    [FETCH_RECOMMEND_COURSE]({ commit, state }) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          const data = [
            { src: 'https://img.yzcdn.cn/vant/cat.jpeg', title: '小学一年级古诗词2', detail: '古诗词第二节' },
            { src: 'https://img.yzcdn.cn/vant/cat.jpeg', title: '小学一年级古诗词3', detail: '古诗词第三节' },
            { src: 'https://img.yzcdn.cn/vant/cat.jpeg', title: '小学一年级古诗词4', detail: '古诗词第四节' },
          ];
          commit(FETCH_RECOMMEND_COURSE, data);
          resolve(data);
        }, 5000);
      });
    }
  }
}
