import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Browse from './views/Browse.vue'
import Search from './views/Search.vue'
import NeedsHelp from './views/NeedsHelp.vue'
import Project from './views/Project.vue'

import {
  ROUTE_HOME,
  ROUTE_BROWSE,
  ROUTE_SEARCH,
  ROUTE_NEEDS_HELP,
  ROUTE_PROJECT
} from '@/const'

Vue.use(Router)

// TODO: Add NotFound route

function makeMeta(pageName) {
  return { meta: { pageName } }
}

export function makeRouter() {
  let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: ROUTE_HOME,
        component: Home,
        ...makeMeta('Home')
      },
      {
        path: '/browse',
        name: ROUTE_BROWSE,
        component: Browse,
        ...makeMeta('Browse')
      },
      {
        path: '/search',
        name: ROUTE_SEARCH,
        component: Search,
        ...makeMeta('Search')
      },
      {
        path: '/needs-help',
        name: ROUTE_NEEDS_HELP,
        component: NeedsHelp,
        ...makeMeta('Needs Help')
      },
      {
        path: '/project/:id',
        name: ROUTE_PROJECT,
        component: Project,
        ...makeMeta('Project')
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    let title = 'Not-Equal Catalyst'

    if (to.meta && to.meta.pageName) {
      title = `${to.meta.pageName} | ${title}`
    }

    if (typeof window !== 'undefined') window.document.title = title

    next()
  })

  return router
}
