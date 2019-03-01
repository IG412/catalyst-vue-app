import Vue from 'vue'
import ky from 'ky'

Vue.use(Vue => {
  Vue.prototype.$api = ky.extend({
    prefixUrl: 'http://localhost:3000'
  })
})
