<script>
  import { Empty } from 'vant';
  import { 
    QUESTION_SINGLE_CHOICE,
    QUESTION_MULTIPLE_CHOICE } from '@/const';
  import SingleChoice from './types/singleChoice';
  import MultipleChoice from './types/multipleChoice';


  // function 

  export default {
    functional: true,
    props: {
      questionDetail: {
        type: Object,
        default: null,
      },
      answer: {
        type: [String, Number, Object, Array],
        default: null,
      },
    },
    render(h, context) {
      const { props, $style, listeners } = context;
      const { questionDetail, answer } = props;
      const type = questionDetail && questionDetail['type_num'];
      // const answer = questionDetail && questionDetail['answer'];

      if (!questionDetail) {
        return h(Empty, { 
          props: { description: '题目加载中...' },
          class: [$style['question-content-skeleton']]
        });
      }

      if (type === QUESTION_SINGLE_CHOICE) {
        return h(SingleChoice, { props: { questionDetail, answer }, on: listeners });
      } else if (type === QUESTION_MULTIPLE_CHOICE) {
        return h(MultipleChoice, { props: { questionDetail, answer }, on: listeners });
      }

      return h(Empty, { props: { image: 'error', description: '问题类型有误' } });
    },
  };
</script>

<style module>
.question-content-skeleton {
  composes: skeleton--animate from '../../common.css';
}
</style>
