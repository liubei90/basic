import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/home/home';
import Course from '@/views/course/course';

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
    path: '/course/:id',
    component: Course,
    props: true
  },
];

const router = new VueRouter({
  routes,
});

export default router;