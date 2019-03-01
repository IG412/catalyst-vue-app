<template lang="pug">
.page.project(v-if="project")
  PrimaryHero(:class="colorClass")
  
  .container
    nav.breadcrumb.has-text-weight-bold
      ul
        li: router-link(to="/") Home
        li.is-active: a(href="#") View project
  
  section.section.page-expand
    .container
      .project-detail
        .columns
          .column.is-two-thirds
            .project-detail-card(:class="colorClass")
              .columns
                .column
                  h1.title.inherit-color {{ project.name }}
                .column.is-narrow
                  img.category-image(:src="categoryImage")
              .content(v-html="content")
              .tags
                .tag.is-white.knockout-text.has-font-weight-black(
                  v-for="theme in project.themes"
                ) {{theme.name}}
          .column
            h3.title.is-4.is-marginless What is this?
            .content
              p Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero, a pharetra augue.
              p Sed posuere consectetur est at lobortis. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue.
  
  PageFooter
</template>

<script>
import PrimaryHero from '@/components/PrimaryHero.vue'
import PageFooter from '@/components/PageFooter.vue'

import CategoryData from '@/data/categories.json'
import ImageMap from '@/data/categoryImages'
import marked from 'marked'

export default {
  components: { PrimaryHero, PageFooter },
  computed: {
    projectId() {
      return this.$route.params.id
    },
    project() {
      return this.$store.state.projects.find(p => p.id === this.projectId)
    },
    projectCrumb() {
      return this.project ? this.project.name : 'View Project'
    },
    category() {
      return (
        (this.project.category && CategoryData[this.project.category.name]) ||
        CategoryData.mixed
      )
    },
    colorClass() {
      return [this.category && `is-${this.category.color}`]
    },
    categoryImage() {
      return (this.category && ImageMap[this.category.id]) || ImageMap.mixed
    },
    content() {
      return marked(this.project.desc)
    }
  }
}
</script>

<style lang="sass">
.project-detail-card
  padding: 1em 1.5em
  +add-theme-colors

  .category-image
    width: 96px

  .content
    a
      color: inherit
      font-weight: bold
      text-decoration: underline
</style>
