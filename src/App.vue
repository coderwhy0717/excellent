<template>
  <div class="app">
    <router-view></router-view>
    <Loading />
  </div>
</template>

<script setup>
import Loading from './components/loading/loading.vue'
</script>

<style lang="less" scoped>
.app {
}
</style>
