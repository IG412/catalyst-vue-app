<template lang="pug">
ColoredCard.project-card(:color="categoryColor", interactable)
  router-link.inherit-color(:to="projectRoute")
    .category-image
      img(:src="categoryImage", :alt="categoryName")
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

import AlgorithmsPng from '@/assets/categories/algorithms.png'
import FairnessPng from '@/assets/categories/fairness.png'
import MixedPng from '@/assets/categories/mixed.png'
import SecurityPng from '@/assets/categories/security.png'

const imageMap = {
  algorithms: AlgorithmsPng,
  fairness: FairnessPng,
  mixed: MixedPng,
  security: SecurityPng
}

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
    categoryImage() {
      if (!this.category) return imageMap.mixed
      return imageMap[this.category.id] || imageMap.mixed
    },
    categoryName() {
      return this.category ? this.category.name : 'Mixed Category'
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
.category-image
  padding: 1em 2em
+mobile
  .project-card a
    flex-direction: row
  .category-image
    width: 64px
    padding: 0
    margin-right: 0.5em
  .tags
    flex: 0
    flex-direction: column
    align-items: flex-end
</style>
