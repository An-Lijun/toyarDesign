import {createRouter,createWebHashHistory} from 'vue-router'

import button from '../package/components/button/test/index.vue'
import backTop from '../package/components/backTop/test/index.vue'

const routes =[
  {
    path:'/button',
    name:'button',
    component:button
  },
  {
    path:'/backTop',
    name:'backTop',
    component:backTop
  }
]

const router =createRouter({
  history:createWebHashHistory(),
  routes
})
export default router