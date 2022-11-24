import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:() => import('@/views/home/home.vue')
    },
    {
      path:'/detail',
      component:() => import('@/views/detail/detail.vue')
    }
  ]
})

export default router
