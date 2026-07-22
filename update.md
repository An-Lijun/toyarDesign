基于对你的 ToyarDesign Vue3 组件库项目的全面分析，我发现了以下需要改进的地方：

## 🔴 高优先级改进
### 1. 缺少单元测试
- 问题 : 项目中没有发现任何 .test.ts 或 .spec.ts 文件
- 影响 : 代码质量无法保证，重构风险高
- 建议 :
  - 集成 Vitest 或 Jest 测试框架
  - 为核心组件编写单元测试
  - 设置测试覆盖率目标（建议 >80%）
### 2. 缺少代码质量工具
- 问题 : 项目中没有 ESLint、Prettier 配置
- 影响 : 代码风格不统一，潜在错误难以发现
- 建议 :
  - 添加 ESLint 配置，推荐使用 @typescript-eslint 和 eslint-plugin-vue
  - 添加 Prettier 进行代码格式化
  - 配置 Husky + lint-staged 进行提交前检查
### 3. 代码中存在调试语句
- 问题 : 发现 35 个文件包含 console.log/warn/error/debug
- 影响 : 生产环境性能影响，可能泄露敏感信息
- 建议 :
  - 清理所有调试用的 console 语句
  - 或者使用 ESLint 规则 no-console 在构建时自动移除
### 4. 缺少开源必备文件
- 问题 : 缺少 LICENSE 和 CHANGELOG.md
- 影响 : 不符合开源项目标准，用户无法了解版本变更
- 建议 :
  - 添加 MIT 或其他开源协议的 LICENSE 文件
  - 使用 conventional-changelog 自动生成 CHANGELOG
## 🟡 中优先级改进
### 5. TypeScript 类型安全问题
- 问题 : tsconfig.json 中 noEmit: true ，但构建时可能存在类型检查遗漏
- 建议 :
  - 在 package.json 中添加 "typecheck": "vue-tsc --noEmit" 脚本
  - 在 CI/CD 中加入类型检查步骤
### 6. 构建配置优化
- 问题 : vite.config.ts 中存在注释掉的代码，配置不够清晰
- 建议 :
  - 清理注释掉的代码
  - 添加更详细的构建注释
  - 考虑添加 build:analyze 脚本进行包体积分析
### 7. 依赖版本管理
- 问题 : package.json 中依赖版本不够精确
- 建议 :
  - 使用 ^ 锁定主版本号
  - 定期运行 npm audit 检查安全漏洞
  - 考虑使用 pnpm 替代 npm 以节省磁盘空间
### 8. 文档改进
- 问题 : README.md 信息不够详细
- 建议 :
  - 添加贡献指南（CONTRIBUTING.md）
  - 添加更多使用示例
  - 补充组件 API 文档
  - 添加常见问题解答（FAQ）
## 🟢 低优先级改进
### 9. 性能优化
- 建议 :
  - 考虑使用虚拟滚动优化长列表组件
  - 添加组件懒加载支持
  - 优化打包体积，分析 bundle 大小
### 10. 开发体验优化
- 建议 :
  - 添加 .editorconfig 统一编辑器配置
  - 配置 VSCode 推荐扩展（.vscode/extensions.json 已存在）
  - 添加 Git hooks 配置
### 11. 国际化支持
- 建议 : 考虑添加 i18n 支持，扩展用户群体
### 12. 无障碍访问
- 建议 :
  - 添加 ARIA 属性支持
  - 确保键盘导航可用
  - 添加屏幕阅读器支持
## 📋 立即行动建议
我建议按以下优先级顺序进行改进：

1. 立即 : 清理 console 调试语句
2. 本周 : 添加 ESLint + Prettier 配置
3. 本月 : 添加单元测试框架和基础测试
4. 下月 : 完善 CI/CD 流程，添加类型检查
需要我帮你实现其中任何一个改进吗？比如我可以帮你：

- 配置 ESLint 和 Prettier
- 添加单元测试框架
- 创建 LICENSE 和 CHANGELOG 文件
- 清理调试代码

5/5 已完成

探索项目结构和配置文件

检查代码质量和架构

总结改进建议

检查测试覆盖率和测试文件

检查文档完整性

Thought

我已经完成了对你的 ToyarDesign 项目的全面分析。这是一个功能丰富的 Vue3 组件库，包含了很多实用的组件，但确实有一些需要改进的地方。

主要发现：

- ✅ 项目结构清晰，组件组织良好
- ✅ 使用了现代化的技术栈（Vue3 + Vite + TypeScript）
- ✅ 有完整的文档系统（VitePress）
- ❌ 缺少单元测试和代码质量工具
- ❌ 存在调试代码需要清理
- ❌ 缺少开源项目的标准文件
你希望我帮你实现哪些改进呢？我可以帮你：

1. 配置 ESLint 和 Prettier
2. 添加单元测试框架
3. 清理调试代码
4. 创建 LICENSE 和 CHANGELOG
5. 或者其他你关心的改进点

如果你觉得当前的测试价值不大，可以考虑：

1. 优先测试核心业务逻辑 ：比如 Form 验证、Table 排序等
2. 使用 Storybook 做可视化测试 ：更直观地展示组件状态
3. 添加 E2E 测试 ：测试完整的用户操作流程
4. 代码审查 + 手动测试 ：对于小型项目，可能更实用
你觉得哪种方式更适合你的项目？ 我可以帮你实现更有价值的测试方案。




1. 脚本层优化
消除冗余代码：删除重复导入、合并重复逻辑
统一类名计算：使用一个 computed 管理所有类，减少渲染开销
类型安全：消除隐式 any，规范注入类型
语义化变量：loading 单独抽离，可读性更强
修复 link 按钮原生 type 错误：link 类型按钮自动使用 type="button" 避免表单提交
2. 样式层 SCSS 优化
删除无效语法：修复 map 错误、多余分号、重复变量
合并重复样式：hover/active 统一简写
规范关键词：no-drop → not-allowed（标准光标）
精简选择器：删除冗余嵌套，提升 CSS 解析性能
统一变量：unset → transparent/none 更标准
动画优化：加载样式居中逻辑简化
3. 模板层优化
v-if 替代 v-show：加载图标不渲染比隐藏性能更好
简化类绑定：删除冗余动态类，直接使用静态类名
结构更清晰：增加注释，便于维护

---



















# Toyar Design 组件库架构分析报告

## 一、项目概览

**项目定位**：Vue 3 企业级 UI 组件库，包含 60+ 组件，采用 Vite 构建，VitePress 文档，支持明暗主题切换。

**核心技术栈**：
- Vue 3 + TypeScript
- Vite 6 + Vitest 4
- SCSS (Sass) + CSS Variables
- VitePress 文档

---

## 二、当前架构评估

### 2.1 组件架构模式

项目采用 **Headless Hooks 架构模式**，组件结构如下：

```
component/
├── index.ts           # 导出组件和 hooks
├── src/
│   ├── context.ts     # Props/Emits/NM 配置
│   ├── type.ts        # TypeScript 类型定义
│   ├── use-xxx.ts     # 核心逻辑 Hook
│   └── xxx.vue        # 模板组件
└── test/              # 测试文件
```

**优点**：
- 逻辑与视图分离，易于测试和复用
- Hooks 可独立导出用于 Headless 组件开发（如 `useTyAffix`）
- BEM 命名空间统一管理（`useNmSpace`）

**问题**：**一致性不足**。部分组件未遵循此模式：

| 组件 | 缺失文件 |
|------|---------|
| alert | use-alert.ts, type.ts |
| badge | use-badge.ts, type.ts |
| card | use-card.ts, type.ts |
| divider | use-divider.ts, type.ts |
| dialog | use-dialog.ts, type.ts |

### 2.2 Token 系统架构

项目采用 **SCSS + JS 双轨制 Token 系统**：

```
src/package/assets/tokens/_tokens.scss    # SCSS 变量定义
src/package/tokens/defaultTokens.js       # JS 默认值导出
```

**优点**：
- SCSS 变量支持 `!default` 覆盖机制
- JS Token 支持运行时主题切换
- 颜色系统包含 10 个色阶，支持语义映射

**严重问题**：**双重数据源**。`_tokens.scss` 和 `defaultTokens.js` 是手动同步的副本，存在以下风险：
- 维护成本高，修改一处需同步另一处
- 容易出现不一致（如 `opacityDark` 在 JS 中基于白色，SCSS 中基于深色背景）
- 无法确保设计决策的一致性

### 2.3 样式架构

```
src/package/assets/
├── tokens/_tokens.scss    # 设计 Token
├── base.scss              # 基础样式
├── light.scss             # 浅色主题变量映射
├── dark.scss              # 深色主题变量映射
├── index.scss             # 入口（全局 + 组件样式）
└── components/            # 各组件 SCSS
```

**优点**：
- 使用 CSS Variables 实现运行时主题切换
- 主题隔离通过 `html[toyar-theme='light']` 选择器
- BEM 命名规范统一

**问题**：组件样式在 `index.scss` 中手动引入，无自动扫描机制。

### 2.4 构建与发布架构

```
scripts/build-component.js    # 单组件打包脚本
package.json
├── build              # 全量打包
├── build:component    # 单组件打包
└── pub                # 发布流程
```

**问题**：
- `build-component.js` 引用的 `vite.component.config.ts` 文件不存在
- 全量打包无 Tree-shaking 支持
- `index.ts` 使用手动 `app.use()` 链式调用，无法按需加载

### 2.5 第三方依赖管理

**严重问题**：`src/package/color/` 目录直接包含第三方包源码（`color-convert`、`color-name`、`simple-swizzle`），而非通过 npm 依赖管理。

```
src/package/color/
├── color/index.js           # 第三方代码
├── color-convert/           # 第三方代码
├── color-name/              # 第三方代码
├── color-string/            # 第三方代码
├── computed/                # 第三方代码
├── simple-swizzle/          # 第三方代码
└── utils/                   # 第三方代码
```

**风险**：
- 无法获取安全更新
- 无法享受 npm 生态的版本管理
- 增加仓库体积和维护负担

---

## 三、代码级问题

### 3.1 `changeTheme.ts` 运算符优先级 Bug

```typescript
// 当前代码（有问题）
nowTheme.value = theme || html.getAttribute('toyar-theme')==='light'?'dark':'light'
```

**问题**：逻辑运算符优先级错误。`||` 的优先级高于 `?:`，导致表达式被解析为：

```typescript
nowTheme.value = (theme || html.getAttribute('toyar-theme')==='light') ? 'dark' : 'light'
```

**预期行为**应为：

```typescript
nowTheme.value = theme || (html.getAttribute('toyar-theme')==='light' ? 'dark' : 'light')
```

### 3.2 `useCompMvalue` 缺少类型定义

```typescript
// 当前代码
export const useCompMvalue= (props,emitFn,options={})=>{...}
```

缺少泛型类型，无法提供类型推断。

### 3.3 `defaultTokens.js` 与 `_tokens.scss` 不一致

- `_tokens.scss` 中的 `$toyar-opacity-dark` 基于 `rgba(23, 23, 26, 0.x)`
- `defaultTokens.js` 中的 `opacityDark` 基于 `rgba(255, 255, 255, 0.x)`

---

## 四、架构优化建议

### 4.1 Token 系统单源化

**方案**：创建 JSON/YAML 作为单一数据源，通过构建脚本生成 SCSS 和 JS。

```
tokens/
├── tokens.json          # 单一数据源
├── generate-scss.js     # 生成 SCSS 变量
└── generate-js.js       # 生成 JS 导出
```

**优势**：
- 消除双重维护成本
- 确保设计决策一致性
- 支持自动生成 CSS Variables

### 4.2 构建优化

**方案一**：使用 `unplugin-vue-components` 实现自动按需导入

**方案二**：采用 Monorepo 结构，支持独立组件发布

```
packages/
├── toyar-design         # 主包（导出所有组件）
├── ty-button            # 独立组件包
├── ty-input             # 独立组件包
└── ty-common            # 公共工具包
```

**方案三**：添加 `exports` 字段支持 Tree-shaking

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./button": "./dist/components/button/index.js",
    "./input": "./dist/components/input/index.js"
  }
}
```

### 4.3 组件架构规范化

**强制执行**：所有组件必须包含完整的文件结构：
- `context.ts` — Props/Emits/NM
- `type.ts` — TypeScript 类型
- `use-xxx.ts` — 核心逻辑 Hook
- `xxx.vue` — 模板组件

### 4.4 第三方依赖清理

将 `src/package/color/` 下的第三方代码替换为 npm 依赖：

```bash
npm install color-convert color-name simple-swizzle --save
```

---

## 五、AI 集成优化建议

### 5.1 组件元数据自动生成（Tier 1）

**目标**：为 AI 工具提供机器可读的组件描述。

**方案**：构建时自动生成 `component-manifest.json`，包含：
- Props 类型定义
- Emits 事件签名
- Slots 描述
- 组件分类和标签

**实现**：创建 Vite 插件扫描 `context.ts` 文件，提取组件元数据。

```json
// component-manifest.json 示例
{
  "TyButton": {
    "category": "base",
    "props": {
      "type": { "type": "string", "values": ["primary", "success", "warning", "danger"] },
      "size": { "type": "string", "values": ["mini", "small", "medium", "large"] },
      "disabled": { "type": "boolean", "default": false }
    },
    "emits": { "click": ["MouseEvent"] },
    "slots": ["default"]
  }
}
```

### 5.2 AI 开发工具链（Tier 2）

**方案一**：创建 MCP 服务器

```typescript
// mcp-server.ts
export const getComponentSchema = async (componentName: string) => {
  const manifest = await import('./component-manifest.json')
  return manifest[componentName]
}

export const generateComponentCode = async (props: {
  component: string
  props: Record<string, any>
}) => {
  // 使用 AI API 生成代码
}
```

**方案二**：创建 CLI 工具

```bash
# 生成组件代码
npx toyar-cli generate --component Button --props "{type:'primary',size:'medium'}"

# 检查组件使用正确性
npx toyar-cli lint --file src/App.vue
```

### 5.3 AI 增强文档与 Playground（Tier 3）

**方案一**：AI 代码生成器

在文档站点添加组件代码生成器，用户输入自然语言描述，AI 生成组件代码：

```
用户输入: "创建一个蓝色的主要按钮，点击后显示消息提示"
AI 输出: 
<TyButton type="primary" @click="showMessage">
  点击我
</TyButton>
```

**方案二**：智能主题推荐

基于设计 Token 系统，AI 根据场景推荐合适的颜色组合和主题配置。

**方案三**：组件智能搜索

支持自然语言搜索组件，如 "我需要一个可以选择日期的输入框" → 返回 `TyDatePicker`。

### 5.4 AI 辅助测试生成

**方案**：基于组件元数据自动生成测试用例

```typescript
// 自动生成的测试
describe('TyButton', () => {
  it('should render with primary type', () => {
    const wrapper = mount(TyButton, { props: { type: 'primary' } })
    expect(wrapper.classes()).toContain('ty-button--primary')
  })
  
  it('should emit click event', () => {
    const wrapper = mount(TyButton)
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

---

## 六、总结

### 当前架构评分

| 维度 | 评分 | 说明 |
|------|------|------|
| 组件架构 | **8/10** | Hooks 模式优秀，一致性不足 |
| Token 系统 | **6/10** | 设计合理，双重数据源是隐患 |
| 样式架构 | **7/10** | BEM + CSS Variables 良好 |
| 构建发布 | **5/10** | 缺少 Tree-shaking，单组件打包配置缺失 |
| 代码质量 | **7/10** | 类型定义不全，存在运算符优先级 Bug |

### 优先改进项

1. **修复 `changeTheme.ts` 运算符优先级 Bug**
2. **Token 系统单源化**（消除双重维护）
3. **清理第三方源码依赖**（改用 npm 包）
4. **添加 Tree-shaking 支持**（`exports` 字段或 Monorepo）
5. **组件架构规范化**（补全缺失的 hooks 和类型文件）

### AI 集成路线图

```
Phase 1（基础）: 组件元数据自动生成 → component-manifest.json
Phase 2（工具）: MCP 服务器 + CLI 工具 → AI 代码生成
Phase 3（体验）: AI 增强文档 → 智能搜索 + 代码生成器 + 主题推荐
Phase 4（质量）: AI 辅助测试 → 自动生成测试用例
```

---

## 七、shadcn 模式与 npm 包模式的权衡与最优方案

### 7.1 核心矛盾

shadcn 的「源码复制到项目」模式对 AI 更友好，但存在**源码控制权与版本更新之间的冲突**：
- 修改本地源码后，遇到组件库版本更新会产生冲突
- 无法享受 npm 包的自动更新和安全修复

### 7.2 关键洞察

**AI 友好性和源码分发模式是两个独立维度**，我们完全可以在保持 npm 包模式的同时获得 AI 友好性。

### 7.3 四种方案对比

| 方案 | 核心思路 | AI 友好性 | 版本更新 | 定制自由度 | 适用场景 |
|------|---------|----------|---------|-----------|---------|
| **方案一：元数据驱动** | npm 包 + 构建时生成 `component-manifest.json`，AI 消费元数据而非源码 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 推荐首选 |
| **方案二：分层定制** | 核心层(npm包) + 定制层(wrapper组件/配置)，定制在定制层完成 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 中后台定制需求 |
| **方案三：Token 驱动** | 通过 Design Token 满足 90% 定制需求，避免修改源码 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | 主题/样式定制为主 |
| **方案四：可选 Eject** | 默认 npm 包，提供 `eject` 命令提取指定组件源码到本地 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 深度定制场景兜底 |

### 7.4 方案一：元数据驱动（推荐）

**核心思路**：保持组件以 npm 包形式分发，但在构建时自动生成机器可读的元数据文件。AI 工具通过消费这个元数据来理解和生成组件代码，而不是直接读取源码。

```
┌─────────────────────────────────────────────────────────┐
│                    npm 包模式（不变）                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ TyButton │  │ TyInput  │  │ TyDialog │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│           构建时自动生成 component-manifest.json          │
│  {                                                       │
│    "TyButton": {                                         │
│      "props": { "type": "string", "values": [...] },     │
│      "emits": { "click": ["MouseEvent"] },               │
│      "slots": ["default"],                               │
│      "examples": [...]                                   │
│    }, ...                                                │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      AI 工具消费                          │
│  MCP Server / CLI / IDE Plugin / AI Agent               │
│  → 理解组件能力 → 生成代码 → 验证配置                     │
└─────────────────────────────────────────────────────────┘
```

**优势**：
- 完全保留 npm 包的版本更新能力
- AI 通过元数据理解组件，无需访问源码
- 元数据在构建时自动生成，零维护成本
- 已有成熟方案：`genui-renderer-shadcn` 就是这个思路的实例

### 7.5 方案二：分层定制架构

**核心思路**：将组件分为两层，用户的定制只发生在定制层。

```
┌────────────────────────────────────┐
│         定制层（项目内）            │
│  ┌──────────────────────────────┐  │
│  │  MyButton.vue                │  │
│  │  - 包裹 TyButton             │  │
│  │  - 添加项目特有逻辑          │  │
│  │  - 覆盖特定样式              │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  toyar.config.ts             │  │
│  │  - 全局配置（主题、尺寸等）   │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
                  │ 依赖
                  ▼
┌────────────────────────────────────┐
│         核心层（npm 包）           │
│  ┌──────────────────────────────┐  │
│  │  TyButton.vue               │  │
│  │  - 基础功能                  │  │
│  │  - 标准 API                 │  │
│  │  - 持续更新                  │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

**优势**：
- 核心层跟随版本更新，无冲突
- 定制层完全可控，不影响核心
- 适合中后台系统的定制需求

### 7.6 方案三：Token 驱动定制

**核心思路**：将 90% 的定制需求通过 Design Token 满足，避免修改组件源码。

```typescript
// toyar.config.ts
export default {
  tokens: {
    color: {
      primary: '#165DFF',
      success: '#00B42A',
    },
    size: {
      button: {
        small: '24px',
        medium: '32px',
        large: '40px',
      },
    },
    radius: {
      button: '8px',
    },
  },
}
```

**优势**：
- 零源码修改，完全避免版本冲突
- 通过 ConfigProvider 动态注入，支持运行时切换
- 适合主题、样式类的定制需求

### 7.7 方案四：可选 Eject 机制

**核心思路**：默认 npm 包模式，对确实需要深度定制的组件提供 `eject` 命令。

```bash
# 默认：npm 包模式
npm install toyar-design

# 需要深度定制某个组件时
npx toyar-cli eject button
# → 将 TyButton 源码提取到 src/components/toyar/button/

# 其余组件仍走 npm 包，不受影响
```

**优势**：
- 默认保持 npm 更新能力
- 仅对需要深度定制的组件提取源码
- 最小化源码冲突面

### 7.8 推荐组合方案

对于 toyarDesign，建议采用**方案一 + 方案三**的组合：

```
┌─────────────────────────────────────────────────────────────┐
│                    推荐架构                                  │
│                                                             │
│  ┌──────────────────┐                                       │
│  │  npm 包模式      │ ← 核心组件，持续更新                   │
│  │  (不变)          │                                       │
│  └────────┬─────────┘                                       │
│           │                                                 │
│           ├──→ 方案三: Token 驱动定制                        │
│           │    覆盖 90% 的主题/样式需求                      │
│           │                                                 │
│           └──→ 方案一: 元数据驱动 AI                         │
│                构建时生成 component-manifest.json           │
│                AI 通过元数据理解和生成组件代码               │
│                                                             │
│  ┌──────────────────┐                                       │
│  │  方案四: 可选    │ ← 仅在极少数深度定制场景使用           │
│  │  Eject 机制      │                                       │
│  └──────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

**为什么这个组合最适合 toyarDesign？**

1. **成本最低**：在现有架构上增量改造，无需推翻现有模式
2. **收益最大**：立即获得 AI 友好性，同时保留 npm 包的所有优势
3. **风险可控**：源码修改被限制在最小范围，版本更新无冲突

### 7.9 最终对比

| 维度 | 传统 npm 包 | shadcn 源码模式 | 推荐组合方案 |
|------|------------|----------------|-------------|
| AI 友好性 | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 版本更新 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| 定制自由度 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 维护成本 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |

**核心结论**：AI 友好性 ≠ 源码分发。通过元数据驱动，我们可以在保持 npm 包模式的同时，获得与 shadcn 相当的 AI 友好性，同时避免版本更新冲突问题。

---
## 一、生成的文件
### 1. 元数据自动生成脚本
generate-metadata.js

功能 ：自动解析 context.ts 文件，提取 props、emits、slots 等信息，生成组件元数据。

使用方式 ：

```
# 生成单个组件元数据
node scripts/generate-metadata.js affix

# 生成所有组件的 component-manifest.json
node scripts/generate-metadata.js
```
### 2. Vite 构建插件
vite-plugin-manifest.js

功能 ：构建时自动生成 component-manifest.json 。

### 3. Affix 组件示例元数据
metadata.json

## 二、自动生成的元数据示例
## 三、工作流程
## 四、元数据字段说明
字段 来源 是否自动生成 说明 id 目录名 ✅ 自动 组件唯一标识 name defineOptions ✅ 自动 组件名称 props context.ts ✅ 自动 属性定义（type/default/required） emits context.ts ✅ 自动 事件定义（params） slots xxx.vue ✅ 自动 插槽列表 category 手动 ❌ 手动 组件分类（base/form/show/feedback等） description 手动 ❌ 手动 组件描述 examples 手动 ❌ 手动 使用示例代码 capabilities 手动 ❌ 手动 能力标签 useCases 手动 ❌ 手动 使用场景