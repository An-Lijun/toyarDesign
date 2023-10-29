# Button 按钮
## 基础用法(state)

:::demo  state修改按钮类状态
```html
  <ty-button class="mw-10">默认按钮</ty-button>
  <ty-button state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button state="success" class="mw-10">成功按钮</ty-button>
```
:::


## 按钮类型(type)

:::demo  type修改按钮类型
```html
  <ty-button class="mw-10">默认按钮</ty-button>
  <ty-button state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button state="success" class="mw-10">成功按钮</ty-button>
 <div class="mt-10">
  <ty-button type="secondary" class="mw-10">默认按钮</ty-button>
  <ty-button type="secondary" state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button type="secondary" state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button type="secondary" state="success" class="mw-10">成功按钮</ty-button>
</div>
<div class="mt-10">
  <ty-button type="dashed" class="mw-10">默认按钮</ty-button>
  <ty-button type="dashed" state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button type="dashed" state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button type="dashed" state="success" class="mw-10">成功按钮</ty-button>
</div>
<div class="mt-10">
  <ty-button type="text" class="mw-10">默认按钮</ty-button>
  <ty-button type="text" state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button type="text" state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button type="text" state="success" class="mw-10">成功按钮</ty-button>
</div>
<div class="mt-10">
  <ty-button type="link" class="mw-10">默认按钮</ty-button>
  <ty-button type="link" state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button type="link" state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button type="link" state="success" class="mw-10">成功按钮</ty-button>
</div> 

```
:::




## 按钮禁用(disabled)
:::demo  disabled按钮禁用
```html
  <ty-button disabled class="mw-10">默认按钮</ty-button>
  <ty-button disabled type="secondary" state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button disabled type="dashed" state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button disabled type="text" state="success" class="mw-10">成功按钮</ty-button>
  <ty-button disabled type="link" class="mw-10">默认按钮</ty-button>
```
:::
## 按钮大小(size)

:::demo  size控制按钮大小
```html
  <ty-button size="mini" class="mw-10">默认按钮</ty-button>
  <ty-button  state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button size="medium"  state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button size="large" state="success" class="mw-10">成功按钮</ty-button>
```
:::

## 按钮形状(shape)

:::demo  shape按钮圆角形状
```html
  <ty-button   class="mw-10">   
  默认按钮
  </ty-button>
    <ty-button shape="round"  class="mw-10">   
  默认按钮
  </ty-button>
  <ty-button shape="circle"  class="mw-10">   
    <ty-icon icon="ri-add-fill" color="#fff" />
  </ty-button>
```
:::


## 块级形状(block)

:::demo  block控制按钮是否充满一行
```html
  <ty-button  block>默认按钮</ty-button>
  <ty-button  class="mt-10" shape="round"   block>默认按钮</ty-button>
```
:::


## 属性(Attributes)

| 属性      | 描述    | 类型      | 值       | 默认   |
|----- |----- |----- |----- |-----  |
| state     | 按钮的状态  | string  | primary / success / warning / danger    | primary |
| type      | 按钮的类型  | string  | normal / secondary / dashed / text / link   | normal |
| size      | 按钮的大小  | string  | mini / small / medium / large  | small |
| shape     | 按钮的圆角  | string  | square/round/circle | square |
| disabled  | 按钮是否禁用  | boolean   | false/true | false   |
| block     | 是否是块级按钮  | boolean   | false/true | false   |
| htmlType  | html原生type | string | button / submit / reset | button |

## 插槽(slot)
| 名称      | 描述    |
|----- |----- |
| default | 默认插槽 |

## 变量(cssVariables)

<div class="cssVar">

| 变量名      | 变量值    | 描述 |
|----- |----- |----- |
| --time-1 | 0.1s | 动画时间 |
| --font-weight-5 | 500 | font-weight |
| --border-1 | 1px | border |
| --font-body-3 | 1px | font-size |
| --border-radius-4 | 4px | border-radius |
| --text-0 | -- | normal类型时button字体颜色
| --`state`-6 | -- | state类型时button 常规 背景色边框色
| --`state`-5 | -- | state类型时button hover/focus 背景色边框色
| --`state`-7 | -- | state类型时button active 背景色边框色
| --`state`-3 | -- | state类型时button 禁用 背景色边框色 字体色(normal 字体色用的 --text-0)
| --border-radius-square | 2px | button默认圆角 
| --border-radius-round  | 16px | button 弧形圆角
| --border-radius-circle | 50% | 圆形
| --size-mini | 24px | 组件高度 size为mini
| --size-samll | 28px | 组件高度 size为samll
| --size-medium | 32px | 组件高度 size为medium
| --size-large | 36px | 组件高度 size为large
| --padding-1 | 11px | 组件高度 size为mini
| --padding-3 | 13px | 组件高度 size为samll
| --padding-3 | 13px | 组件高度 size为medium
| --padding-4 | 14px | 组件高度 size为large




</div>





