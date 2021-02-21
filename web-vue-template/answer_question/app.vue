<script>
  import { mapActions, mapState } from 'vuex';
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
        // userInfo: state => state.userInfo,
      }),
      showTab() {
        return !!this.$route.meta['showTab'];
      },
      activePath() {
        return this.$route['path'];
      },
    },
    watch: {
      activePath() {
        if (this.tabs.some(item => item['path'] === this.activePath)) {
          this.active = this.activePath;
        };
      },
    },
    created() {
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
        class: [this.$style['main'], this.showTab ? this.$style['main_fix-bottom'] : ''],
      }, [routerView, this.showTab ? tab : null]);
    },
    methods: {
      changeActive(v) {
        this.active = v;
        if (this.$route.path !== v) {
          this.$router.replace(v);
        }
      }
    },
  }
</script>

<style module>
  .main {
    height: 100%;
    background-color: #f2f3f5;
    overflow-y: auto;
  }
  .main_fix-bottom {
    padding-bottom: 70px;
  }
</style>