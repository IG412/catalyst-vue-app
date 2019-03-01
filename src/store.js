import Vue from 'vue'
import Vuex from 'vuex'

import { MUTATION_PROJECTS, MUTATION_BROWSE } from '@/const'

Vue.use(Vuex)

export function makeStore() {
  return new Vuex.Store({
    state: {
      projects: [],
      browse: []
    },
    mutations: {
      [MUTATION_PROJECTS](state, projects) {
        state.projects = projects
      },
      [MUTATION_BROWSE](state, browse) {
        state.browse = browse
      }
    },
    actions: {}
  })
}
