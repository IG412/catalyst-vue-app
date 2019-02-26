import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'

import { ROUTE_HOME, ROUTE_ABOUT } from '@/const'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: ROUTE_HOME,
      component: Home
    },
    {
      path: '/about',
      name: ROUTE_ABOUT,
      component: About
    }
  ]
})
