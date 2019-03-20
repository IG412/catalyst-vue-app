import Vue from 'vue'
import App from './App.vue'
import { makeRouter } from './router'
import { makeStore } from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

export function makeApp() {
  const store = makeStore()
  const router = makeRouter(store)

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
