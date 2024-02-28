# InputPassword

## 基础用法

:::demo

```html
<TyInputPassword v-model="inp" />
```

```js
import { ref } from 'vue'
const inp = ref('')
```
:::


## 大小

:::demo

```html
<TyInputPassword v-model="inp" size="mini"> </TyInputPassword>
<hr />
<TyInputPassword v-model="inp" size="small"> </TyInputPassword>
<hr />
<TyInputPassword v-model="inp" size="medium"> </TyInputPassword>
<hr />
<TyInputPassword v-model="inp" size="large"> </TyInputPassword>
<hr />
```

```js
import { ref } from 'vue'
const inp = ref('')
```
:::


<script setup>
  import {ref} from 'vue'
 const inp =ref('')

</script>

## 属性(Attributes)

<div class="listTb">

| 属性       | 描述                           | 类型     | 值                        | 默认          | 
| ---------- | ------------------------------ | -------- | ------------------------- | ------------- |
| size       | 组件大小                       | string   | mini/ small/ medium/ mini | mini |
| clearable  | 是否展示清除按钮               | boolean  | --                        | true          | 
| disabled   | 是否禁用                       | boolean  | --                        | false         | 
| readonly   | 是否只读                       | boolean  | --                        | false         | 
| modelValue | v-model 绑定值(required)       | string   | number                    | ''            |

</div>



