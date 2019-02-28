<template lang="pug">
.matched-results
  h2.title.is-3.is-marginless {{ title }}
  .columns
    .column.is-one-quarter(v-for="project in projects", :key="project.id")
      ProjectCard(:project="project")
</template>

<script>
import ProjectCard from './ProjectCard.vue'

export default {
  components: { ProjectCard },
  props: {
    title: { type: String, required: true },
    projects: { type: Array, required: true }
  }
}
</script>

<style lang="sass" scoped>
.columns
  margin-top: 0
</style>
