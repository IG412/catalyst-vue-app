import Vue from 'vue'
import Vuex from 'vuex'

import { makeApiClient } from '@api'

import { MUTATION_PROJECTS, MUTATION_BROWSE, MUTATION_CONTENT } from '@/const'

Vue.use(Vuex)

export function makeStore() {
  const apiClient = makeApiClient()

  return new Vuex.Store({
    state: () => ({
      projects: [],
      content: null,
      browse: [],
      apiUrl: process.env.VUE_APP_API_URL,
      appName: 'Not-Equal Catalyst'
    }),
    getters: {
      apiConf(state) {
        return { prefixUrl: state.apiUrl }
      },
      getContent: state => (key, fallback = '') => {
        if (!state.content) return fallback
        return state.content[key] || fallback
      }
    },
    mutations: {
      [MUTATION_PROJECTS](state, projects) {
        state.projects = projects
      },
      [MUTATION_BROWSE](state, browse) {
        state.browse = browse
      },
      [MUTATION_CONTENT](state, content) {
        state.content = content
      }
    },
    actions: {
      async fetchProjects({ commit, getters }) {
        try {
          let { data } = await apiClient('projects', getters.apiConf).json()
          commit(MUTATION_PROJECTS, data)
        } catch (error) {
          console.error(error)
        }
      },
      async fetchBrowsing({ commit, getters }) {
        try {
          let { data } = await apiClient('browse', getters.apiConf).json()
          commit(MUTATION_BROWSE, data)
        } catch (error) {
          console.error(error)
        }
      },
      async fetchContent({ commit, getters }) {
        try {
          let { data } = await apiClient('content', getters.apiConf).json()
          commit(MUTATION_CONTENT, data)
        } catch (error) {
          console.error(error)
        }
      }
    }
  })
}
