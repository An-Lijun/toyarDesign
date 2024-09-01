# Menu

## 基本用法

:::demo

```html
<TyMenu>
  <template #header>
    <div
      style="
              overflow: hidden;;
                  max-height: 50px;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
    >
      菜单头
    </div>
  </template>
  <TySubMenu index="1">
    <template #icon>
      <TyIcon icon="ty-stack-fill"></TyIcon>
    </template>
    <template #title> Navigation1 </template>

    <TyMenuItem index="1-1" mkey="xx1"> menu1 </TyMenuItem>
    <TyMenuItem index="1-2" mkey="xx2"> menu2 </TyMenuItem>
    <TyMenuItem index="1-3"> menu3 </TyMenuItem>
  </TySubMenu>
  <TySubMenu index="2">
    <template #icon>
      <TyIcon icon="ty-palette-fill"></TyIcon>
    </template>
    <template #title> Navigation2 </template>
    <TyMenuItem index="2-1" mkey="xx31"> menu1 </TyMenuItem>
    <TyMenuItem index="2-2" mkey="xx32"> menu2 </TyMenuItem>
    <TySubMenu index="2-3">
      <template #icon>
        <TyIcon icon="ty-bug-2-fill"></TyIcon>
      </template>
      <template #title> Navigation2-1 </template>
      <TyMenuItem index="2-3-1" mkey="xx3"> menu1 </TyMenuItem>
      <TyMenuItem index="2-3-2" mkey="xx4"> menu2 </TyMenuItem>
    </TySubMenu>
  </TySubMenu>
</TyMenu>
```

:::

## 数据用法

:::demo

```html
<TyButton @click="changeBtn">折叠</TyButton>

<TyMenu
  theme="dark"
  v-model="value1"
  :isFold="isFold"
  :option="opt"
  :data="11"
  @open="op"
>
  <template #header>
    <div
      style="
        overflow: hidden;;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <img src="../../../assets/toyar.png" />
    </div>
  </template>
</TyMenu>
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性  | 描述             | 类型   | 默认       |
| ----- | ---------------- | ------ | ---------- |
| title | empty 的文字描述 | string | '暂无数据' |

</div>

<script setup>
  import { ref } from 'vue'

let isFold = ref(false)
let value1 = ref('aaa')
const change = (val) => {
  // console.log(val);
}
const changeBtn=()=>{
  isFold.value=!isFold.value
}
const op=(v)=>{
  console.log(v);
  
}
let opt = [
  {
    label: 'xxx',
    key: 'xxx111',
    icon: 'ty-palette-fill',
    children: [{
      label: 'xxx',
      key: 'xxx1',
      icon: 'icon',
      type: 'subMenu',
      children: [
        {
          label: 'xxx',
          key: 'aaa',
          type: 'menu'
        },
        {
          label: 'button',
          key: 'button',
          type: 'menu',
          path: '/button'

        }
      ]
    }],
    type: 'subMenu'
  },
  {
    icon: 'ty-palette-fill',
    label: 'xxx',
    key: 'aaa1',
    type: 'menu'
  },
  {
    label: 'xxx',
    key: 'aaa31',
    type: 'menu'
  }
]
</script>