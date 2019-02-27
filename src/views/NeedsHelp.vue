<template lang="pug">
.page.browse
  PrimaryHero.is-yellow
    h1.title.inherit-color
      NeedsHelpSvg.hero-title-icon
      span Find projects that need
      span  SOMETHING
  
  .container
    nav.breadcrumb.has-text-weight-bold
      ul
        li: router-link(to="/") Home
        li.is-active: a(href="#") Needs Help
  
  section.section.page-expand
    .container
      h2.title.is-3.is-marginless Nulla vitae elit libero, a pharetra augue.
      .content
        p Sed posuere consectetur est at lobortis. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        p Nullam id dolor id nibh ultricies vehicula ut id elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        p Sed posuere consectetur est at lobortis. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
</template>

<script>
import PrimaryHero from '@/components/PrimaryHero.vue'
import PageFooter from '@/components/PageFooter.vue'

import NeedsHelpSvg from '@/assets/needs-help.svg'

export default {
  components: { PrimaryHero, PageFooter, NeedsHelpSvg }
}
</script>

<style lang="sass" scoped>
.hero-title-icon
  transform: translateY(-5px)
</style>
