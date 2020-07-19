<script>
  import { mapActions, mapState } from 'vuex';
  import { COMMON_FETCH_USER_INFO } from '@/models/index'
  import { Tabbar, TabbarItem } from 'vant';

  export default {
    data() {
      return {
        active: '/home',
        tabs: [
          { title: '主页', 'icon': 'home-o', 'path': '/home' },
          { title: '我的', 'icon': 'user-circle-o', 'path': '/user-center' }
        ]
      }
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo,
      }),
    },
    methods: {
      ...mapActions([COMMON_FETCH_USER_INFO]),
      changeActive(v) {
        this.active = v;
        this.$router.replace(v);
      }
    },
    created() {
      this[COMMON_FETCH_USER_INFO]();
    },
    render(h) {
      const routerView = h('router-view');
      const tabItems = this.tabs.map(item => {
        return h(TabbarItem, {
          props: {
            name: item['path'],
            icon: item['icon'],
          }
        }, [ item['title' ]]);
      })
      const tab = h(Tabbar, {
        props: {
          value: this.active,
        },
        on: {
          change: (v) => this.changeActive(v),
        }
      }, [ tabItems ]);
      return h('div', {
        class: ['main'],
      }, [routerView, tab]);
    }
  }
</script>

<style>
  :global(.main) {
    padding-bottom: 70px;
    height: 100%;
    background-color: #f2f3f5;
    overflow-y: auto;
  }
</style>