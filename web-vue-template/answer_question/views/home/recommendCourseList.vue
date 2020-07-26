<script>
  import { 
    Card,
    Skeleton } from 'vant';

  export default {
    functional: true,
    props: {
      courseList: {
        type: Array,
        default: null,
      },
    },
    render(h, context) {
      const { props, $style, listeners } = context;
      console.log(context);

      function renderSkeleton() {
        return [1, 2].map(_ => {
          return h(Skeleton, { 
            props: {
              title: true,
              avatar: true,
              row: 1
            },
            class: [$style['recommend-course-item-skeleton']] 
          });
        })
      }

      function renderItem(item) {
        return h(Card, {
          props: {
            num: null,
            desc: item['detail'],
            title: item['title'],
            thumb: item['src']
          },
          on: {
            click: () => {
              if (listeners && listeners['nav']) {
                listeners['nav'](item['id'])
              }
            }
          }
        });
      }

      let list = null;
      if (props['courseList']) {
        list = props['courseList'].map(item => {
          return renderItem(item);
        })
      } else {
        list = renderSkeleton();
      }
      return h('div', {
        class: [$style['recommend-course-list']]
      }, [list])
    }
  }
</script>

<style module>
  .recommend-course-list {
    background-color: #ffffff;
    margin-top: 20px;
  }

  .recommend-course-item-skeleton {
    padding-top: 10px;
    height: 88px;
  }
</style>