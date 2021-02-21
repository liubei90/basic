<template>
  <div :class="$style['header']">
    <div :class="$style['left_panel']">
      <span :class="$style['header_title']">七鼎直播</span>
      <button :class="$style['bcdzm_btn']" class="common-button common-button_icon">保存到桌面</button>
      <!-- <a :href="'./page1.html?userId=' + userId" rel="noopener noreferrer"><button :class="$style['msfc_btn']" class="common-button common-button_icon">名师风采</button></a>
      <a :href="'./page3.html?userId=' + userId" rel="noopener noreferrer"><button :class="$style['kcap_btn']" class="common-button common-button_icon">课程安排</button></a> -->
      <button :class="$style['msfc_btn']" class="common-button common-button_icon">名师风采</button>
      <button :class="$style['kcap_btn']" class="common-button common-button_icon">课程安排</button>
    </div>
    <div :class="$style['right_panel']">
      <span :class="$style['user_name']" :title="userName">{{ userName }}</span>
      <button 
        v-if="!isLogin || isY"
        :class="$style['mfzc_btn']" 
        class="common-button"
        @click="registVisible = true">免费注册</button>
      <button 
        v-if="!isLogin || isY"
        :class="$style['dl_btn']" 
        class="common-button"
        @click="loginVisible = true">登录</button>
    </div>
    <FullMask :visible.sync="registVisible">
      <Regist slot="center"
        @cancel="registVisible = false"
        @registSuccess="handleRegistSuccess"></Regist>
    </FullMask>
    <FullMask :visible.sync="loginVisible">
      <Login slot="center"
        @cancel="loginVisible = false"
        @loginSuccess="handleLoginSuccess"></Login>
    </FullMask>
  </div>
</template>

<script>
  import { getPageParamsInSearch } from '@/utils';
  import { doLogin, getUserInfo, setUserInfo, delUserInfo, createYUser } from '@/models/login';
  import { doRegist } from '@/models/regist';
  import FullMask from '@/components/full_mask';
  import Login from '@/components/login';
  import Regist from '@/components/regist';

  export default {
    components: {
      FullMask,
      Login,
      Regist,
    },
    data() {
      const searchParams = getPageParamsInSearch();
      return {
        userId: searchParams['userId'],
        registVisible: false,
        loginVisible: false,
        userInfo: getUserInfo(),
      };
    },
    created() {
      this.autoRegist();
    },
    computed: {
      isLogin() {
        return !!this.userInfo;
      },
      isY() {
        return this.userInfo && this.userInfo['type'] === 'Y';
      },
      isZ() {
        return this.userInfo && this.userInfo['type'] === 'Z';
      },
      userName() {
        return this.userInfo && this.userInfo['name'];
      },
    },
    methods: {
      // 游客第一次访问，创建一个临时用户
      async autoRegist() {
        if (!this.isLogin) {
          const yUser = createYUser();
          console.log(yUser);
          let res = await doRegist(Object.assign({}, yUser, { userId: this.userId }));

          if (!res) {
            console.error('注册游客失败！');
            return;
          }

          res = await doLogin(yUser);

          if (!res) {
            console.error('游客登录失败！');
            return;
          }

          setUserInfo(res);
          this.userInfo = getUserInfo();
        }

        if (this.userInfo) {
          this.$emit('userInit');
        }
      },
      handleRegistSuccess(info) {
        this.registVisible = false;
        this.loginVisible = true;
      },
      handleLoginSuccess(info) {
        this.loginVisible = false;
        delUserInfo();
        setUserInfo(info);
        this.userInfo = getUserInfo();
        this.$emit('userInit');
      }
    }
  }
</script>

<style module>
.header {
  padding: 12px 12px 12px 12px;
  display: flex;
  color: #ffffff;
  font-size: 12px;
  border-bottom: 2px solid rgb(71, 132, 194);
}
.left_panel {
  flex: 1;
  vertical-align: middle;
}
.right_panel {
  flex: 0 0 300px;
  text-align: right;
}
.header_title {
  font-size: 30px;
  line-height: 1em;
  margin-right: 20px;
  vertical-align: sub;
}
.user_name {
  display: inline-block;
  width: 110px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.bcdzm_btn {
  background-color: rgba(222, 47, 112, 1);
}
.bcdzm_btn::before {
  background: url("../images/baocunzhuomian.png") no-repeat;
}

.msfc_btn {
  background-color: rgba(97, 183, 5, 1);
}

.msfc_btn::before {
  background: url("../images/mingshi.png") no-repeat;
}

.kcap_btn {
  background-color: rgba(1, 163, 156, 1);
}

.kcap_btn::before {
  background: url("../images/kecheng.png") no-repeat;
}

.jctx_btn {
  background-color: rgba(242, 61, 30, 1);
}

.jctx_btn::before {
  background: url("../images/Kxinjiancangku.png") no-repeat;
}

.mfzc_btn {
  font-size: 14px;
  margin-left: 10px;
  background: url("../images/regist.png") 100%/cover no-repeat;
}

.dl_btn {
  font-size: 14px;
  padding: 7px 26px;
  margin-left: 10px;
  background: url("../images/login.png") 100%/cover no-repeat;
}

</style>