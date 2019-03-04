import Vue from 'vue'
import Vuex from 'vuex'

import { makeApiClient } from '@api'

import { MUTATION_PROJECTS, MUTATION_BROWSE } from '@/const'

Vue.use(Vuex)

export function makeStore() {
  const apiClient = makeApiClient()

  return new Vuex.Store({
    state: () => ({
      projects: [],
      browse: [],
      apiUrl: process.env.VUE_APP_API_URL,
      appName: 'Not-Equal Catalyst'
    }),
    getters: {
      apiConf(state) {
        return { prefixUrl: state.apiUrl }
      }
    },
    mutations: {
      [MUTATION_PROJECTS](state, projects) {
        state.projects = projects
      },
      [MUTATION_BROWSE](state, browse) {
        state.browse = browse
      }
    },
    actions: {
      async fetchProjects({ commit, getters }) {
        try {
          let { data } = await apiClient('projects', getters.apiConf).json()
          commit(MUTATION_PROJECTS, data)
        } catch (error) {
          console.log(error)
        }
      },
      async fetchBrowsing({ commit, getters }) {
        try {
          let { data } = await apiClient('browse', getters.apiConf).json()
          commit(MUTATION_BROWSE, data)
        } catch (error) {
          console.log(error)
        }
      }
    }
  })
}
