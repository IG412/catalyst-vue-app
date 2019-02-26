import Vue from 'vue'
import App from './App.vue'
import { makeRouter } from './router'
import { makeStore } from './store'

Vue.config.productionTip = false

export function makeApp() {
  const router = makeRouter()
  const store = makeStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

  return { app, router, store }
}
