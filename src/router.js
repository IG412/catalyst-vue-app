import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Browse from './views/Browse.vue'
import Search from './views/Search.vue'
import NeedsHelp from './views/NeedsHelp.vue'

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
        component: Browse
      },
      {
        path: '/search',
        name: ROUTE_SEARCH,
        component: Search
      },
      {
        path: '/needs-help',
        name: ROUTE_NEEDS_HELP,
        component: NeedsHelp
      }
    ]
  })
}
