import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

import {
  ROUTE_HOME,
  ROUTE_BROWSE,
  ROUTE_SEARCH,
  ROUTE_NEEDS_HELP
} from '@/const'

Vue.use(Router)

export function makeRouter() {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: ROUTE_HOME,
        component: Home
      },
      {
        path: '/browse',
        name: ROUTE_BROWSE,
        component: Home
      },
      {
        path: '/search',
        name: ROUTE_SEARCH,
        component: Home
      },
      {
        path: '/needs-help',
        name: ROUTE_NEEDS_HELP,
        component: Home
      }
    ]
  })
}
