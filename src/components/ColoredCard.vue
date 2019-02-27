<template lang="pug">
.colored-card(:class="classes")
  slot
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'blue' },
    interactable: { type: Boolean, default: false }
  },
  computed: {
    classes() {
      return [`is-${this.color}`, this.interactable && `is-interactable`]
    }
  }
}
</script>

<style lang="sass">
.colored-card
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
  transition: transform 0.3s

  &> *
    +tablet
      padding: 1.5rem 1rem
      display: block
    +mobile
      padding: 1rem 0.75rem
      display: block

  +add-theme-colors

  &.is-interactable:hover
    transform: translateY(-3px)

  svg
    fill: currentColor
</style>
