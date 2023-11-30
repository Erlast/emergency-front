<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
  <router-view />
  <notifications />
  <vue3-progress-bar></vue3-progress-bar>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

</style>
