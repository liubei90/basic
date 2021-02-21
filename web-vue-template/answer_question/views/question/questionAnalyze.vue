<script>
  import { Empty } from 'vant';

  export default {
    functional: true,
    props: {
      questionAnswer: {
        type: Object,
        default: null,
      },
    },
    render(h, context) {
      const { props, $style } = context;
      const { questionAnswer } = props;

      if (!questionAnswer) {
        return h(Empty, {
          props: { description: '答案加载中...' },
          class: [$style['question-analyze-skeleton']]
        });
      }

      return h('div', { class: [$style['question-analyze']], }, [questionAnswer['answer_analyze']]);
    },
  };
</script>

<style module>
.question-analyze-skeleton {
  composes: skeleton--animate from '../../common.css';
}
.question-analyze {
  composes: section-context from '../../common.css';
  text-indent: 2em;
  line-height: 1.7em;
}
</style>