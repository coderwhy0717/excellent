import { defineStore } from "pinia";

const useMainStore = defineStore('main',{
  state:() => ({
    isloadingShow: false,
    backTop: false
  })
})

export default useMainStore
