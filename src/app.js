import Vue from 'vue'
import App from './App.vue'
import { makeRouter } from './router'
import { makeStore } from './store'
import ky from 'ky'

Vue.config.productionTip = false

export function makeApp() {
  const router = makeRouter()
  const store = makeStore()

  Vue.use(Vue => {
    Vue.prototype.$api = ky.extend({
      prefixUrl: 'http://localhost:3000'
    })
  })

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

  return { app, router, store }
}
