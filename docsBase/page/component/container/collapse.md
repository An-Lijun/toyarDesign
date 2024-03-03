# collapse

## 基本用法

  <TyCollapse v-model="modelV1">
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
  </TyCollapse>

## 禁用

  <TyCollapse v-model="modelV2" :disabled="true">
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
  </TyCollapse>

## 手风琴模式

  <TyCollapse v-model="modelV3" :accordion="true">
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
    <TyCollapseItem title="title" name="bb" >bbbb </TyCollapseItem>
    <TyCollapseItem title="title" name="cc" >cccc </TyCollapseItem>
  </TyCollapse>

## 嵌套

  <TyCollapse v-model="modelV4">
    <TyCollapseItem title="title" name="aa" >
        <TyCollapse v-model="modelV5">
        <TyCollapseItem title="title" name="bb" >bbbb 
        </TyCollapseItem>
      </TyCollapse> 
     </TyCollapseItem>
  
  </TyCollapse>

## 隐藏图标

  <TyCollapse v-model="modelV2" :hide="true">
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
  </TyCollapse>

## 隐藏时销毁

  <TyCollapse v-model="modelV2" :destroy="true">
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
  </TyCollapse>

## 图标位置

  <TyCollapse v-model="modelV2" position="left">
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
  </TyCollapse>

## 属性(Attributes)

<div class="listTb">

| 属性      | 描述               | 类型    | 值  | 默认  |
| --------- | ------------------ | ------- | --- | ----- |
| disabled  | 禁用               | Boolean | --  | false |
| hide  | 隐藏图标              | Boolean | --  | false |
| destroy  | 隐藏时销毁              | Boolean | --  | false |
| accordion | 手风琴模式         | Boolean | --  | false |
| title     | 折叠面板的标题     | String  | --  | --    |
| position     | 折叠面板图标的位置     | String  | left/right  | right  |
| name      | 折叠面板的唯一 key | String  | --  | --    |
| v-model   | 折叠面板的双向绑定 | Array   | --  | --    |

</div>

<script setup>
  import {ref} from 'vue'
  const modelV1 =ref(['aa'])
  const modelV2 =ref(['aa'])
  const modelV3 =ref(['aa'])
  const modelV4 =ref([])
  const modelV5 =ref([])


</script>
