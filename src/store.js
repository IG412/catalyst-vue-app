import Vue from 'vue'
import Vuex from 'vuex'

import { MUTATION_PROJECTS } from '@/const'

Vue.use(Vuex)

export function makeStore() {
  return new Vuex.Store({
    state: {
      projects: []
    },
    mutations: {
      [MUTATION_PROJECTS](state, projects) {
        state.projects = projects
      }
    },
    actions: {}
  })
}
