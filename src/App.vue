<template lang="pug">
#app
  router-view
</template>

<script>
import { MUTATION_PROJECTS } from '@/const'

export default {
  computed: {
    apiUrl() {
      return 'http://localhost:3000'
    }
  },
  mounted() {
    this.fetchProjects()
  },
  methods: {
    async fetchProjects() {
      try {
        let { data } = await this.$api('projects').json()
        this.$store.commit(MUTATION_PROJECTS, data)
      } catch (error) {
        console.log(error)
      }
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
