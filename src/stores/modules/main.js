import { defineStore } from "pinia";

const useMainStore = defineStore('main',{
  state:() => ({
    isloadingShow: false
  })
})

export default useMainStore
