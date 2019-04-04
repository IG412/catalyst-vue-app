<template lang="pug">
.project-columns
  h2.title.is-3.is-marginless
    span.text {{ title }}
    router-link(v-if="shouldShowMore", :to="route") (show more)
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
    projects: { type: Array, required: true },
    route: { type: [String, Object], default: null }
  },
  computed: {
    shouldShowMore() {
      return this.route !== null && this.projects.length >= 4
    }
  }
}
</script>

<style lang="sass" scoped>
.project-columns:not(:last-child)
  margin-bottom: 3em

.project-columns > .title
  display: flex
  align-items: flex-end
  .text
    flex: 1
    +mobile
      font-size: 0.7em
  a
    font-size: 0.7em
    font-weight: 600
    +mobile
      font-size: 0.5em

.columns
  margin-top: 0

.column *
  height: 100%
</style>
