import Vue from 'vue'
import Vuex from 'vuex'

import { makeApiClient } from '@api'

import {
  MUTATION_PROJECTS,
  MUTATION_BROWSE,
  MUTATION_CONTENT,
  MUTATION_SOCKET
} from '@/const'

Vue.use(Vuex)

export function makeStore() {
  const apiClient = makeApiClient()

  return new Vuex.Store({
    state: () => ({
      projects: [],
      content: null,
      browse: [],
      apiUrl: process.env.VUE_APP_API_URL,
      appName: 'Not-Equal Catalyst',
      socket: null,
      bufferedSocketMessages: []
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
      },
      [MUTATION_SOCKET](state, socket) {
        state.socket = Object.seal(socket)

        // Wait for a connection & send buffered messages
        // TODO - It shouldn't mutate the state asynchronously
        socket.addEventListener('open', () => {
          for (let msg of state.bufferedSocketMessages) {
            socket.send(msg)
          }
          state.bufferedSocketMessages = []
        })
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
      },
      async emitMessage({ state }, payload) {
        if (!state.socket) return
        if (state.socket.readyState !== WebSocket.OPEN) {
          state.bufferedSocketMessages.push(JSON.stringify(payload))
        } else {
          state.socket.send(JSON.stringify(payload))
        }
      }
    }
  })
}
