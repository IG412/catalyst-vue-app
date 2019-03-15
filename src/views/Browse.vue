<template lang="pug">
.page.browse
  PrimaryHero.is-green
    h1.title.inherit-color.is-size-4-mobile
      BrowseSvg.hero-title-icon
      span Browse all projects
  
  .container
    nav.breadcrumb.has-text-weight-bold
      ul
        li: router-link(to="/") Home
        li.is-active: a(href="#") Browse
  
  section.section.page-expand
    ContentBlock(
      content-key="browse.about"
    )
    .container(v-if="browseData.length > 0")
      ProjectColumns(
        v-for="mode in browseData",
        :key="browseId(mode)",
        :title="browseTitle(mode)",
        :projects="mode.projects.slice(0, 4)"
      )
  PageFooter
</template>

<script>
import PrimaryHero from '@/components/PrimaryHero.vue'
import PageFooter from '@/components/PageFooter.vue'
import ProjectColumns from '@/components/ProjectColumns.vue'
import ContentBlock from '@/components/ContentBlock.vue'

import BrowseSvg from '@/assets/browse.svg'

import CategoryData from '@/data/categories.json'

const BrowseTitles = {
  newest: 'Newest projects',
  oldest: 'Oldest projects',
  recentUpdate: 'Recently Updated projects',
  random: 'Random projects'
}

export default {
  components: {
    PrimaryHero,
    PageFooter,
    ProjectColumns,
    ContentBlock,
    BrowseSvg
  },
  computed: {
    browseData() {
      return this.$store.state.browse
    }
  },
  mounted() {
    if (this.browseData.length === 0) {
      this.$store.dispatch('fetchBrowsing')
    }
  },
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    browseId(mode) {
      return [mode.type, mode.filter].join(':')
    },
    browseTitle(mode) {
      switch (mode.type) {
        case 'theme': {
          return `#${mode.filter}`
        }
        case 'need': {
          let need = this.$store.getters.getContent(`need.${mode.filter}`)
          return `Needs ${need || this.capitalize(mode.filter)}`
        }
        case 'category': {
          let category = CategoryData[mode.filter]
          return category ? category.name : mode.filter
        }
        default: {
          return BrowseTitles[mode.type] || this.capitalize(mode.type)
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
