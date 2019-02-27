<template lang="pug">
footer.footer.page-footer.has-text-centered
  p
    span Made by 
    ExternalAnchor(href="https://openlab.ncl.ac.uk") Open Lab
  p.links
    a(href="https://github.com/unplatform", target="_blank") Open Source
    span.version version {{appVersion}}
</template>

<script>
import ExternalAnchor from './ExternalAnchor'

export default {
  components: { ExternalAnchor },
  computed: {
    appVersion() {
      return process.env.VUE_APP_VERSION
    }
  }
}
</script>

<style lang="sass" scoped>
.footer
  padding: 3rem 1rem 2rem
  color: $grey
  font-size: 0.95rem
  font-weight: 600
  p
    margin-bottom: 0.5em
  a
    color: $grey-dark
    text-decoration: underline $grey-lighter
  .links
    *:not(:last-child)
      margin-right: 0.5em
      border-right: 1px solid $grey
      padding-right: 0.5em
  .version
    user-select: all
    color: $grey
</style>
