<template lang="pug">
ColoredCard.project-card(:color="categoryColor", interactable)
  router-link.inherit-color(:to="projectRoute")
    h3.title.inherit-color.is-4 {{ project.name }}
    .tags
      .tag.is-white.knockout-text(
        v-for="theme in project.themes"
      ) {{theme.name}}
</template>

<script>
import ColoredCard from './ColoredCard.vue'

import { ROUTE_PROJECT } from '@/const'
import CategoryData from '@/data/categories.json'

export default {
  components: { ColoredCard },
  props: {
    project: { type: Object, required: true }
  },
  computed: {
    category() {
      return this.project.category && CategoryData[this.project.category.name]
    },
    categoryColor() {
      return this.category ? this.category.color : 'blue'
    },
    projectRoute() {
      const params = { id: this.project.id }
      return { name: ROUTE_PROJECT, params }
    }
  }
}
</script>

<style lang="sass" scoped>
.knockout-text
  font-weight: 900
  mix-blend-mode: screen
a
  height: 100%
  display: flex
  flex-direction: column
.title
  flex: 1
</style>
