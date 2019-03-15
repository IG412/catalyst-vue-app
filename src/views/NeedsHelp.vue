<template lang="pug">
.page.browse
  PrimaryHero.is-yellow
    h1.title.inherit-color.is-size-4-mobile
      NeedsHelpSvg.hero-title-icon
      span Find projects that need: 
      .need-picker
        select(v-model="chosenNeed")
          option(value="", disabled) Pick a need
          option(v-for="need in allNeeds", :value="need.id") {{ need.name }}
      
  
  .container
    nav.breadcrumb.has-text-weight-bold
      ul
        li: router-link(to="/") Home
        li.is-active: a(href="#") Needs Help
  
  section.section.page-expand
    ContentBlock(
      content-key="needs-help.about"
    )
    .container(v-if="!chosenNeed")
      .notification.is-grey.is-size-4
        | Pick a need to start finding projects
    .container(v-else)
      ProjectColumns(title="Matched Projects", :projects="matchedProjects")
  PageFooter
</template>

<script>
import PrimaryHero from '@/components/PrimaryHero.vue'
import PageFooter from '@/components/PageFooter.vue'
import ProjectColumns from '@/components/ProjectColumns.vue'
import ContentBlock from '@/components/ContentBlock.vue'

import NeedsHelpSvg from '@/assets/needs-help.svg'

import { ROUTE_NEEDS_HELP } from '@/const'

export default {
  components: {
    PrimaryHero,
    PageFooter,
    ProjectColumns,
    ContentBlock,
    NeedsHelpSvg
  },
  data() {
    return {
      chosenNeed: this.$route.query.need || ''
    }
  },
  computed: {
    allNeeds() {
      const needs = new Set()
      for (let project of this.$store.state.projects) {
        for (let need of project.needs) {
          needs.add(need.name)
        }
      }
      return Array.from(needs).map(id => ({
        id: id,
        name: this.$store.getters.getContent(`need.${id}`) || id
      }))
    },
    matchedProjects() {
      if (!this.chosenNeed) return []
      return this.$store.state.projects.filter(project =>
        project.needs.some(need => need.name === this.chosenNeed)
      )
    }
  },
  watch: {
    chosenNeed(newValue) {
      const query = { need: newValue }
      this.$router.replace({ name: ROUTE_NEEDS_HELP, query })
    }
  }
}
</script>

<style lang="sass" scoped>
.hero-title-icon
  transform: translateY(-5px)

.need-picker
  display: inline-block
  position: relative
  padding-right: 1em
  select
    +header-input
  &:after
    display: block
    position: absolute
    content: '▾'
    top: 1px
    bottom: 6px
    right: 1px
    padding-right: 0.1em
    line-height: 1.5
    background: $theme-yellow
    pointer-events: none
</style>
