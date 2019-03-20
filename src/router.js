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

export function makeRouter(store) {
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
    ],
    scrollBehavior(to, from, savedPosition) {
      // Go to the top when going from '/' to '/browse'
      if (to.name === ROUTE_BROWSE && from.name === ROUTE_HOME) {
        return { x: 0, y: 0 }
      }
      return savedPosition
    }
  })

  // Emit a page_view when each page is visited
  router.beforeEach((to, from, next) => {
    const { path } = to
    store.dispatch('emitMessage', { type: 'page_view', path })
    next()
  })

  // Update the title when each page is visited
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
