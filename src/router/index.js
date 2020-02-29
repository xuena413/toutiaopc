import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '@/views/home'
import Login from '@/views/login' // 引入
import About from '@/views/about'
Vue.use(VueRouter)

const routes = [
  // 强制跳转
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }, { // 使用
    path: '/login',
    name: 'login',
    component: Login
  },
  { // 使用
    path: '/about',
    name: 'about',
    component: About
  }
  // {
  // 按需加载
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
