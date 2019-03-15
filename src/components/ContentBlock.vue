<template lang="pug">
.content-block
  .container
    .content.page-content(v-html="content")
</template>

<script>
import marked from 'marked'

export default {
  props: {
    contentKey: { type: String, required: true }
  },
  computed: {
    content() {
      return marked(this.$store.getters.getContent(this.contentKey) || '')
    }
  }
}
</script>

<style lang="sass" scoped>
.content-block:not(:last-child)
  margin-bottom: 1.5rem
</style>
