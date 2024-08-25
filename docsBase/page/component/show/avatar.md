# avatar 头像

## 基础用法

:::demo 基础用法(state)

```html
<div>
  <TyAvatar style="background-color: aqua;">123456789</TyAvatar>
  <TyAvatar style="background-color:chocolate;">A</TyAvatar>
  <TyAvatar style="background-color: skyblue;">你好</TyAvatar>
</div>
```

:::

## 修改样式

:::demo 基础用法(state)

```html
<div>
  <TyAvatar shape="circle">你好</TyAvatar>
  <TyAvatar style="background-color: skyblue;" shape="square">你好</TyAvatar>
</div>
```

:::

## 修改大小

:::demo 基础用法(state)

```html
<div>
  <TyAvatar shape="circle" width="80px">你好</TyAvatar>

  <TyAvatar shape="circle" width="80px">A</TyAvatar>
  <TyAvatar shape="circle" width="80px">A11111111111</TyAvatar>
</div>
```

:::

## 头像组

:::demo 基础用法(state)

```html
<div>
  <TyAvatarGroup>
    <TyAvatar width="80px" style="background-color: aqua;" shape="circle"
      >123456789</TyAvatar
    >
    <TyAvatar  width="80px" style="background-color:chocolate;" shape="circle">A</TyAvatar>
    <TyAvatar  width="80px" style="background-color: skyblue;" shape="circle">你好</TyAvatar>
    <TyAvatar  width="80px" shape="circle">你好</TyAvatar>
    <TyAvatar  width="80px" style="background-color: skyblue;" shape="circle">你好</TyAvatar>
  </TyAvatarGroup>
  <TyAvatarGroup>
    <TyAvatar style="background-color: aqua;" shape="square"
      >123456789</TyAvatar
    >
    <TyAvatar style="background-color:chocolate;" shape="square">A</TyAvatar>
    <TyAvatar style="background-color: skyblue;" shape="square">你好</TyAvatar>
    <TyAvatar shape="square">你好</TyAvatar>
    <TyAvatar style="background-color: skyblue;" shape="square">你好</TyAvatar>
  </TyAvatarGroup>
  <TyAvatarGroup :offset="16">
    <TyAvatar  width="80px" style="background-color: aqua;" shape="circle"
      >123456789</TyAvatar
    >
    <TyAvatar  width="80px" style="background-color:chocolate;" shape="circle">A</TyAvatar>
    <TyAvatar  width="80px" style="background-color: skyblue;" shape="circle">你好</TyAvatar>
    <TyAvatar  width="80px" shape="circle">你好</TyAvatar>
    <TyAvatar  width="80px" style="background-color: skyblue;" shape="square">你好</TyAvatar>
  </TyAvatarGroup>
</div>
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性  | 描述                   | 类型   | 默认 |
| ----- | ---------------------- | ------ | ---- |
| width | 组件的大小             | string | 30px |
| shape | 组件外形 corcle square | string | ''   |

| offset | avatarGroup每个头像之间的间隔 | number | 8   |


</div>

## 变量(cssVariables)

<div class="cssVar">

| 变量名                 | 变量值 | 描述               |
| ---------------------- | ------ | ------------------ |
| --toyar-gray-4         | --     | 背景色             |
| --border-radius-4      | 4px    | 圆角               |
| --border-radius-circle | 50%    | 分隔线内容的 color |

</div>
