<script>
  import { 
    Tag,
    RadioGroup,
    Radio, 
    Col, 
    Row } from 'vant';

  function renderDetail(h, props, $style) {
    const { questionDetail } = props;
    const title = h('div', [
      questionDetail['order'] + '、',
      questionDetail['title'],
      h(Tag, { 
        props: { type: 'primary' }, 
        class: [$style['single-choice-type']] }, [questionDetail['type']]),
    ]);

    return h('div', [
      title,
      h('div', { class: [$style['single-choice-detail']] }, [questionDetail['detail']]),
    ]);
  }

  function renderOptions(h, props, $style, listeners) {
    const { questionDetail, answer } = props;
    const options = questionDetail['options'];
    const optCols = options
      // sort会修改options，引起循环渲染，可以拷贝一个options再sort
      // .sort((a, b) => a['sort'] > b['sort'] ? 1 : -1)
      .map(item => {
        return h(Col, { 
          props: { span: 12 }, 
          class: [$style['single-choice-options-col']],
          on: {
            click: () => {
              if (listeners && listeners['change-answer']) {
                listeners['change-answer'](item['answer']);
              }
            }
          } }, 
        [
          h('span', { 
            class: [ answer === item['answer'] ? $style['single-choice-options-activate'] : ''] 
          }, [item['answer'] + ' ' + item['detail']]),
          // answer
        ]);
      });

    return h(Row, { class: [$style['single-choice-options']] }, optCols);
  }

  export default {
    functional: true,
    props: {
      questionDetail: {
        type: Object,
      },
      answer: {
        type: String,
        default: null,
      },
    },
    render(h, context) {
      const { props, $style, listeners } = context;
      const detail = renderDetail(h, props, $style);
      const options = renderOptions(h, props, $style, listeners);

      return h('div', { class: [$style['single-choice']] }, [detail, options]);
    },
  };
</script>

<style module>
.single-choice {
  composes: section-context from '../../../common.css';
}
.single-choice-type {
  margin-left: 5px;
}
.single-choice-detail {
  margin-top: 15px;
  text-indent: 2em;
}
.single-choice-options {
  margin-top: 15px;
}
.single-choice-options-col {
  padding: 5px;
}
.single-choice-options-activate {
  color: #1989fa;
}
</style>
