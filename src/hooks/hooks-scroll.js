import { onMounted, onUnmounted, ref } from "vue"

export function scrollhooks(obj) {
  let el = window
  const isReach = ref(false)
  const scrollTop = ref(0)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)
  const fn = () => {
    if(el === window)  {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = Math.floor(document.documentElement.scrollTop)
      scrollHeight.value = document.documentElement.scrollHeight
    }else {
      clientHeight.value = el.clientHeight
      // scrollTop.value = Math.ceil(el.scrollTop)
      scrollTop.value = Math.round(el.scrollTop)//四舍五入
      // scrollTop.value = Math.floor(el.scrollTop)
      // scrollTop.value = parseInt(el.scrollTop)
      // console.dir(el)
      scrollHeight.value = el.scrollHeight
    }
    // if (clientHeight.value + scrollTop.value < scrollHeight.value) {
    //   // isReach.value = false
    // }
    console.log(clientHeight.value, scrollTop.value, scrollHeight.value)
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      isReach.value = true
    }
  }
  onMounted(() => {
    if(obj) el = obj.value

    el.addEventListener('scroll',fn)
  })
  onUnmounted(() => {
    el.removeEventListener('scroll',fn)

  })
  return {
    isReach,
    scrollTop,
    scrollHeight,
    clientHeight
  }
}
