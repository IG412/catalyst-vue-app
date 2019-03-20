<template lang="pug">
#app
  router-view
</template>

<script>
import { MUTATION_SOCKET } from '@/const'

export default {
  mounted() {
    // Wait for next tick to allow for hydration (TODO: find a better way)
    // Uses less than 2 as the SSR route for /project/:id returns a single proj
    this.$nextTick(() => {
      const { projects = [], content } = this.$store.state

      // Fetch content if not hydrated
      if (projects.length < 2) this.$store.dispatch('fetchProjects')
      if (!content) this.$store.dispatch('fetchContent')

      // Create a websocket if they are available
      if (typeof WebSocket !== 'undefined') {
        this.$store.commit(
          MUTATION_SOCKET,
          new WebSocket(this.socketUrl(this.$store.state.apiUrl))
        )

        // Emit the first page view (as this occurs after router.beforeEach)
        const path = location.pathname
        this.$store.dispatch('emitMessage', { type: 'page_view', path })
      }
    })
  },
  methods: {
    socketUrl(httpUrl) {
      return httpUrl.replace(/^http/, 'ws')
    }
  }
}
</script>

<style lang="sass">
@import ~@/sass/styles.sass

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
