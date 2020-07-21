export const storeName = 'course';
export const FETCH_COURSE_DETAIL = 'FETCH_COURSE_DETAIL';

export const store = {
  state: {
    courseDetailMap: {}, // { id: detail }
  },
  mutations: {
    [FETCH_COURSE_DETAIL](state, { id, detail }) {
      state.courseDetailMap = { ...state.courseDetailMap, [id]: detail };
    },
  },
  actions: {
    [FETCH_COURSE_DETAIL]({ commit, state }, params) {
      return new Promise(function(resolve, reject) {
        const { id } = params;
        const detail = state.courseDetailMap[id];

        if (detail) {
          resolve(detail);
          return;
        }

        setTimeout(function() {
          const data = {
            id: '123',
            name: '小学一年级语文古诗词上',
            detail: '题目数量20，\n答题时长30m，\n题目范围。。。',
            image: '',
            duration: 20,
            questions: [
              { id: '123', title: '鹅鹅鹅', type: '单选', content: '' },
              { id: '456', title: '悯农', type: '单选', content: '' },
            ],
          };
          commit(FETCH_COURSE_DETAIL, { id, detail: data });
          resolve(data);
        }, 2000);
      });
    },
  },
}

