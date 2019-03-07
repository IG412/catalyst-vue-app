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
        .content
          p Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Nulla vitae elit libero, a pharetra augue. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
          p Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.
          p Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Aenean lacinia bibendum nulla sed consectetur.
  
  PageFooter
</template>

<script>
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
  })
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
