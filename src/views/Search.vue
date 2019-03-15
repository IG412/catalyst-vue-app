<template lang="pug">
.page.search
  PrimaryHero.is-red
    h1.title.inherit-color.is-size-4-mobile
      SearchSvg.hero-title-icon
      span Search for projects: 
      input.search-input(
        type="text"
        placeholder="e.g. A.I. or Governance"
        v-model="searchQuery"
      )
  
  .container
    nav.breadcrumb.has-text-weight-bold
      ul
        li: router-link(to="/") Home
        li.is-active: a(href="#") Search
  
  section.section.page-expand
    ContentBlock(
      content-key="search.about"
    )
    .container(v-if="!hasQuery")
      .notification.is-grey.is-size-4
        | Enter a term to start searching
    .container(v-else-if="!hasMatches")
      .notification.is-warning.is-size-4
        | No matches, check your query or try a different one
    .container(v-else)
      ProjectColumns(title="Matched Projects", :projects="matchedProjects")
  PageFooter
</template>

<script>
import PrimaryHero from '@/components/PrimaryHero.vue'
import PageFooter from '@/components/PageFooter.vue'
import ProjectColumns from '@/components/ProjectColumns.vue'
import ContentBlock from '@/components/ContentBlock.vue'

import SearchSvg from '@/assets/search.svg'

import { ROUTE_SEARCH } from '@/const'

export default {
  components: {
    PrimaryHero,
    PageFooter,
    ProjectColumns,
    ContentBlock,
    SearchSvg
  },
  data() {
    return {
      searchQuery: this.$route.query.query || ''
    }
  },
  computed: {
    hasQuery() {
      return this.searchQuery.trim().length > 0
    },
    hasMatches() {
      return this.hasQuery && this.matchedProjects.length > 0
    },
    matchedProjects() {
      return this.$store.state.projects.filter(project =>
        this.queryProject(project, this.searchQuery)
      )
    }
  },
  watch: {
    searchQuery(newValue) {
      const query = { query: newValue }
      this.$router.replace({ name: ROUTE_SEARCH, query })
    }
  },
  methods: {
    queryProject(project, query) {
      let regex = new RegExp(query.trim(), 'gi')
      const predicate = string => regex.test(string)
      const relationPredicate = rel => predicate(rel.name)

      return predicate(project.name) || project.themes.some(relationPredicate)
    }
  }
}
</script>

<style lang="sass" scoped>
.search-input
  +header-input

  &::placeholder
    color: $white
    opacity: 0.3
    font-style: italic
</style>
