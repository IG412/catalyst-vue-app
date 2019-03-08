<template lang="pug">
.page.home
  PrimaryHero.is-medium.is-gradient
    h1.title.inherit-color.is-size-4-mobile
      span Find potential projects, get involved
      br
      span and make them happen!
  .page-expand
    section.section
      .container
        h2.title.is-3.is-marginless Pick a way to find projects
        .columns.navigation-options
          .column.is-one-quarter
            NavigationCard(:to="browseRoute", color="green")
              BrowseSvg(slot="image")
              h3.title.inherit-color Browse
          .column.is-one-quarter
            NavigationCard(:to="searchRoute", color="red")
              SearchSvg(slot="image")
              h3.title.inherit-color Search
          .column.is-one-quarter
            NavigationCard(:to="needsHelpRoute", color="yellow")
              NeedsHelpSvg(slot="image")
              h3.title.inherit-color Help needed
    
    section.section
      .container
        h2.title.is-3.is-marginless What is this?
        .content(v-html="aboutContent")
  
  PageFooter
</template>

<script>
import marked from 'marked'

import PrimaryHero from '@/components/PrimaryHero.vue'
import NavigationCard from '@/components/NavigationCard.vue'
import PageFooter from '@/components/PageFooter.vue'

import SearchSvg from '@/assets/search.svg'
import BrowseSvg from '@/assets/browse.svg'
import NeedsHelpSvg from '@/assets/needs-help.svg'

import { ROUTE_BROWSE, ROUTE_SEARCH, ROUTE_NEEDS_HELP } from '@/const'

export default {
  components: {
    PrimaryHero,
    NavigationCard,
    PageFooter,
    SearchSvg,
    BrowseSvg,
    NeedsHelpSvg
  },
  data: () => ({
    browseRoute: { name: ROUTE_BROWSE },
    searchRoute: { name: ROUTE_SEARCH },
    needsHelpRoute: { name: ROUTE_NEEDS_HELP }
  }),
  computed: {
    aboutContent() {
      return marked(this.$store.getters.getContent('about.long', '...'))
    }
  }
}
</script>

<style lang="sass">
.home.page
  .navigation-options
    margin-top: 0
  .navigation-options .image
    display: flex
    flex-direction: column
    justify-content: center

  +mobile
    .navigation-card > a
      padding: 1.5rem 1rem
</style>
