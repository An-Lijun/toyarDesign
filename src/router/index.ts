import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue';
export const routes: Array<RouteRecordRaw> = []
//自动拼接测试路由方法

function pushTradesRouter() {
  //读取@/views/trades/下的所有文件夹并读取以/src/index.vue的文件
  // const files = import.meta.glob('@/package/components/**/test/index.vue');
  const files = import.meta.glob<{ default: Component }>('@/package/components/**/test/index.vue', { eager: false })

  for (const path in files) {
    //读取后截取文件夹名 如 /src/package/components/backTop/src/index.vue
    const segments = path.split('/')

    if (segments.length < 5) continue

    const name = segments[4]
    const tradeItem: RouteRecordRaw = {
      path: `/${name}`,
      name,
      meta: {
        title: name
      },
      component: files[path]
    }
    routes.push(tradeItem)
  }
}
pushTradesRouter();

export default createRouter({
  history: createWebHashHistory(),
  routes
})