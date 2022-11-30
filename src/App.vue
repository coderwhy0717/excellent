<template>
  <div class="app">
    <router-view></router-view>
    <Loading />
    <Advertising />
  </div>
</template>

<script setup>
import Advertising from './components/advertising/advertising.vue'
import Loading from './components/loading/loading.vue'
</script>

<style lang="less" scoped>
.app {
}
</style>
