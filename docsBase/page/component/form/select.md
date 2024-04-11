# select

## 基本用法

:::demo

```html
    <TyButton
      @click="
        () => {
          selectValue = 'jz'
        }
      "
    >
      change
    </TyButton>
    <hr />
<TySelect
  v-model="selectValue"
  style="margin-bottom: 20px"
  placeholder="请选择"
>
  <TySelectOption
    v-for="(item, index) in [
          { label: '香蕉', value: 'xj' },
          { label: '橘子', value: 'jz' }
        ]"
    :key="index"
    :label="item.label"
    :value="item.value"
  >
  </TySelectOption>
</TySelect>
```

```js
import { ref } from 'vue'
let selectValue = ref('')
```
:::


## 部分禁用+placeholder

:::demo

```html
    <TySelect v-model="selectValue" style="margin-bottom: 20px"  placeholder="请选择">
      <TySelectOption
        v-for="(item, index) in [
          { label: '香蕉', value: 'xj' },
          { label: '橘子', value: 'jz' },
          { label: '西瓜', value: 'xg' ,disabled:true},
        ]"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
      </TySelectOption>
    </TySelect>
```

```js
import { ref } from 'vue'
let selectValue = ref('')
```
:::

## 全部禁用

:::demo

```html
    <TySelect v-model="selectValue" 
    disabled
    style="margin-bottom: 20px"  placeholder="请选择">
      <TySelectOption
        v-for="(item, index) in [
          { label: '香蕉', value: 'xj' },
          { label: '橘子', value: 'jz' },
          { label: '西瓜', value: 'xg' ,disabled:true},
        ]"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
      </TySelectOption>
    </TySelect>
```

```js
import { ref } from 'vue'
let selectValue = ref('')
```
:::


## 自定义selectItem
:::demo
```html
     <TySelect v-model="selectValue" style="margin-bottom: 20px" placeholder="请选择" >
      <TySelectOption
        v-for="(item, index) in [
          { label: '香蕉', value: 'xj' },
          { label: '橘子', value: 'jz' },
          { label: '西瓜', value: 'xg' ,disabled:true},
        ]"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <div style="display: flex;justify-content: space-between;">
          <span>{{ item.value }}</span>

          <span>{{ item.label }}</span>
        </div>
      </TySelectOption>
    </TySelect>
```
```js
import { ref } from 'vue'
let selectValue = ref('')
```
:::



## 多选
:::demo

```html
     <TySelect v-model="selectMValue" multiple style="margin-bottom: 20px" placeholder="请选择" >
      <TySelectOption
        v-for="(item, index) in [
          { label: '香蕉', value: 'xj' },
          { label: '橘子', value: 'jz' },
          { label: '西瓜', value: 'xg' ,disabled:true},
        ]"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <div style="display: flex;justify-content: space-between;">
          <span>{{ item.value }}</span>
          <span>{{ item.label }}</span>
        </div>
      </TySelectOption>
    </TySelect>
```

```js
import { ref } from 'vue'
let selectMValue = ref([])
```
:::

## 分组
:::demo
```html
     <TySelect v-model="selectValue" style="margin-bottom: 20px" placeholder="请选择" >
      <TySelectGroup title="热门水果">
      <TySelectOption
        v-for="(item, index) in [
          { label: '香蕉', value: 'xj' },
          { label: '橘子', value: 'jz' },
          { label: '西瓜', value: 'xg' ,disabled:true},
        ]"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <div style="display: flex;justify-content: space-between;">
          <span>{{ item.value }}</span>

          <span>{{ item.label }}</span>
        </div>
      </TySelectOption>

      </TySelectGroup>

       <TySelectGroup title="热门城市">
      <TySelectOption
        v-for="(item, index) in [
          { label: '南京', value: 'nj' },
          { label: '西安', value: 'xa' },
          { label: '南昌', value: 'nc' ,disabled:true},
        ]"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <div style="display: flex;justify-content: space-between;">
          <span>{{ item.value }}</span>

          <span>{{ item.label }}</span>
        </div>
      </TySelectOption>

      </TySelectGroup>
    </TySelect>
```
```js
import { ref } from 'vue'
let selectValue = ref('')
```
:::
## 搜索

## 创建条目

<script setup>
import { ref } from 'vue'
let selectValue = ref('')
let selectMValue = ref([])
</script>
