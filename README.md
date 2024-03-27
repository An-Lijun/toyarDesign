
# ToyarDesign

<hr>

## 安装

```
    npm i toyar-design
```

## 使用

```JavaScript

//main.js

import toyar from 'toyar-design/dist'
import 'toyar-design/dist/style.css'

createApp(App)
    .use(store)
    .use(toyar)
    .use(router)
    .mount('#app')

```
## 文组件库档 

https://an-lijun.github.io/toyarDesign/index.html
<hr>

以下是代码及配置信息

## 创建

- 脚手架初始化 vue(3.2.41) + VITE(3.2.3) + TS + dart-sass

## 字体图标
    toyarIcon 图标
    cdn资源暂未部署
    
    1.0 目前采用字体图标全量引入方式
    2.0 计划将字体图标改为按需引入方式
    3.0 计划将字体图标改为svg自定义+按需引入方式
## 启动
    vue 3.3.4+ 版本
    node 16.0+ 版本

    npm run dev //启动
    npm run build //package打包

## 文档
    vitePress ^1.0.0-alpha.72

    npm run docs:dev //启动文档
    npm run docs:build //打包文档

    使用markdown-it-container自定义插件（用于文档结构展示）



## vite 配置

### 插件

## 代码

### 结构

仅描述主要文件
```
├── dist （打包后的组件库）
├── distBase 
│   ├── .vitepress (关于vitepress 的配置)
│   ├── assets (静态资源)
│   ├── page (实际的文档位置)
│   ├── public 
│   ├── index.md 
│   └── sidebars.ts (菜单)
├── src (组件)
│   ├── assets (调试用)
│   ├── router (调试用)
│   ├── App.vue (调试用)
│   ├── main.ts (调试用)
│   └── package
│       ├── assets (资源文件)
│       ├── components (组件代码)
│       │   └── button 
│       │       ├── index.ts  暴露入口
│       │       ├── test 测试文件
│       │       └── src 实际代码
│       ├── constant (常量)
│       ├── hooks
│       ├── icon (全量icon)
│       ├── utils (utils只负责结构功能, 而hook负责实际页面的功能提取)
│       └── index.ts 主入口(暴露全局引入 局部引入等)
└── README.md

```
### 组件

组件通常结构
index.ts 使用installComp 暴露组件//注意必须使用defineOptions定义组件名称
src 
    xxx.vue 为组件主要代码
    context.ts 为组件上下文,主要用于接受props 定义emits 依赖注入等
    type.ts 为tsType文件

### 自动生成测试目录路由

```JavaScript
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
```

### css

使用 scss 
include + maxins

css命名使用BEMI命名并抽取useBEMhooks

命名规则如下

.ElementNm // 表示一个块
.ElementNm__element //表示块中的一个元素
.ElementNm-xxx //表示一个后缀
.ElementNm--state //表示块中的一种样式

对于布尔开启状态使用 is-xxx 来表示状态



