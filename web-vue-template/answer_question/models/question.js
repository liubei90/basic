export const storeName = 'question';
export const FETCH_QUESTION_DETAIL = 'FETCH_QUESTION_DETAIL';
export const FETCH_QUESTION_SIBLING = 'FETCH_QUESTION_SIBLING';
export const FETCH_QUESTION_ANSWER = 'FETCH_QUESTION_ANSWER';
export const SET_ANSWER = 'SET_ANSWER';

export const store = {
  state: {
    questionDetailMap: {}, // { id: detail }
    questionSiblingMap: {}, // { id: detail }
    questionAnswerMap: {}, // { id: detail }
    answerMap: {}, // { id: answer }
  },
  mutations: {
    [FETCH_QUESTION_DETAIL](state, { id, detail }) {
      state.questionDetailMap = { ...state.questionDetailMap, [id]: detail };
    },
    [FETCH_QUESTION_SIBLING](state, { id, detail }) {
      state.questionSiblingMap = { ...state.questionSiblingMap, [id]: detail };
    },
    [FETCH_QUESTION_ANSWER](state, {  id, detail  }) {
      state.questionAnswerMap = { ...state.questionAnswerMap, [id]: detail };
    },
    [SET_ANSWER](state, { id, answer  }) {
      state.answerMap = { ...state.answerMap, [id]: answer };
    },
  },
  actions: {
    [FETCH_QUESTION_DETAIL]({ commit, state }, params) {
      return new Promise(function(resolve, reject) {
        const { id } = params;
        const detail = state.questionDetailMap[id];

        if (detail) {
          resolve(detail);
          return;
        }

        setTimeout(function() {
          const data = {
            id: '123',
            type: '单项选择题',
            type_num: 1,
            order: 1,
            title: '悯农',
            detail: '锄禾日当午，汗滴禾下土，_____，粒粒皆辛苦',
            answer: 'A',
            options: [
              { id: '123', 'sort': 1, 'answer': 'A', detail: '谁知盘中餐' },
              { id: '124', 'sort': 2, 'answer': 'B', detail: '感时花溅泪' },
              { id: '125', 'sort': 3, 'answer': 'C', detail: '烽火连三月' },
              { id: '126', 'sort': 4, 'answer': 'D', detail: '白日依山尽' },
            ],
          };
          commit(FETCH_QUESTION_DETAIL, { id, detail: data });
          resolve(data);
        }, 2000);
      });
    },
    [FETCH_QUESTION_SIBLING]({ commit, state }, params) {
      return new Promise(function(resolve, reject) {
        const { id } = params;
        const detail = state.questionSiblingMap[id];

        if (detail) {
          resolve(detail);
          return;
        }

        setTimeout(function() {
          const data = {
            id: '124',
            pre_question: {
              id: '123',
              title: '咏鹅',
              order: 2,
            },
            next_question: {
              id: '125',
              title: '静夜诗',
              order: 4,
            },
          };
          commit(FETCH_QUESTION_SIBLING, { id, detail: data });
          resolve(data);
        }, 2000);
      });
    },
    [FETCH_QUESTION_ANSWER]({ commit, state }, params) {
      return new Promise(function(resolve, reject) {
        const { id } = params;
        const detail = state.questionAnswerMap[id];

        if (detail) {
          resolve(detail);
          return;
        }

        setTimeout(function() {
          const data = {
            id: '123',
            answer_analyze: '作者李绅（772-846），字公垂，泣州无锡（今江苏无锡）人。唐代诗人。这首诗是写劳动的艰辛，劳动果实来之不易。第一、二句“锄禾日当午，汗滴禾下土”描绘出在烈日当空的正午，农民仍然在田里劳动，这两句诗选择特定的场景，形象生动地写出劳动的艰辛。有了这两句具体的描写，就使得第三、四句“谁知盘中餐，粒粒皆辛苦”的感叹和告诫免于空洞抽象的说教，而成为有血有肉、意蕴深远的格言。',
          };
          commit(FETCH_QUESTION_ANSWER, { id, detail: data });
          resolve(data);
        }, 2000);
      });
    },
    [SET_ANSWER]({ commit, state }, params) {
      commit(SET_ANSWER, params);
    },
  },
};