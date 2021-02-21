<script>
  import { 
    Cell, 
    CellGroup,
    Tag } from 'vant';
  import { createNamespacedHelpers } from 'vuex';
  import { 
    storeName,
    FETCH_USER_DETAIL, } from '@/models/login';
  import UserInfo from './userInfo';

  const { mapState, mapActions } = createNamespacedHelpers(storeName);

  export default {
    data() {
      return {
        featureList: [
          { title: '我的消息', value: '', icon: '', rightIcon: 'arrow', tag: null, to: 'my-messages', },
          { title: '考试记录', value: '', icon: '', rightIcon: '', tag: null, to: 'my-course-recodes', },
          { title: '错题', value: '', icon: '', rightIcon: '', tag: null, to: 'my-wrong-questions', },
          { title: '版本更新', value: '', icon: '', rightIcon: '', tag: 'v1.0.11', to: 'app-version', },
          { title: '设置', value: '', icon: '', rightIcon: '', tag: null, to: 'app-setting', },
          { title: '在线客服', value: '', icon: '', rightIcon: '', tag: null, to: 'app-customer', },
        ],
      };
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
        access_token: state => state.access_token,
      }),
      isLogin() {
        return !!this.access_token;
      },
    },
    created() {
      if (this.access_token && !this.userInfo) {
        this[FETCH_USER_DETAIL]();
      }
    },
    render(h) {
      const features = [];
      this.featureList.forEach(item => {
        features.push(this.renderFeature(h, item));
      });
      return h('div', [
          h(UserInfo, { 
            props: {
              userInfo: this.userInfo,
              isLogin: this.isLogin,
            },
            on: {
              login: this.handlerLogin,
              userDetail: this.handlerUserDetail
            }
          }),
          features.length ?
            h(CellGroup, { class: [this.$style['feature-group']] }, features) :
            null,
        ]);
    },
    methods: {
      ...mapActions([FETCH_USER_DETAIL]),
      renderFeature(h, item) {
        const slots = {};
        if (item['tag']) {
          slots['title'] = (props) => {
            return h('div', [
              h('span', [item['title']]),
              h(Tag, [item['tag']]),
            ]);
          };
        }

        return h(Cell, {
          props: {
            title: item['title'],
            value: item['value'],
            icon: item['icon'],
            rightIcon: item['rightIcon'],
            to: item['to'],
            isLink: true,
          },
          scopedSlots: slots,
        });
      },
      handlerLogin() {
        this.$router.replace({
          name: 'login',
        });
      },
      handlerUserDetail() {
        this.$router.push({
          name: 'user-detail',
        });
      }
    },
  }
</script>

<style module>
  .user-center {
    
  }

  .feature-group {
    margin-top: 20px;
    /* composes: section-context from '../../common.css'; */
  }
</style>
