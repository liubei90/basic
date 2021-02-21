<template>
  <div :class="$style['regist']">
    <div :class="$style['login-title']">注册</div>
    <div :class="$style['login-user_name']">
      <input type="text" 
        placeholder="用户名"
        v-model="userName">
    </div>
    <div :class="$style['login-user_name']">
      <input type="text" 
        autocomplete="off"
        placeholder="昵称"
        v-model="nickName">
    </div>
    <div :class="$style['login-passwd']">
      <input type="password"
        autocomplete="new-password"
        placeholder="密码"
        v-model="passwd">
    </div>
    <div :class="$style['login-passwd']">
      <input type="password"
        autocomplete="new-password"
        placeholder="重复密码"
        v-model="passwdAgain">
    </div>
    <div :class="$style['login-verification-code']">
      <input type="text"
        placeholder="验证码"
        v-model="verificationCode"><div class="common-verification-code" 
          @click="refreshCode"><div>{{ originVerificationCode }}</div></div>
    </div>
    <div :class="$style['login-login_btn']">
      <span v-if="tipstr">*{{ tipstr }}</span>
      <button class="common-button" 
        @click="handleRegist">注册</button>
    </div>
    <button :class="$style['login-cancel']" 
      class="common-button common-button_icon"
      @click="handleClose"></button>
  </div>
</template>

<script>
import { randomString } from '@/utils';
import { doRegist } from '@/models/regist';

export default {
  props: {
  },
  data() {
    return {
      userName: '',
      nickName: '',
      passwd: '',
      passwdAgain: '',
      verificationCode: '',
      originVerificationCode: '',
      tipstr: '',
    }
  },
  created() {
    this.refreshCode();
  },
  methods: {
    handleClose() {
      this.$emit('cancel');
    },
    async handleRegist() {
      this.tipstr = '';
      const account = this.userName.trim();
      const name = this.nickName.trim();
      const password = this.passwd.trim();
      const passwdAgain = this.passwdAgain.trim();

      if (!account) {
        this.tipstr = '用户名不能为空';
        return;
      }

      if (!name) {
        this.tipstr = '昵称不能为空';
        return;
      }

      if (!password) {
        this.tipstr = '密码不能为空';
        return;
      }

      if (passwdAgain !== password) {
        this.tipstr = '重复密码输入不一致';
        return;
      }

      if (!this.verificationCode) {
        this.tipstr = '验证码不能为空';
        return;
      }

      if (this.verificationCode.toLowerCase() !== this.originVerificationCode.toLowerCase()) {
        this.tipstr = '验证码错误';
        return;
      }

      const res = await doRegist({ account, password, name });
      console.log(res);

      if (res) {
        this.$emit('registSuccess', { account, password, name });
      }
    },
    refreshCode() {
      this.originVerificationCode = randomString();
    }
  }
}
</script>

<style module>
  .regist {
    background-color: rgb(56, 56, 56);
    position: relative;
    padding: 20px 0 50px;
  }
  .login-title,
  .login-user_name,
  .login-passwd,
  .login-verification-code,
  .login-login_btn {
    padding: 0 145px;
    margin-top: 20px;
  }

  .login-title {
    font-size: 22px;
    text-align: center;
    margin-top: 20px;
  }
  .login-user_name {

  }
  .login-passwd {

  }
  .login-passwd input,
  .login-user_name input,
  .login-verification-code input,
  .login-login_btn button {
    width: 300px;
    height: 54px;
    font-size: 18px;
  }
  .login-passwd input,
  .login-user_name input,
  .login-verification-code input {
    padding: 7px;
  }
  .login-verification-code {

  }
  .login-verification-code input {
    width: 190px;
  }
  .login-verification-code > div {
    width: 90px;
    height: 54px;
    float: right;
    padding-top: 15px;
    text-align: center;
    font-size: 20px;
  }
  .login-login_btn {

  }
  .login-login_btn span {
    color: #ff0000;
    font-size: 12px;
    margin-bottom: 5px;
    display: inline-block;
  }
  .login-login_btn button {
    background-color: #ff0000;
    border-radius: 0;
  }
  .login-cancel {
    position: absolute;
    right: -22px;
    top: -22px;
    padding: 0;
  }
  .login-cancel::before {
    width: 44px;
    height: 44px;
    background: url("../images/cha.png") 100%/cover no-repeat;
    margin: 0;
  }
  .login-cancel::after {
    border-radius: 50%;
  }
</style>
