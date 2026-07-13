#  Website MD 转 Vue 流程详解

本文档详细介绍 HUI 官网项目如何将 Markdown 中的 Demo 代码块转换为可运行的 Vue 组件。

---

## 一、整体架构

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              MD 转 Vue 完整流程                                   │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   编写 MD    │────▶│  VuePress    │────▶│  自定义插件   │────▶│  生成 Vue    │
│   文档文件   │     │   构建流程    │     │ vue-plugin-code│    │   页面       │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │                    │
       ▼                    ▼                    ▼                    ▼
   :::demo 语法        解析 Markdown      提取代码块内容        渲染可交互
   定义组件示例        识别容器块          编译为 Vue 组件        的 Demo
```

---

## 二、核心处理流程

### 时序图

```
┌─────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────┐
│  开发者  │    │  Markdown   │    │   Plugin     │    │   Render    │    │  Browser │
│         │    │   文件      │    │  (插件系统)   │    │   Engine    │    │          │
└────┬────┘    └──────┬──────┘    └──────┬───────┘    └──────┬──────┘    └────┬─────┘
     │                │                  │                   │               │
     │  1.编写 MD      │                  │                   │               │
     │  :::demo 代码   │                  │                   │               │
     │────────────────▶│                  │                   │               │
     │                │                  │                   │               │
     │                │  2.解析 :::demo   │                   │               │
     │                │  容器语法         │                   │               │
     │                │─────────────────▶│                   │               │
     │                │                  │                   │               │
     │                │                  │  3.提取 HTML/     │               │
     │                │                  │  Script/Style     │               │
     │                │                  │──────────────────▶│               │
     │                │                  │                   │               │
     │                │                  │                   │ 4.编译模板     │
     │                │                  │                   │   生成 render  │
     │                │                  │                   │   函数         │
     │                │                  │                   │────┬──────────┘
     │                │                  │                   │    │
     │                │                  │ 5.返回组件代码     │    │
     │                │                  │◀──────────────────│    │
     │                │                  │                   │    │
     │                │ 6.包裹为          │                   │    │
     │                │   demo-block      │                   │    │
     │                │◀─────────────────│                   │    │
     │                │                  │                   │    │
     │                │                  │                   │    │ 7.浏览器
     │                │                  │                   │    │   渲染执行
     │                │                  │                   │◀───┘
     │                │                  │                   │
     │                │  8.展示可交互     │                   │
     │                │    Demo 组件      │                   │
     │◀───────────────│◀─────────────────│◀──────────────────┘
```

---

## 三、核心模块说明

### 1. 插件入口 (`vue-plugin-code/index.js`)

插件主入口，负责注册容器解析和 Markdown 扩展：

```javascript
const path = require('path');
const renderDemoBlock = require('./common/render');
const demoBlockContainers = require('./common/containers');

module.exports = (options = {}, ctx) => {
  return {
    define: {
      PLUGIN_OPTIONS: options // 将插件配置项注入到全局
    },
    enhanceAppFiles: path.resolve(__dirname, './enhanceAppFile.js'),
    chainMarkdown(config) {
      config.plugin('containers').use(demoBlockContainers(options)).end();
    },
    extendMarkdown: (md) => {
      const id = setInterval(() => {
        const render = md.render;
        if (typeof render.call(md, '') === 'object') {
          md.render = (...args) => {
            let result = render.call(md, ...args);
            const { template, script, style } = renderDemoBlock(result.html);
            result.html = template;
            result.dataBlockString = `${script}\n${style}\n${result.dataBlockString}`;
            return result;
          };
          clearInterval(id);
        }
      }, 10);
    }
  };
};
```

**关键功能：**
- `define`: 将插件配置注入全局，供组件使用
- `enhanceAppFiles`: 注册 DemoBlock 组件
- `chainMarkdown`: 注册 `:::demo` 容器解析器
- `extendMarkdown`: 扩展渲染逻辑，处理 `pre-render-demo` 标记

---

### 2. 容器定义 (`vue-plugin-code/common/containers.js`)

定义 `:::demo` 语法规则，使用 `markdown-it-container` 插件：

```javascript
const mdContainer = require('markdown-it-container');

module.exports = (options) => {
  const { component = 'demo-block' } = options;
  const componentName = component
    .replace(/^\S/, (s) => s.toLowerCase())
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase();
  
  return (md) => {
    md.use(mdContainer, 'demo', {
      validate(params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },
      render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          const description = m && m.length > 1 ? m[1] : '';
          const content =
            tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
          const encodeOptionsStr = encodeURI(JSON.stringify(options));
          
          return `<${componentName} :options="JSON.parse(decodeURI('${encodeOptionsStr}'))">
            <template slot="demo"><!--pre-render-demo:${content}:pre-render-demo--></template>
            ${description ? `<div slot="description">${md.render(description).html}</div>` : ''}
            <template slot="source">
          `;
        }
        return `</template></${componentName}>`;
      }
    });
  };
};
```

**关键功能：**
- `validate`: 验证 `:::demo` 语法
- `render`: 将 demo 代码块包装为 `demo-block` 组件
- 使用 `pre-render-demo` 标记包裹代码内容，供后续处理

---

### 3. 代码渲染器 (`vue-plugin-code/common/render.js`)

核心转换逻辑，提取并组装 Vue 组件：

```javascript
const {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText
} = require('./util.js');

module.exports = function (content) {
  if (!content) {
    return content;
  }
  
  const startTag = '<!--pre-render-demo:';
  const startTagLen = startTag.length;
  const endTag = ':pre-render-demo-->';
  const endTagLen = endTag.length;

  let componenetsString = ''; // 组件引用代码
  let templateArr = []; // 模板输出内容
  let styleArr = []; // 样式输出内容
  let id = 0; // demo 的 id
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);

  while (commentStart !== -1 && commentEnd !== -1) {
    templateArr.push(content.slice(start, commentStart));
    
    const commentContent = content.slice(
      commentStart + startTagLen,
      commentEnd
    );
    
    // 分离 HTML/Script/Style
    const html = stripTemplate(commentContent);
    const script = stripScript(commentContent);
    const style = stripStyle(commentContent);
    
    // 生成内联组件
    const demoComponentContent = genInlineComponentText(html, script);
    const demoComponentName = `render-demo-${id}`;
    
    templateArr.push(`<template><${demoComponentName} /></template>`);
    styleArr.push(style);
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;
    
    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 组装页面脚本
  let pageScript = '';
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  }

  // 合并 style 内容
  let styleString = '';
  if (styleArr && styleArr.length > 0) {
    styleString = `<style>${styleArr.join('')}</style>`;
  } else {
    styleString = `<style></style>`;
  }

  templateArr.push(content.slice(start));
  
  return {
    template: templateArr.join(''),
    script: pageScript,
    style: styleString
  };
};
```

**关键功能：**
- 查找 `pre-render-demo` 标记定位代码块
- 调用 `stripTemplate/stripScript/stripStyle` 分离代码
- 调用 `genInlineComponentText` 编译为 Vue 组件
- 组装最终的 template/script/style

---

### 4. 组件编译工具 (`vue-plugin-code/common/util.js`)

使用 Vue 官方编译器将模板编译为 render 函数：

```javascript
const { compileTemplate } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');

// 提取 script 内容
function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

// 提取 style 内容
function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

// 提取 template 内容（剔除 script 和 style）
function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

// 生成内联组件文本
function genInlineComponentText(template, script) {
  const finalOptions = {
    source: `<div>${template}</div>`,
    filename: 'inline-component',
    compiler
  };
  
  const compiled = compileTemplate(finalOptions);
  
  // 处理编译提示和错误
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach((tip) => {
      console.warn(tip);
    });
  }
  
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
        compiled.errors.map((e) => `  - ${e}`).join('\n') +
        '\n'
    );
  }

  // 处理 script
  script = script.trim();
  if (script) {
    script = script.replace(/export\s+default/, 'const democomponentExport =');
  } else {
    script = 'const democomponentExport = {}';
  }

  // 包装为 IIFE 返回组件对象
  return `(function() {
    ${compiled.code}
    ${script}
    return {
      render,
      staticRenderFns,
      ...democomponentExport
    }
  })()`;
}

module.exports = {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText
};
```

**关键功能：**
- `stripScript/stripStyle/stripTemplate`: 分离代码各部分
- `compileTemplate`: 使用 Vue 编译器生成 render 函数
- `genInlineComponentText`: 包装为立即执行函数(IIFE)返回组件对象

---

### 5. Demo 展示组件 (`vue-plugin-code/DemoBlock.vue`)

`DemoBlock.vue` 是展示 Demo 的容器组件，提供以下功能：

```vue
<template>
  <ClientOnly>
    <div
      class="demo-block"
      :class="[blockClass, { hover: hovering }]"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <!-- 演示区域 -->
      <div class="demo-content">
        <slot name="demo"></slot>
      </div>
      
      <!-- 代码和描述区域 -->
      <div class="meta" ref="meta">
        <div class="description" v-if="$slots.description">
          <slot name="description"></slot>
        </div>
        <div class="code-content">
          <slot name="source"></slot>
        </div>
      </div>
      
      <!-- 控制栏 -->
      <div
        class="demo-block-control"
        :class="{ 'is-fixed': fixedControl }"
        @click="isExpanded = !isExpanded"
      >
        <i :class="[iconClass, { hovering: hovering }, 'icon']"></i>
        <span v-show="hovering">{{ controlText }}</span>
        <span class="code-playground" @click.stop="clickPlayGround">
          {{ this.langConfig['playground'] }}
        </span>
        <span :class="['copy-action', { 'copying ': copied }]" @click.stop="copyCode">
          {{ copiedText }}
        </span>
      </div>
    </div>
  </ClientOnly>
</template>
```

**功能特性：**
- **演示区域**: 展示实际运行的组件
- **描述区域**: 显示 demo 的文字说明
- **代码区域**: 显示源代码，可展开/收起
- **控制栏**: 提供展开/收起、复制代码、在演练场打开等功能

---

## 四、数据转换流程

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Markdown 源码示例                                     │
└─────────────────────────────────────────────────────────────────────────────┘

:::demo 按钮类型说明
```html
<template>
  <h-button type="primary">Primary</h-button>
</template>
<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
<style>
.h-btn { margin: 10px; }
</style>
```
:::

                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Step 1: 容器解析 (containers.js)                         │
└─────────────────────────────────────────────────────────────────────────────┘

<demo-block :options="...">
  <template slot="demo">
    <!--pre-render-demo:
      <template>
        <h-button type="primary">Primary</h-button>
      </template>
      <script>...</script>
      <style>...</style>
    :pre-render-demo-->
  </template>
  <div slot="description">按钮类型说明</div>
  <template slot="source">
    <!-- 源代码展示 -->
  </template>
</demo-block>

                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Step 2: 代码提取 (render.js)                             │
└─────────────────────────────────────────────────────────────────────────────┘

提取标记内容:
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Template  │  │   Script    │  │    Style    │
│  h-button   │  │  export     │  │   .h-btn    │
│  组件结构   │  │  default    │  │   样式定义   │
└─────────────┘  └─────────────┘  └─────────────┘

                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Step 3: 模板编译 (util.js)                               │
└─────────────────────────────────────────────────────────────────────────────┘

Vue Template Compiler:
┌─────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│  Template   │─────▶│   compileTemplate   │─────▶│    Render Function  │
│   HTML      │      │   (vue-template-    │      │   (可执行的渲染函数)  │
│             │      │    compiler)        │      │                     │
└─────────────┘      └─────────────────────┘      └─────────────────────┘

                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Step 4: 组件组装 (render.js)                             │
└─────────────────────────────────────────────────────────────────────────────┘

生成的 Vue 组件代码:
<script>
export default {
  name: 'component-doc',
  components: {
    "render-demo-0": (function() {
      // render 函数 (由模板编译生成)
      function render() { ... }
      var staticRenderFns = [...]
      
      // script 逻辑
      const democomponentExport = {
        data() { return { count: 0 } }
      }
      
      return {
        render,
        staticRenderFns,
        ...democomponentExport
      }
    })()
  }
}
</script>
<style>.h-btn { margin: 10px; }</style>

                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Step 5: 页面渲染 (DemoBlock.vue)                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        DemoBlock 组件结构                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    演示区域 (demo slot)                  │   │
│  │              <render-demo-0 />  ← 实际运行的组件          │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  描述区域 (description slot)                             │   │
│  │              按钮类型说明                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  源代码区域 (source slot)                                │   │
│  │              HTML 源代码展示                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  控制栏：显示/隐藏代码 │ 复制 │ 在演练场打开              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 五、文件结构

```
src/.vuepress/
├── plugins/
│   └── vue-plugin-code/           # MD转Vue核心插件
│       ├── index.js               # 插件入口，注册容器和扩展
│       ├── enhanceAppFile.js      # 注册 DemoBlock 组件
│       ├── DemoBlock.vue          # Demo展示容器组件
│       └── common/
│           ├── containers.js      # :::demo 容器定义
│           ├── render.js          # 代码提取与组装
│           ├── util.js            # 模板编译工具
│           └── fence.js           # 代码块渲染覆盖
│
├── config.js                      # VuePress 主配置
├── enhanceApp.js                  # 应用增强入口
│
└── theme/                         # 自定义主题
    └── layouts/
        └── NavLayout.vue          # 导航布局组件

src/component/
├── button.md                      # 组件文档（使用 :::demo 语法）
├── input.md
└── ...
```

---

## 六、关键技术点

| 技术点 | 说明 |
|--------|------|
| **markdown-it-container** | 用于解析 `:::demo` 自定义容器语法 |
| **vue-template-compiler** | 将 HTML 模板编译为 Vue render 函数 |
| **@vue/component-compiler-utils** | Vue 组件编译工具集 |
| **pre-render-demo 标记** | 用于定位需要转换的代码块 |
| **IIFE 包装** | 将代码包装为立即执行函数返回组件对象 |
| **slot 分发** | 使用 Vue slot 机制组织演示/描述/源码区域 |

---

## 七、使用示例

开发者在编写组件文档时，只需使用简单的语法：

```markdown
### 按钮类型

:::demo 这是按钮的描述说明
```html
<template>
  <h-button type="primary">主要按钮</h-button>
</template>
<script>
export default {
  data() {
    return { msg: 'Hello' }
  }
}
</script>
```
:::
```

系统会自动将其转换为可交互的 Vue 组件演示区块。

---

## 八、配置说明

在 `config.js` 中配置插件：

```javascript
plugins: [
  [
    require('./plugins/vue-plugin-code'),
    {
      codePlayground: 'http://hui.hundsun.com/components-playground', // 演练场地址
      HUIVERSION: '1.70.2' // HUI组件版本
    }
  ]
]
```

---

## 九、注意事项

1. **模板必须有根元素**: 编译时会自动包裹 `<div>`，但建议开发者自己提供清晰的根元素
2. **Script 导出格式**: 支持 `export default` 语法，会被自动替换为 `const democomponentExport`
3. **样式隔离**: Style 内容会统一收集到页面级别，注意选择器命名避免冲突
4. **多 Demo 支持**: 一个 MD 文件可以包含多个 `:::demo` 块，每个会生成独立的组件