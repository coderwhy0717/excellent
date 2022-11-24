import { getHomeData } from "@/services";
import { defineStore } from "pinia";

const useHomeStore = defineStore('home',{
  state:() => ({
    index: 0
  }),
  actions:{
    async getData() {

    }
  }
})
