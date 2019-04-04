<template lang="pug">
.hero.primary-hero
  .hero-head
    nav.navbar
      .container
        .navbar-brand
          router-link.navbar-item(to="/")
            img(src="@/assets/brand.png")
        .navbar-end.is-hidden-touch
          router-link.navbar-item(to="/browse", active-class="is-active") Browse
          router-link.navbar-item(to="/search", active-class="is-active") Search
          router-link.navbar-item(to="/needs-help", active-class="is-active") Partner needed
  .hero-body(v-if="$slots.default")
    .container
      slot
  .hero-foot(v-if="$slots.foot")
    slot(name="foot")
</template>

<style lang="sass">
.primary-hero
  +add-theme-colors

  &.is-gradient
    color: $white
    background-image: linear-gradient(to left, #36C0CD, #1FC986)

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
