<template lang="pug">
.home
  img(alt="Vue logo" src="../assets/logo.png")
  HelloWorld(msg="Welcome to Rob's Vue.js App")
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
