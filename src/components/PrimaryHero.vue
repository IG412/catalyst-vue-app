<template lang="pug">
.hero(:class="classes")
  .hero-head
    nav.navbar
      .container
        .navbar-brand
          router-link.navbar-item(to="/")
            img(src="@/assets/brand.png")
        .navbar-end.is-hidden-touch
          router-link.navbar-item(to="/browse", active-class="is-active") Browse
          router-link.navbar-item(to="/search", active-class="is-active") Search
          router-link.navbar-item(to="/needs-help", active-class="is-active") Help needed
  .hero-body(v-if="$slots.default")
    .container
      slot
  .hero-foot(v-if="$slots.foot")
    slot(name="foot")
</template>

<script>
const allColors = ['red', 'green', 'yellow', 'blue']

export default {
  props: {
    randomize: { type: Boolean, default: false }
  },
  data() {
    return {
      color: 'blue',
      timerId: null
    }
  },
  computed: {
    classes() {
      return this.randomize ? [`is-${this.color}`] : []
    }
  },
  mounted() {
    if (this.randomize) {
      // this.timerId = setInterval(() => {
      //   this.color = this.pickColor()
      // }, 5000)
    }
  },
  destroyed() {
    if (this.timerId) clearInterval(this.timerId)
  },
  methods: {
    pickColor() {
      const nextColors = allColors.filter(c => c !== this.color)
      return nextColors[0 | (Math.random() * nextColors.length)]
    }
  }
}
</script>

<style lang="sass">
.hero
  +add-theme-colors
  transition: background-color color
  transition-duration: 1s

  .hero-title-icon
    display: inline-block
    height: 1.75em
    line-height: 1em
    vertical-align: middle
    margin-right: 0.3em
    fill: currentColor

  .navbar-end
    .navbar-item
      color: white
      font-weight: 900
      &.is-active
        background: rgba(0,0,0,0.05)
        text-decoration: underline
      &:hover
        background: rgba(0,0,0,0.1)
</style>
