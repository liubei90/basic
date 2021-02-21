import Vue from 'vue';
import VueRouter from 'vue-router';

import { AUTH_LOGIN } from './const';
import { isLogin } from './models/login';

import Home from '@/views/home/home';
import Course from '@/views/course/course';
import AnswerQuestion from '@/views/question/answerQuestion';
import UserCenter from '@/views/userCenter/userCenter';
import Login from '@/views/login/login';
import Regist from '@/views/login/regist';

Vue.use(VueRouter);


const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      auth: [],
    },
  },
  {
    name: 'regist',
    path: '/regist',
    component: Regist,
    meta: {
      auth: [],
    },
  },
  {
    name: 'user-center',
    path: '/user-center',
    component: UserCenter,
    meta: {
      showTab: true,
    },
  },
  {
    name: 'user-detail',
    path: '/user-detail',
    component: Login,
    meta: {
      auth: [AUTH_LOGIN],
    },
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showTab: true,
    },
  },
  {
    path: '/course',
    component: Course,
    meta: {
      auth: [AUTH_LOGIN],
    },
  },
  {
    // 课程详情页
    name: 'coutse-detail',
    path: '/course/:id',
    component: Course,
    props: true,
    meta: {
      auth: [AUTH_LOGIN],
    },
  },
  {
    // 答题详情页，有详细的问题内容，上下题目跳转，查看答案解析
    name: 'answer-question',
    path: '/course/:courseId/answer_question/:questionId',
    component: AnswerQuestion,
    props: true,
    meta: {
      auth: [AUTH_LOGIN],
    },
  },
  // {
  //   // 问题详情页，有详细的问题内容，答案解析，上下题目跳转
  //   // 需要做权限校验，什么情况下才能看到？
  //   path: '/course/:id/question/:questionId',
  //   component: Course,
  //   props: true
  // },
];

const router = new VueRouter({
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  // 检查登录权限
  if (to.matched.some(record => Array.isArray(record.meta['auth']) && (record.meta['auth'].indexOf(AUTH_LOGIN) > -1) )) {
    if (!isLogin()) {
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      });
      return;
    }
  }

  next();
});
