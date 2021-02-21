<script>
  import { 
    Loading, 
    Icon } from 'vant';
  import { createNamespacedHelpers } from 'vuex';
  import { 
    storeName as courseStoreName, 
    FETCH_COURSE_DETAIL } from '@/models/course';
  import {
    storeName as questionStoreName,
    FETCH_QUESTION_DETAIL,
    FETCH_QUESTION_SIBLING,
    FETCH_QUESTION_ANSWER,
    SET_ANSWER } from '@/models/question';
  import QuestionContent from './questionContent';
  import QuestionSibling from './questionSibling';
  import QuestionAnalyze from './questionAnalyze';

  const { mapState: mapCourseState, mapActions: mapCourseActions } = createNamespacedHelpers(courseStoreName);
  const { mapState: mapQuestionState, mapActions: mapQuestionActions } = createNamespacedHelpers(questionStoreName);

  export default {
    props: {
      courseId: {
        type: String,
        default: null
      },
      questionId: {
        type: String,
        default: null
      },
    },
    data() {
      return {
        show_answer_btn: true,
        show_answer: false,
        loading_answer: false,
      };
    },
    computed: {
      ...mapCourseState({
        courseDetail: function(state) {
          if (state.courseDetailMap[this.courseId]) {
            return state.courseDetailMap[this.courseId];
          }
          return null;
        },
      }),
      ...mapQuestionState({
        questionDetail: function(state) {
          if (state.questionDetailMap[this.questionId]) {
            return state.questionDetailMap[this.questionId];
          }
          return null;
        },
        questionSibling: function(state) {
          if (state.questionSiblingMap[this.questionId]) {
            return state.questionSiblingMap[this.questionId];
          }
          return null;
        },
        questionAnswer: function(state) {
          if (state.questionAnswerMap[this.questionId]) {
            return state.questionAnswerMap[this.questionId];
          }
          return null;
        },
        answer: function(state) {
          if (state.answerMap[this.questionId]) {
            return state.answerMap[this.questionId];
          }
          return null;
        },
      }),
    },
    watch: {
      courseId() {
        this.init();
      },
      questionId() {
        this.init();
      },
    },
    methods: {
      ...mapCourseActions([FETCH_COURSE_DETAIL]),
      ...mapQuestionActions([
        FETCH_QUESTION_DETAIL, 
        FETCH_QUESTION_SIBLING, 
        FETCH_QUESTION_ANSWER,
        SET_ANSWER]),
      init() {
        this.show_answer_btn = true;
        this.show_answer = false;
        this.loading_answer = false;
        this[FETCH_COURSE_DETAIL]({ id: this.courseId });
        this[FETCH_QUESTION_DETAIL]({ id: this.questionId });
        this[FETCH_QUESTION_SIBLING]({ id: this.questionId });
      },
      handleChangeAnswer(answer) {
        this[SET_ANSWER]({ id: this.questionId, answer });
      },
      handleChangeQuestion(questionId) {
        if (this.questionId === questionId) {
          return;
        }
        this.$router.replace({
          name: 'answer-question', 
          params: {
            courseId: this.courseId,
            questionId: questionId,
          }
        });
      },
      renderAnalyzeBtn(h) {
        if (!this.questionDetail || !this.show_answer_btn) {
          return;
        }

        return h('div', {
          class: [this.$style['answer-question-analyze-btn']],
          on: {
            click: () => {
              this.loading_answer = true;
              this[FETCH_QUESTION_ANSWER]({ id: this.questionId }).then(() => {
                this.loading_answer = false;
                this.show_answer_btn = false;
                this.show_answer = true;
              });
            }
          }
        }, 
        this.loading_answer ? 
          [h(Loading, { props: { type: 'spinner', size: '12px' } })] : 
          [h(Icon, { props: { name: 'search' } })]);
      }
    },
    created() {
      this.init();
    },
    render(h) {
      const analyzeBtn = this.renderAnalyzeBtn(h);

      return h('div', [
        h(QuestionContent, { 
          props: { 
            questionDetail: this.questionDetail,
            answer: this.answer }, 
          on: {
            'change-answer': (evt) => { 
              this.handleChangeAnswer(evt); 
            } }, 
        }),
        analyzeBtn,
        h(QuestionSibling, { 
          props: { questionSibling: this.questionSibling },
          on: {
            'change-question': (questionId) => {
              this.handleChangeQuestion(questionId);
            }
          } 
        }),
        this.show_answer ? 
          h(QuestionAnalyze, { props: { questionAnswer: this.questionAnswer } }) :
          null,
      ]);
    },
  };
</script>

<style module>
.answer-question {

}
.answer-question-analyze-btn {
  position: fixed;
  right: 30px;
  top: 30px;
}
</style>