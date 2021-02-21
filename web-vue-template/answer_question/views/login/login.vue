<script>
  import { 
    Icon,
    Button,
    Checkbox,
    Notify,
   } from 'vant';
  import { createNamespacedHelpers } from 'vuex';
  import { 
    storeName,
    FETCH_USER_IS_EXISTS,
    DO_LOGIN } from '@/models/login';
  const { mapState, mapActions } = createNamespacedHelpers(storeName);
  export default {
    data() {
      return {
        loginModel: 'password', // password phone wx
        checkProtocol: false,
        islogin: false,

        // password
        userName: null,
        password: null,
      };
    },
    computed: {
    },
    render(h) {
      return h('div', { class: [this.$style['login']] }, [
        // 标题
        this.renderTitle(h),
        // 输入区域
        this.renderLoginForm(h),
        // 服务协议
        this.renderServiceProtocol(h),
      ]);
    },
    methods: {
      ...mapActions([FETCH_USER_IS_EXISTS, DO_LOGIN]),
      renderTitle(h) {
        return h('h1', { class: [this.$style['login_title']] }, ['您好，欢迎使用在线问答']);
      },
      renderUserPasswordForm(h) {
        const userName = h('div', {
          class: [this.$style['login_user-name-container']],
        }, [
          h('input', {
            class: [this.$style['login_user-name']],
            attrs: {
              placeholder: '请输入用户名',
            },
            domProps: {
              value: this.userName,
            },
            on: {
              input: (env) => {
                this.userName = env.target.value;
              },
            },
          }),
          this.userName ? 
            h(Icon, { 
              class: [this.$style['login_user-name-clear-btn']],
              props: { name: 'close' },
              on: {
                click: this.handlerClearUserName
              } 
            }):
            null,
        ]);
        const password = h('div', [
        h('input', {
            class: [this.$style['login_password']],
            attrs: {
              placeholder: '请输入密码',
              type: 'password',
            },
            domProps: {
              value: this.password,
            },
            on: {
              input: (env) => {
                this.password = env.target.value;
              },
            },
          }),
        ]);
        const loginBtn = h('div', [
          h(Button, { 
            class: [this.$style['login_login-btn']],
            props: { 
              type: 'info',
              loading: this.islogin, 
            },
            on: {
              click: this.handlerLoginByPassword
            }
          }, ['登录']),
        ]);

        return h('div', [
          userName,
          password,
          loginBtn,
        ]);
      },
      renderLoginForm(h) {
        if (this.loginModel === 'password') {
          return this.renderUserPasswordForm(h);
        } else if (this.loginModel === 'phone') {
          return null;
        } else if (this.loginModel === 'wx') {
          return null;
        }
      },
      renderServiceProtocol(h) {
        return h('div', { class: [this.$style['login_service-protocol']] }, [
          h(Checkbox, {
            class: [this.$style['login_protocol_checkbox']],
            props: {
              labelDisabled: true,
              value: this.checkProtocol,
            },
            on: {
              click: () => this.checkProtocol = !this.checkProtocol
            }
          }, [
            '我已同意',
            h('router-link', { props: { to: '' } }, ['在线问答使用协议'])
          ])
        ]);
      },
      handlerClearUserName() {
        this.userName = null;
      },
      handlerLoginByPassword() {
        console.log({
          user: this.userName,
          password: this.password,
        });
        this.islogin = true;
        this[DO_LOGIN]({
          user: this.userName,
          password: this.password,
        }).then(() => {
          this.islogin = false;
          Notify({
            type: 'success',
            message: '登录成功',
          });
          this.$router.replace({
            name: 'user-center'
          });
        });
      },
    },
  }
</script>

<style module>
.login {
  position: relative;
  background-color: #ffffff;
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 0 20px;
}

.login_title {
  font-size: 20px;
  color: #696969;
  font-weight: 400;
  margin-top: 50px;
}

.login_form-input {
  border: none;
  border-bottom: 1px solid #e2e2e2;
  width: 100%;
  height: 45px;
  padding: 10px 8px 0;
  margin-top: 10px;
}
.login_form-input::placeholder {
  color: #e2e2e2;
  font-size: 14px;
}
.login_user-name-container {
  position: relative;
}
.login_user-name {
  composes: login_form-input;
}
.login_user-name-clear-btn {
  position: absolute;
  right: 10px;
  top: 25px;
}
.login_password {
  composes: login_form-input;
}
.login_login-btn {
  width: 90%;
  margin: 20px 0 0 5%;
}

.login_service-protocol {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60px;
  font-size: 14px;
}
.login_protocol_checkbox {
  width: 90%;
  margin: 0 auto;
}
</style>
