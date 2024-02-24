# Row 栅格行

## 基础用法
:::demo  state修改按钮类状态
```html
  <ty-row :gutter="16">
    <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
    <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
     <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
  </ty-row>

   <ty-row :gutter="16">
    <ty-col :span="12" >
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="12" >
       <div class="colBox"></div>
    </ty-col>
  </ty-row>

  <ty-row :gutter="16">
    <ty-col :span="6" >
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="6" >
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="6" >
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="6" >
      <div class="colBox"></div>
    </ty-col>
  </ty-row>

  <ty-row :gutter="16">
    <ty-col :span="4" >
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="4" >
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="4" >
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="4" >
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="4" >
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="4" >
      <div class="colBox"></div>
    </ty-col>
  </ty-row>
```
:::

## 设置内部间距(gutter)
:::demo  gutter
```html
 <ty-row :gutter="16">
    <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
    <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
     <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
  </ty-row>
   <ty-row :gutter="32">
    <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
    <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
     <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
  </ty-row>
     <ty-row :gutter="64">
    <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
    <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
     <ty-col :span="8" >
        <div class="colBox"></div>
    </ty-col>
  </ty-row>
```
:::



## 属性(Attributes)

| 属性      | 描述    | 类型      | 值       | 默认   |
|----- |----- |----- |----- |-----  |
| gutter     | 栅格列之间的间距  | Number  | 0 

## 插槽(slot)
| 名称      | 描述    |
|----- |----- |
| default | 默认插槽 |

