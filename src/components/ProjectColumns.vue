<template lang="pug">
.project-columns
  h2.title.is-3.is-marginless {{ title }}
  .columns.is-multiline
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
.project-columns:not(:last-child)
  margin-bottom: 3em

.columns
  margin-top: 0

.column *
  height: 100%
</style>
