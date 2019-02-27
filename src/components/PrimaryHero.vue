<template lang="pug">
.hero(:class="classes")
  .hero-head
    nav.navbar
      .container
        .navbar-brand
          router-link.navbar-item(to="/")
            img(src="@/assets/brand.png")
  .hero-body(v-if="$slots.default")
    .container
      slot
  .hero-foot(v-if="$slots.foot")
    slot(name="foot")
</template>

<script>
const allColors = ['red', 'green', 'yellow', 'blue']

export default {
  data() {
    return {
      color: 'blue',
      timerId: null
    }
  },
  computed: {
    classes() {
      return [`is-${this.color}`]
    },
    nextColors() {
      return allColors.filter(c => c !== this.color)
    }
  },
  mounted() {
    // this.timerId = setInterval(() => {
    //   this.color = this.pickColor()
    // }, 5000)
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

<style lang="sass" scoped>
.hero
  +add-theme-colors
  transition: background-color color
  transition-duration: 1s
</style>
