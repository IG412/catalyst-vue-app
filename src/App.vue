<template lang="pug">
#app
  router-view
</template>

<script>
export default {
  computed: {
    apiUrl() {
      return 'http://localhost:3000'
    }
  },
  mounted() {
    // Wait for next tick to allow for hydration (TODO: find a better way)
    // Uses less than 2 as the SSR route for /project/:id returns a single proj
    this.$nextTick(() => {
      const { projects = [] } = this.$store.state
      if (projects.length < 2) {
        this.$store.dispatch('fetchProjects')
      }
    })
  }
}
</script>

<style lang="sass">
@import ~@/sass/styles.sass

#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
