# inputNumber

## 基础用法

:::demo
```html
  <TyInputNumber v-model="inp" />
```

```js
import { ref } from 'vue'
const inp = ref('')
```
:::

## 尺寸

:::demo
```html
  <div v-for="item in ['mini','small','medium','large']">
    <TyInputNumber v-model="inp"  :size="item"/>
  <hr>
  </div>

```

```js
import { ref } from 'vue'
const inp = ref('')
```
:::


## 禁用

:::demo
```html
  <TyInputNumber v-model="inp" disabled/>
```

```js
import { ref } from 'vue'
const inp = ref('')
```
:::

## 只读

:::demo
```html
  <TyInputNumber v-model="inp" readonly/>
```
```js
import { ref } from 'vue'
const inp = ref('')
```
:::


## step

:::demo
```html
  <TyInputNumber v-model="inp"  :step="5"/>
```
```js
import { ref } from 'vue'
const inp = ref('')
```
:::

## step 严格
:::demo
```html
  <TyInputNumber stepStrictly  v-model="inp"  :step="5"/>
```
```js
import { ref } from 'vue'
const inp = ref('')
```
:::

<script setup>
import { ref } from 'vue'
const inp = ref('')
</script>