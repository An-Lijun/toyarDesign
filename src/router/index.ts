import { createRouter, createWebHashHistory } from 'vue-router'

export const routes = []
//自动拼接测试路由方法

function pushTradesRouter() {
  //读取@/views/trades/下的所有文件夹并读取以/src/index.vue的文件
  const files = import.meta.glob('@/package/components/**/test/index.vue');
  for (let item in files) {
    //读取后截取文件夹名 如 /src/package/components/backTop/src/index.vue
    let name = item.split('/')[4]
    
    // //拼接路由
    let tradeItem = {
      path: '/' + name,
      name: name,
      meta: {
        title: name
      },
      component: () => import(`../package/components/${name}/test/index.vue`), //拼接成测试文件
    }
    routes.push(tradeItem)
  }
}
pushTradesRouter();

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router