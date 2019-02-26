import { makeApp } from './app'

// client-specific bootstrapping logic...

const { app } = makeApp()

// this assumes App.vue template root element has `id="app"`
app.$mount('#app')
