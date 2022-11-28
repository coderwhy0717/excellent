<template>
  <div class="loading" v-if="isloadingShow">
    <van-loading color="#0094ff" vertical>
      <div>加载中...</div>
    </van-loading>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { isloadingShow } = storeToRefs(mainStore)
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
