# container

## 布局一

:::demo 布局一
```html

 <div style="color:#fff; height: 300px">
    <TyContainer column>
      <TyHeader height="50" style="background-color: #409eff"> TyHeader </TyHeader>
      <TyContainer>
        <TyAside wdith="300" style="background-color: #a0cfff"> TyAside </TyAside>
        <TyMain style="background-color: #c6e2ff"> TyMain </TyMain>
      </TyContainer>
      <TyFooter height="50" style="background-color: #409eff">TyFooter</TyFooter>
    </TyContainer>
  </div>
```
:::
  <hr />

## 布局二
:::demo 布局二
```html
  <div style="color:#fff; height: 300px">
    <TyContainer>
      <TyAside wdith="300" style="background-color: #a0cfff"> TyAside </TyAside>

      <TyContainer column>
        <TyHeader height="50" style="background-color: #409eff"> TyHeader </TyHeader>
        <TyMain style="background-color: #c6e2ff"> TyMain </TyMain>
        <TyFooter height="50" style="background-color: #409eff"
          >TyFooter</TyFooter>
      </TyContainer>
    </TyContainer>
  </div>
```
:::
  <hr />

## 布局三
:::demo 布局三
```html
  <div style="color:#fff; height: 300px">
    <TyContainer column>
      <TyHeader height="50" style="background-color: #409eff"> TyHeader </TyHeader>
      <TyContainer>
        <TyMain style="background-color: #c6e2ff"> TyMain </TyMain>
        <TyAside wdith="300" style="background-color: #a0cfff"> TyAside </TyAside>
      </TyContainer>
      <TyFooter height="50" style="background-color: #409eff">TyFooter</TyFooter>
    </TyContainer>
  </div>
```
:::

## 布局四
:::demo 布局四
```html

<!-- #c6e2ff -->
  <div style="color:#fff; height: 300px">
    <TyContainer column>
      <TyHeader height="50" style="background-color: #409eff"> TyHeader </TyHeader>
      <TyMain style="background-color: #c6e2ff"> TyMain </TyMain>
      <TyFooter height="50" style="background-color: #409eff">TyFooter</TyFooter>
    </TyContainer>
  </div>
```
:::

## 属性(Attributes)

<div class="listTb">

| 组件 | 属性       | 描述                           | 类型     | 值                        | 默认          | 
| ----------| ---------- | ------------------------------ | -------- | ------------------------- | ------------- |
| container | column       | 是否以纵向排列(默认横向)             | boolean   | true/false | false |
| header | height       | header组件的高度             | string   | -- | 100 |
| aside | width       | aside组件的宽度             | string   | -- | 100 |
| footer | height       | footer组件的高度             | string   | -- | 100 |

</div>

## 插槽(slot)

<div class="listTb">

| 组件 | 名称      | 描述    |
| ----- |----- |----- |
| container | default | 默认插槽 |
| header | default | 默认插槽 |
| aside | default | 默认插槽 |
| footer | default | 默认插槽 |
| main | default | 默认插槽 |

</div>





