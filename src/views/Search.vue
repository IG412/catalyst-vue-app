<template lang="pug">
.page.search
  PrimaryHero.is-red
    h1.title.inherit-color
      SearchSvg.hero-title-icon
      span Search for projects: 
      input.search-input(
        type="text"
        placeholder="e.g. A.I. or Governance"
        v-model="searchQuery"
      )
    
  section.section.page-expand
    .container(v-if="!hasQuery")
      .notification.is-grey.is-size-4
        | Enter a term to start searching
    .container(v-else-if="!hasMatches")
      .notification.is-warning.is-size-4
        | No matches, check your query or try a different one
    .container(v-else)
      h2.title.is-3.is-marginless Matched projects
      p Lol...
  PageFooter
</template>

<script>
import PrimaryHero from '@/components/PrimaryHero.vue'
import PageFooter from '@/components/PageFooter.vue'

import SearchSvg from '@/assets/search.svg'

export default {
  components: { PrimaryHero, PageFooter, SearchSvg },
  data: () => ({
    searchQuery: ''
  }),
  computed: {
    hasQuery() {
      return this.searchQuery.trim().length > 0
    },
    hasMatches() {
      return this.hasQuery && this.matchedProjects.length > 0
    },
    matchedProjects() {
      return this.$store.state.projects.filter(project =>
        this.projectMatchesQuery(project, this.searchQuery)
      )
    }
  },
  methods: {
    projectMatchesQuery(project, query) {
      return true
    }
  }
}
</script>

<style lang="sass" scoped>
.search-input
  margin: 0 0.1em
  padding: 0
  box-shadow: none
  background: transparent
  outline: none
  border: none
  font-size: inherit
  border-bottom: 2px solid rgba(255,255,255, 0.7)
  color: $white
  min-width: 360px
  display: inline-block

  &::placeholder
    color: $white
    opacity: 0.3
    font-style: italic
</style>
