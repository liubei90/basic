<script>
import { 
  Swipe, 
  SwipeItem, 
  NoticeBar,
  Col, 
  Row,
  Icon,
  Image as VanImage } from 'vant';
import { createNamespacedHelpers } from 'vuex';
import { 
  storeName,
  FETCH_BANNERS, 
  FETCH_RECOMMEND_TYPES,
  FETCH_RECOMMEND_COURSE } from '@/models/home';

const { mapState, mapActions } = createNamespacedHelpers(storeName);
import recommendCourseList from './recommendCourseList';

export default {
  data() {
    return {
      // banners: ,
    };
  },
  computed: {
    ...mapState({
      banners: state => state.banners,
      realRecommendTypes: state => state.recommendTypes,
      recommendCourse: state => state.recommendCourse,
    }),
    recommendTypes() {
      if (this.realRecommendTypes) {
        return [...this.realRecommendTypes, { title: '全部', 'src': 'apps-o' }]
      }
      return this.realRecommendTypes;
    },
  },
  methods: {
    ...mapActions([ FETCH_BANNERS, FETCH_RECOMMEND_TYPES, FETCH_RECOMMEND_COURSE ]),
    handleNav(v) {
      this.$router.push({
        name: 'coutse-detail',
        params: {
          id: '123',
        }
      });
    },
    renderBannerSkeleton(h) {
      return h('div', {
        class: [this.$style['banner-skeketon']]
      });
    },
    renderBanner(h) {
      return this.banners ? h(Swipe, {
        props: {
          autoplay: 3000,
        }
      }, this.banners.map(item => {
        return h(SwipeItem, {}, [h('img', {
          attrs: { src: item['src'] },
          class: [this.$style['banner-img']]
        })])
      })) : this.renderBannerSkeleton(h);
    },
    renderSysTips(h) {
      return h(NoticeBar, {
        props: {
          'left-icon': 'volume-o',
          'text': '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。',
        }
      });
    },
    renderRecommendTypesSkeketon(h) {
      return h(Row, { class: [this.$style['recommend-type']] }, ([1, 2, 3, 4]).map(_ => {
        return h(Col, { 
          props: { span: '6' },
          class: [this.$style['recommend-type-item']],
        }, 
        [
          h('div', { class: [this.$style['recommend-type-img-skeketon']] }), 
          h('span', { class: [this.$style['recommend-type-title-skeketon']] })
        ])
      }));
    },
    renderRecommendTypes(h) {
      return this.recommendTypes ? 
        h(Row, {
          class: [this.$style['recommend-type']]
        }, this.recommendTypes.map(item => {
          return h(Col, {
            class: [this.$style['recommend-type-item']],
            props: { span: '6' },
          }, this.renderRecommendType(h, item));
        })) : 
        this.renderRecommendTypesSkeketon(h);
    },
    renderRecommendType(h, item) {
      let img = null;
      if (item['title'] === '全部') {
        img = h('div', { 
          class: ['van-image', 'van-image--round'], 
          style: { width: '45px', height: '45px' }
        }, [h(Icon, { 
          props: { 
            name: item['src'],
            size: 30, 
          },
          style: { marginTop: '8px' }
        })]);
      } else {
        img = h(VanImage, {
            props: {
              round: true,
              width: 45,
              height: 45,
              src: item['src'],
            },
          });
      }
      return [img, h('div', {}, [item['title']])];
    },
    renderRecommendCourse(h) {
      console.log(this.recommendCourse);
      return h(recommendCourseList, {
        props: { courseList: this.recommendCourse },
        on: {
          nav: (v) => { 
            this.handleNav(v); 
          }
        }
      });
    },
  },
  created() {
    this[FETCH_BANNERS]();
    this[FETCH_RECOMMEND_TYPES]();
    this[FETCH_RECOMMEND_COURSE]();
  },
  render(h) {
    // 顶部banner
    const banner = this.renderBanner(h);
    // 系统消息
    const sysTips = this.renderSysTips(h);
    // 分类
    const recommendTypes = this.renderRecommendTypes(h);
    // 推荐课程
    const recommendCourse = this.renderRecommendCourse(h);


    return h('div', {}, [banner, sysTips, recommendTypes, recommendCourse]);
  }
}

</script>

<style module>
.banner-img {
  background-color: #ffffff;
  width: 100%;
  height: 200px;
}
.banner-skeketon {
  composes: banner-img;
  composes: skeleton--animate from '../../common.css';
}

.recommend-type {
  background-color: #ffffff;
  padding: 20px 0;
}

.recommend-type-item {
  text-align: center;
  /* color: aqua; */
}
.recommend-type-title-skeketon {
  display: inline-block;
  width: 45px;
  height: 14px;
  composes: skeleton--animate from '../../common.css';
}
.recommend-type-img-skeketon {
  width: 45px;
  height: 45px;
  margin: 0 auto 10px;
  border-radius: 50%;
  composes: skeleton--animate from '../../common.css';
}
</style>