<template lang="pug">
ColoredCard.navigation-card(:color="color", interactable)
  router-link.inherit-color(:to="to")
    .fix-ratio
      .image
        slot(name="image")
    slot
</template>

<script>
import ColoredCard from './ColoredCard.vue'

export default {
  components: { ColoredCard },
  props: {
    color: { type: String, required: true },
    to: { type: [String, Object], required: true }
  }
}
</script>

<style lang="sass">
.navigation-card
  +tablet
    text-align: center
    .fix-ratio
      height: 0
      padding-bottom: 100%
      position: relative
    .image
      display: flex
      align-items: center
      justify-content: center
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      img
        width: 66%
        opacity: 0.7

  +mobile
    a
      display: flex
      align-items: center
    .title
      flex: 1
    img
      width: 2em
      margin-right: 0.5em
</style>
