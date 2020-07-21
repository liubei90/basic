<script>
import { createNamespacedHelpers } from 'vuex';
import { 
  Cell, 
  CellGroup,
  Button,
  Empty } from 'vant';
import { 
  storeName,
  FETCH_COURSE_DETAIL } from '@/models/course';

const { mapState, mapActions } = createNamespacedHelpers(storeName);

export default {
  props: {
    id: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      courseDetail: function(state) {
        if (state.courseDetailMap[this.id]) {
          return state.courseDetailMap[this.id];
        }
        return null;
      },
    }),
    
  },
  created() {
    if (this.id) {
      this[FETCH_COURSE_DETAIL]({ id: this.id }).then(() => {
        console.log(this.courseDetail);
      });
    }
  },
  methods: {
    ...mapActions([FETCH_COURSE_DETAIL]),
    renderDetailSkeleton(h) {
      return h('div', { class: [this.$style['coutse-detail-skeleton']] }, [
        this.renderCell(h, '考试题目', ' ', { class: [this.$style['coutse-detail-skeleton-item']] }),
        this.renderCell(h, '考试时长', ' ', { class: [this.$style['coutse-detail-skeleton-item']] }),
        this.renderCell(h, '考试内容', ' ', { class: [this.$style['coutse-detail-skeleton-item']] }),
      ]);
    },
    renderDetail(h) {
      if (this.courseDetail) {
        const cells = [];
        // 名称
        cells.push(this.renderCell(h, '考试题目', this.courseDetail['name']));
        // 时长
        cells.push(this.renderCell(h, '考试时长', this.courseDetail['duration']));
        // 详情
        cells.push(this.renderCell(h, '考试内容', this.courseDetail['detail']));

        return h(CellGroup, cells);
      }
      return this.renderDetailSkeleton(h);
    },
    renderCell(h, title, value, options = {}) {
      return h(Cell, { 
        props: { 
          title, 
          value,
          titleClass: [this.$style['coutse-detail-title']],
          valueClass: [this.$style['coutse-detail-value']] },
        ...options
      });
    },
    renderOpteration(h) {
      if (this.courseDetail) {
        return h('div', { class: [this.$style['course-opteration']] }, [
          h(Button, { 
            props: { type: 'primary' },
            class: [this.$style['course-opteration-btn']] }, ['开始答题'])
        ]);
      }
    }
  },
  render(h) {
    console.log('id', this.id);
    if (!this.id) {
      return h(Empty, { props: { description: 'id为空' } });
    }
    const detail = this.renderDetail(h);
    const opt = this.renderOpteration(h);
    return h('div', [
      h('div', { class: [this.$style['coutse-detail']] }, [detail]), 
      opt]);
  }
}
</script>


<style module>
.coutse-detail {
  width: 90%;
  margin: 20px auto 0;
  overflow: hidden;
  border-radius: 8px;
}
.coutse-detail-title {
  flex: 0;
  flex-basis: 90px;
}
.coutse-detail-value {
  text-align: left;
}
.coutse-detail-skeleton {
  /* composes: coutse-detail; */
}
.coutse-detail-skeleton-item {
  composes: skeleton--animate from '../../common.css';
}
.course-opteration {
  margin-top: 20px;
  text-align: center;
}
.course-opteration-btn {
  border-radius: 5px;
}
</style>