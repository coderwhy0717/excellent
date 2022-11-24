<template>
  <div class="home">
    <div class="title">excellentGraduateDesign</div>
    <div class="btn">
      <div class="add" @click="changeAdd">添加</div>
      <div>
        <div class="guan" v-if="guan" @click="changeGuan">管理</div>
        <div class="guan" v-else @click="changeGuan">退出管理</div>
      </div>
    </div>

    <van-popup
      v-model:show="Addshow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="titleadd">添加标题/文本</div>
      <div class="input1" v-if="Addshow">
        <van-cell-group inset>
          <van-field v-model="value1" label="标题" placeholder="请输入标题" />
        </van-cell-group>
        <textarea
          class="textarea"
          name="text"
          id=""
          cols="50"
          v-model="value2"
          rows="16"
          placeholder="请输入文本内容"
        ></textarea>
      </div>
    </van-popup>
    <div>
      <template v-for="(item, index) in homeDate" :key="index">
        <div class="item">
          <router-link to="/detail" v-if="guan">{{ item }}</router-link>
          <div v-else @click="changeDelete(item)">
            <span href="/#">{{ item }}</span>
            <span class="delete">删除</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { getHomeData } from '@/services'

const homeDate = ref()
const value1 = ref()
const value2 = ref()
const Addshow = ref(false)
const guan = ref(true)
getHomeData().then(
  (res) => {
    console.log(res)
    homeDate.value = res
  },
  (err) => {
    alert('请求数据失败')
  }
)
const changeGuan = () => {
  guan.value = !guan.value
}
// 删除
const changeDelete = (item) => {
  console.log(item)
}
// 添加
const changeAdd = () => {
  Addshow.value = !Addshow.value
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
  .van-cell {
    border-bottom: 1px solid #ccc;
  }
  .title {
    font-size: 30px;
    font-weight: 900;
    margin: 50px 0 30px;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 30px;
    .add {
      margin-left: 30px;
      font-size: 20px;
    }
  }
  .titleadd {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-weight: 600;
    font-size: 20px;
    background-color: #f9f9f9;
    box-shadow: 0px 10px 5px -12px rgba(0, 0, 0, 0.5);
  }
  .input1 {
    margin-top: 30px;
    .textarea {
      margin: 10px 0;
    }
  }
  .guan {
    text-align: right;
    margin-right: 30px;
    font-size: 20px;
  }
  .label {
    text-align: left;
  }
  .delete {
    display: inline-block;
    margin-left: 20px;
    font-size: 12px;
    background-color: red;
    color: #fff;
    padding: 0px 5px;
    border-radius: 5px;
  }
  .item {
    font-size: 20px;
    margin: 10px 0;
    a {
      color: rgb(131, 40, 40);
    }
  }
}
</style>
