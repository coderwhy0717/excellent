<template>
  <div class="back-top" v-if="backTop">
    <van-icon name="back-top" class="icontop" @click="changebackTop" />
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main'
import { scrollhooks } from '@/hooks/hooks-scroll'
import { storeToRefs } from 'pinia'
const mainStore = useMainStore()
const { backTop } = storeToRefs(mainStore)

const changebackTop = () => {}
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 100px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #000;
  opacity: 0.5;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .icontop {
    font-size: 25px;
    color: #fff;
  }
}
</style>
