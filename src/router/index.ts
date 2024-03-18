import {createRouter,createWebHashHistory} from 'vue-router'

import button from '../package/components/button/test/index.vue'
const routes =[{
  path:'/button',
  name:'button',
  component:button
}]

const router =createRouter({
  history:createWebHashHistory(),
  routes
})
export default router