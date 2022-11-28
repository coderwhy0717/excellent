<template>
  <div class="detail">
    <div class="out" @click="changeclick">
      <van-icon name="arrow-left" />
      <span>返回</span>
    </div>
    <div class="heder">{{ detailData.title }}阿萨法</div>
    <div>
      <template v-for="(item, index) in text" :key="index">
        <div class="text">
          {{ item }}
        </div>
      </template>
    </div>
    <div class="link" v-if="detailData.link">
      地址链接：
      <a :href="detailData.link">跳转到网址链接</a>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QueryContents } from '@/services'
import { formtText } from '@/utils/formt-text'
const route = useRoute()
const router = useRouter()
const detailData = ref({})
const text = computed(() => formtText(detailData.value.content))
console.log(route.query.id)
const getdatas = (id) => {
  QueryContents(id)
    .then((res) => {
      detailData.value = res
    })
    .catch((err) => {
      alert('响应失败')
    })
}
getdatas(route.query.id)
watch(route, (newvalue) => {
  console.log('新的', newvalue)
  getdatas(newvalue.query.id)
})
const changeclick = () => {
  router.back()
}
</script>

<style lang="less" scoped>
.detail {
  padding: 10px 5px;
  .out {
    font-size: 16px;
    margin-left: 5px;
  }
  .heder {
    text-indent: 1em;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    text-align: justify;
    padding: 20px 20px;
  }
  .text {
    // 文本内容开始空两个空格
    text-indent: 2em;

    text-align: justify;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .link {
    text-indent: 2em;
    margin: 30px 0;
  }
}
</style>
