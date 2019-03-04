import { makeApp } from './app'

// client-specific bootstrapping logic...

const { app, store } = makeApp()

// Initialize the store state with the data injected from the server
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// this assumes App.vue template root element has `id="app"`
app.$mount('#app')
