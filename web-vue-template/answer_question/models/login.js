export const storeName = 'login';
export const FETCH_USER_DETAIL = 'FETCH_USER_DETAIL';
export const FETCH_USER_IS_EXISTS = 'FETCH_USER_IS_EXISTS';
export const DO_LOGIN = 'DO_LOGIN';
export const DO_REGIST = 'DO_REGIST';

export function isLogin() {
  const token = getAccessToken();
  return token !== null && token !== 'null' && token !== undefined && token !== 'undefined';
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

function storeAccessToken(token) {
  if (token) {
    localStorage.setItem('access_token', token);
  } else {
    localStorage.removeItem('access_token');
  }
}

export const store = {
  state: {
    userInfo: null,
    access_token: getAccessToken(),
  },
  mutations: {
    [FETCH_USER_DETAIL](state, data) {
      state.userInfo = data;
    },
    [DO_LOGIN](state, data) {
      state.access_token = data;
      storeAccessToken(data);
    },
  },
  actions: {
    [FETCH_USER_DETAIL]({commit, state}, params) {
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          const data = { name: 'liu', avatar: 'https://tse1-mm.cn.bing.net/th?id=OIP.mnD-3m6HyLjvzRvICjgsiwAAAA&w=145&h=160&c=8&rs=1&qlt=90&pid=3.1&rm=2', };
          commit(FETCH_USER_DETAIL, data);
          resolve(data);
        }, 2000);
      });
    },
    [FETCH_USER_IS_EXISTS]({commit, state}, params) {
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          const data = Math.random() > 0.5 ? true : false;
          resolve(data);
        }, 2000);
      });
    },
    [DO_LOGIN]({commit, state}, params) {
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          const data = 'token_1234567890';
          commit(DO_LOGIN, data);
          resolve(data);
        }, 2000);
      });
    },
    [DO_REGIST]({commit, state}, params) {
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          const data = true;
          resolve(data);
        }, 2000);
      });
    },
  },
};