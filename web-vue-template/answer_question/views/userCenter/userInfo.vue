<script>
  import { Image as VanImage } from 'vant';
  import { Cell } from 'vant';
  import avatar from '../../images/th.jpg';

  export default {
    functional: true,
    props: {
      userInfo: {
        type: Object,
      },
      isLogin: {
        type: Boolean,
        default: false,
      },
    },
    render(h, context) {
      const { props, $style, listeners } = context;
      const { userInfo, isLogin } = props;

      const userName = isLogin ?
        h('div', {
          class: [$style['user-info_name']],
          props: {},
        }, [ h('div', {}, ['刘贝']), ]) : // FIXME: 替换为用户名
        h('div', {
          on: {
            click: () => {
              if (listeners && listeners['login']) {
                listeners['login']();
              }
            }
          }
        }, ['登录/注册']);

      const profile = h('div', {
        class: [$style['user-info_content']],
      }, [
        // 头像
        h('div', { class: [$style['user-info_avatar']], }, [
          h(VanImage, {
            props: {
              fit: 'cover',
              round: true,
              width: '60px',
              height: '60px',
              src: isLogin ? avatar : null, // FIXME: 替换为头像url
            }
          }),
        ]),
        // 用户名称
        userName,
      ]);

      const ext = h(Cell, { 
        class: [$style['user-info_ext'], isLogin ? $style['user-info_login-ext'] : ''],
        props: { 
          title: ' ',
          value: '详细资料',
          isLink: true, 
          clickable: false,
        },
        on: {
          click: () => {
            if (isLogin && listeners && listeners['userDetail']) {
              listeners['userDetail']();
            }
          }
        }
      });

      return h('div', { class: [$style['user-info']] }, [
        profile,
        ext,
      ]);
    }
  }
</script>

<style module>
  .user-info {
    padding-top: 20px;
    background-color: #1989fa;
    color: #ffffff;
  }

  .user-info_content {
    display: flex;
    align-items: center;
  }
  .user-info_avatar {
    flex: 0 0 70px;
    text-align: center;
    padding: 10px 20px;
  }
  .user-info_name {
    flex: 1;
  }

  .user-info_ext,
  .user-info_ext:global(.van-cell--clickable):active {
    background-color: transparent;
  }
  .user-info_login-ext :global(.van-cell__value),
  .user-info_login-ext :global(.van-icon) {
    color: #ffffff;
  }
</style>
