# 全局配置

## 基础用法(state)

:::demo state 修改按钮类状态

```html
    <TyConfigProvider  :options="{resetPrimary:color}" >
        
      <div>
        {{ color }}
      </div>
      <div>
        <TySpace>
          <template v-for="item in 7">
             <TyButton 
               :style="{
                 background:`var(--primary-${item})`
               }">
                按钮{{item}}
              </TyButton>
          </template>
        </TySpace>
        
      </div>
      <br>
      <br>
      <div style="display:flex;justify-content:space-between">
      <TyButton>按钮</TyButton>
       <input type="color" v-model="color">
      </div>
    </TyConfigProvider>
```
:::

## 属性(Attributes)

<div class="listTb">

| 属性      | 描述         | 类型   | 值                                  | 默认   |
| --------- | ------------ | ------ | ----------------------------------- | ------ |
| options.resetPrimary | 修改主题色 | color(HEX) | --                    | --    |

</div>

## 插槽(slot)

<div class="listTb">

| 名称    | 描述     |
| ------- | -------- |
| default | 默认插槽 |

</div>




 <!-- :theme="theme" -->
<script setup>
  import {ref} from 'vue'
let color =ref('#ff00ff')
let theme =ref('light')
const fn =()=>{ 
  theme.value = theme.value ==='light'?'dark':'light'
}
</script>