<template>
  <div class="home" ref="homeRef">
    <div class="title">excellentGraduateDesign</div>
    <div class="btn" v-if="isshow">
      <div class="add" @click="changeAdd">添加</div>
      <div>
        <div class="guan" v-if="guan" @click="changeGuan">管理</div>
        <div class="guan g" v-else @click="changeGuan">退出管理</div>
      </div>
    </div>
    <div class="btn" :class="isshow ? 'fxide' : ''">
      <div class="add" @click="changeAdd">添加</div>
      <div>
        <div class="guan" v-if="guan" @click="changeGuan">管理</div>
        <div class="guan g" v-else @click="changeGuan">退出管理</div>
      </div>
    </div>
    <!-- 编辑内容 -->
    <van-popup
      v-model:show="Addshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="titleaddt">
        <div class="titleadd">编辑内容</div>
        <van-icon name="cross" class="cross-icon" @click="changeclose" />
      </div>
      <div class="input1" v-if="Addshow">
        <div class="box-value1">
          <van-cell-group inset>
            <van-field
              v-model="value1"
              label="标题："
              placeholder="请输入标题"
            />
          </van-cell-group>
          <span class="length" v-if="value1.length"
            >标题长度：{{ value1.length }}</span
          >
        </div>
        <div class="video">
          <div class="text">网址链接：</div>
          <input
            v-model="link"
            type="text"
            placeholder="网址链接"
            class="input"
          />
        </div>
        <div class="text">文本：</div>
        <textarea
          class="textarea"
          name="text"
          id=""
          v-model="value2"
          placeholder="请输入文本内容"
        ></textarea>
        <!-- 复选框  -->

        <!--  -->
        <van-button type="primary" class="vanbtn" @click="btnAdd"
          >确认</van-button
        >
      </div>
    </van-popup>
    <div class="boxitem">
      <template v-for="(item, index) in homeDate" :key="item.id">
        <div class="item" :style="{ display: guan ? 'flex' : 'block' }">
          <router-link
            :to="{ path: '/detail', query: { id: item.id } }"
            v-if="guan"
            >{{ item.title }}</router-link
          >
          <div v-else @click="changeDelete(item)" class="deletebox">
            <span>{{ item.title }}</span>
            <span class="delete">删除</span>
          </div>
        </div>
      </template>
      <div v-if="homeDate.length <= 0">暂无数据...</div>
      <div v-if="isReach" class="buttom">已经到底了~</div>
    </div>
    <!-- 消息通知 -->
    <van-notify />
    <!-- 提示是否删除内容 -->
    <van-dialog />
    <BackTop @click="changebackTop" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { scrollhooks } from '@/hooks/hooks-scroll'
import useMainStore from '@/stores/modules/main'
import BackTop from '@/components/backTop/back-top.vue'

import { getHomeData, deleteItem, additems } from '@/services'
import { Toast } from 'vant'

import { Notify } from 'vant'
import { Dialog } from 'vant'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
const VanDialog = Dialog.Component
const VanNotify = Notify.Component

const homeDate = ref([])
const value1 = ref('')
const value2 = ref('')
const Addshow = ref(false)
const guan = ref(true)
const link = ref('')
const homeRef = ref()

const isshow = ref(false)

const mainStore = useMainStore()
const { scrollTop, isReach } = scrollhooks(homeRef)
const changebackTop = () => {
  console.log('点击')
  homeRef.value?.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
watch(scrollTop, (newvalue) => {
  console.log(newvalue)
  mainStore.backTop = false
  isshow.value = false
  if (newvalue >= 800) {
    console.log('显示')
    mainStore.backTop = true
  }
  if (newvalue >= 91) {
    isshow.value = true
  }
})
const data = () => {
  getHomeData().then(
    (res) => {
      console.log(res)
      homeDate.value = res
    },
    (err) => {
      alert('请求数据失败')
    }
  )
}
data()
const changeGuan = () => {
  guan.value = !guan.value
}
// 删除
const changeDelete = (item) => {
  console.log(item)
  if (!item) return
  Dialog.confirm({
    title: '是否删除',
    message: `${item.title}`,
    confirmButtonText: '删除'
  })
    .then(() => {
      // on confirm
      // 点击删除键 网络请求删除
      deleteItem(item.id).then(
        (res) => {
          if (res) {
            Notify({ type: 'success', message: '删除成功' })
            data()
          } else {
            Notify({ type: 'warning', message: '删除失败' })
          }
        },
        (err) => {
          alert('删除失败')
        }
      )
    })
    .catch(() => {
      // on cancel
    })
}
// 显示添加页
const changeAdd = () => {
  Addshow.value = !Addshow.value
}
// 添加文本标题
const btnAdd = () => {
  if (value1.value.length <= 0) {
    Toast.fail('请输入标题')
    // Notify({ type: 'warning', message: '请输入标题！！' })
    return
  } else if (value2.value.length <= 0) {
    Toast.fail('请输入文本')
    return
  }
  if (value1.value.length >= 30) {
    Toast.fail('标题过长\n30位以内')
    return
  }
  if (link.value) {
    const http = link.value.indexOf('http://')
    console.log(http, 'http')
    if (
      link.value.indexOf('http://') === -1 &&
      link.value.indexOf('https://') === -1
    ) {
      Toast.fail('必须http:// \n 或https://开头')
      return
    }
  }
  console.log(value1.value, value2.value, link.value)
  additems(value1.value, value2.value, link.value).then(
    (res) => {
      console.log(res, 'add')
      Toast.success('提交成功')
      data()
      setTimeout(() => {
        Addshow.value = !Addshow.value
        value1.value = ''
        value2.value = ''
        link.value = ''
      }, 2000)
    },
    (err) => {}
  )
}
// 关闭添加页面
const changeclose = () => {
  if (value1.value.length > 0 || value2.value.length > 0) {
    Dialog.confirm({
      title: '标题',
      message: '是否退出保存当前编辑？',
      confirmButtonText: '保存'
    })
      .then(() => {
        // on confirm
        Addshow.value = !Addshow.value
      })
      .catch(() => {
        Addshow.value = !Addshow.value
        value1.value = ''
        value2.value = ''
        link.value = ''
        // on cancel
      })
  } else {
    Addshow.value = !Addshow.value
  }
}
</script>

<style lang="less" scoped>
.home {
  overflow-y: scroll;
  height: 100vh;
  .van-cell {
    border-bottom: 1px solid #ccc;
  }
  .fxide {
    position: fixed;
    top: -10px;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 9;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

  .vanbtn {
    width: 60%;
    font-size: 18px;
    border-radius: 20px;
  }
  .title {
    font-size: 30px;
    font-weight: 900;
    margin: 30px 0 30px;
  }
  .checkbox {
    font-size: 20px;
    padding: 10px 10px;
    margin-bottom: 30px;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 30px;
    .add {
      cursor: pointer;
      margin-left: 30px;
      font-size: 20px;
    }
  }
  .buttom {
    text-align: center;
    padding: 20px 0;
    color: rgb(181, 180, 180);
  }
  .titleaddt {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    box-shadow: 0px 10px 5px -12px rgba(0, 0, 0, 0.5);
  }
  .titleadd {
    height: 50px;
    line-height: 50px;
    font-weight: 600;
    font-size: 20px;
  }
  .cross-icon {
    position: absolute;
    right: 15px;
    font-size: 20px;
  }
  .input1 {
    margin-top: 30px;
    text-align: center;
    .box-value1 {
      position: relative;
      .length {
        position: absolute;
        bottom: -15px;
        right: 20px;
        color: #c6c6c6;
        font-size: 10px;
      }
    }
    .input {
      width: 95vw;
      height: 40px;
    }
    .text {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      margin: 20px 0 0 10px;
    }
    .textarea {
      margin: 10px 0;

      width: 95vw;
      height: 45vh;
    }
  }
  .guan {
    cursor: pointer;
    text-align: right;
    margin-right: 30px;
    font-size: 20px;
  }
  .g {
    font-weight: 550;
    color: red;
  }
  .label {
    text-align: left;
  }

  .deletebox {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 50px;
  }
  .boxitem {
    margin-bottom: 85px;
  }
  .item {
    position: relative;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    padding: 10px 0;

    border-bottom: 1px solid #eee;
    a {
      color: rgb(137, 86, 86);
    }
    .delete {
      position: absolute;
      right: 10px;
      bottom: 0;
      margin-left: 20px;
      font-size: 12px;
      background-color: red;
      color: #fff;
      padding: 0px 5px;
      border-radius: 5px;
    }
  }
}
</style>
