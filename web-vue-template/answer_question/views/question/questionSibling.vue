<script>
  import { Tag } from 'vant';


  export default {
    functional: true,
    props: {
      questionSibling: {
        type: Object,
        default: null
      },
    },
    render(h, context) {
      const { props, $style, listeners } = context;
      const questionSibling = props['questionSibling'];

      if (!questionSibling) {
        return null;
      }

      const preQuestion = questionSibling['pre_question'];
      const nextQuestion = questionSibling['next_question'];

      const pre = h('div', {
        class: [$style['question-sibling-item']],
        on: {
          click: () => {
            if (listeners && listeners['change-question']) {
              listeners['change-question'](preQuestion['id']);
            }
          }
        }
      }, [
        h(Tag, {
          props: { round: true, color: '#f0f2f5' },
          class: [$style['question-sibling-tag']],
        }, ['上一题']),
        h('span', [ preQuestion ? `${preQuestion['order']}、${preQuestion['title']}` : '无']),
      ]);

      const next = h('div', {
        class: [$style['question-sibling-item']],
        on: {
          click: () => {
            if (listeners && listeners['change-question']) {
              listeners['change-question'](nextQuestion['id']);
            }
          }
        }
      }, [
        h(Tag, {
          props: { round: true, color: '#f0f2f5' },
          class: [$style['question-sibling-tag']],
        }, ['下一题']),
        h('span', [ nextQuestion ? `${nextQuestion['order']}、${nextQuestion['title']}` : '无']),
      ]);

      return h('div', { class: [$style['question-sibling']] }, [pre, next]);
    }
  };
</script>

<style module>
.question-sibling {
  composes: section-context from '../../common.css';
  padding: 0 10px;
}
.question-sibling-item {
  margin: 10px 0;
}
.question-sibling-tag {
  color: #969696;
  margin-right: 10px;
  padding: 3px 8px;
}
</style>
