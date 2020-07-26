import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/home/home';
import Course from '@/views/course/course';
import AnswerQuestion from '@/views/question/answerQuestion';

Vue.use(VueRouter);


const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/course',
    component: Course,
  },
  {
    // 课程详情页
    name: 'coutse-detail',
    path: '/course/:id',
    component: Course,
    props: true
  },
  {
    // 答题详情页，有详细的问题内容，上下题目跳转，查看答案解析
    name: 'answer-question',
    path: '/course/:courseId/answer_question/:questionId',
    component: AnswerQuestion,
    props: true
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