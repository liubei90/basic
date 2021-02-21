<template>
  <div class="common-main">
    <Header class="common-header"></Header>
    <div class="common-body" :class="$style['main']">
      <div :class="$style['left_menu']">
        <ul class="common-vertical_menu">
          <li v-for="item in menus" 
            :class="item === activeItem ? 'active' : ''"
            :key="item"
            @click="handleChangeMenu(item)">{{ item }}</li>
        </ul>
      </div>
      <div :class="$style['right_content']">
        <div v-for="item in mingshiList" :class="$style['mingshi_item']">
          <div :class="$style['mingshi_avatar']">
            <img :src="item['avatar']" alt="">
            <div>{{item['name']}}</div>
          </div>
          <div :class="$style['mingshi_content']">
            <div :class="$style['mingshi_content_title']">{{item['title']}}</div>
            <div>{{item['content']}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/header';
  import MingshiAvatar from '@/images/default_avatar.jpg';
  import { getPageParamsInSearch, getImageUrl } from '@/utils';
  import { getLecturerList, getCourseList } from '@/models/lecturer';

  export default {
    components: {
      Header,
    },
    data() {
      const searchParams = getPageParamsInSearch();

      return {
        userId: searchParams['userId'],
        menus: ['名师风采', '课程安排'],
        activeItem: '名师风采',
        mingshiList: [
          // {
          //   'name': 'Henry Liang',
          //   'avatar': MingshiAvatar,
          //   'title': '教师自我介绍内容教师自我介绍内容教师自我介绍内容',
          //   'content': '经济学硕士、航海专业学士、CFA三级候选人、FRM、CATTI持证人、锦衣FIRE背词法创始人、中国翻译家协会成员。学术功底扎实，具有强烈的个人魅力和远见卓识。上课深入浅出，善于将书面理论结合实际操作，温文尔雅的授课形式如行云流水般流畅，深受学员的爱戴。',
          // },
        ]
      };
    },
    created() {
      this.getLecturerList();
    },
    mounted() {
      ;
    },
    methods: {
      handleChangeMenu(item) {
        this.activeItem = item;
      },
      async getLecturerList() {
        const res = await getLecturerList({ userId: this.userId });

        if (Array.isArray(res)) {
          res.forEach((item) => {
            this.mingshiList.push({
              name: item['name'],
              avatar: (item['avatar'] && getImageUrl(item['avatar'])) || MingshiAvatar,
              title: '',
              content: item['introduce'],
            });
          })
        }
      }
    }
  }
</script>

<style module>
.main {
  display: flex;
  padding: 30px 30px 30px 120px;
  color: #ffffff;
  /* overflow: hidden; */
}

.left_menu {
  flex: 0 0 230px;
  margin-right: 30px;
}

.right_content {
  flex: 1;
  overflow-y: auto;
}

.mingshi_item {
  border-bottom: 1px dashed rgb(121, 154, 191);
  display: flex;
  padding: 0 20px 20px 20px;
  align-items: flex-start;
  max-width: 780px;
  margin-bottom: 20px;
}

.mingshi_item:nth-child(even) .mingshi_avatar {
  order: 1;
}

.mingshi_avatar {
  padding: 10px;
  width: 180px;
  flex: 0 0 180px;
  margin-right: 20px;
  background-color: rgb(0, 216, 255);
  text-align: center;
  font-size: 20px;
  color: rgb(7, 25, 45);
}

.mingshi_avatar img {
  display: block;
  width: 130px;
  height: 150px;
  margin: 0 auto;
}

.mingshi_content {
  line-height: 2em;
}

.mingshi_content_title {
  text-indent: 2em;
}

</style>