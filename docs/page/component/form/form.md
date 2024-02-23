# Form 表单

## 基础用法

:::demo 基础用法

```vue
<TyForm ref="form1" :formData="formData">
  <TyInput v-model="formData.inp"> </TyInput>
</TyForm>
```

```js
import { ref } from 'vue'
const formData = ref({
  inp: ''
})
```

:::

## 表单校验/清除校验(全部表单)

:::demo 全部表单校验

```html
<TyForm ref="form1" :formData="formData" :rules="rules">
  <TyRow :gutter="10">
    <TyCol :span="12">
      <TyFormItem prop="inp">
        <template #label> 金额 </template>
        <TyInput v-model="formData.inp"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
      <ty-button @click="submit">submit</ty-button>
      <ty-button @click="reset">reset</ty-button>
    </TyCol>
  </TyRow>
</TyForm>
```

```js
import { ref } from 'vue'
const formData = ref({
  inp: ''
})
const form1 = ref()

const rules = {
  inp: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ]
}
function submit() {
  form1.value
    .validateAll()
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
function reset() {
  form1.value.clearValidateAll()
}
```

:::

## 表单校验/清除校验(部分表单)

:::demo 部分表单校验

```html
<TyForm ref="form2" :formData="formData" :rules="rules">
  <TyRow :gutter="10">
    <TyCol :span="12">
      <TyFormItem prop="inp">
        <template #label> 金额 </template>
        <TyInput v-model="formData.inp"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
      <TyFormItem prop="nm">
        <template #label> 姓名 </template>
        <TyInput v-model="formData.nm"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
      <ty-button @click="submit1">submit</ty-button>
      <ty-button @click="reset1">reset</ty-button>
    </TyCol>
  </TyRow>
</TyForm>
```

```js
import { ref } from 'vue'
const formData = ref({
  inp: '',
  nm: ''
})
const form2 = ref()

const rules = {
  inp: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ],
  nm: [{ required: true, message: `dd 是必填字段`, trigger: ['blur'] }]
}
function submit1() {
  form2.value
    .validate('nm')
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
function reset1() {
  form2.value.clearValidate('nm')
}
```
:::


## 表单属性
:::demo 属性配置 （disabled，labelWidth）
```html
  <TyForm ref="form3" :formData="formData"
    labelWidth="150"
    :disabled="true"
  >
  <TyRow :gutter="10">
    <TyCol :span="12">
      <TyFormItem prop="inp">
        <template #label> 金额 </template>
        <TyInput v-model="formData.inp"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
      <TyFormItem prop="nm">
        <template #label> 姓名 </template>
        <TyInput v-model="formData.nm"> </TyInput>
      </TyFormItem>
    </TyCol>
  </TyRow>
</TyForm>
```
```js
```
:::

## 表单属性2
:::demo 属性配置2 （readonly，size）
```html
  <TyForm ref="form3" :formData="formData"
    labelWidth="80"
    :readonly="true"
    size="large"
  >
  <TyRow :gutter="10">
    <TyCol :span="12">
      <TyFormItem prop="inp">
        <template #label> 金额 </template>
        <TyInput v-model="formData.inp"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
      <TyFormItem prop="nm">
        <template #label> 姓名 </template>
        <TyInput v-model="formData.nm"> </TyInput>
      </TyFormItem>
    </TyCol>
  </TyRow>
</TyForm>
```
```js
```
:::
## 属性(Attributes)
| 属性      | 描述    | 类型      | 默认       | 
|----- |----- |----- |----- |
| disabled     | 整个form组件的disabled状态  | boolean  | false |
| readonly     | 整个form组件的readonly状态  | boolean  | false |
| size     | 整个组件的尺寸状态  | string  | mini |
| labelWidth     | 整个form组件的labelWidth | string  | 100 |
| rules     | 整个form组件的校验规则 | array  | [] |

## 插槽(slot)
| 名称      | 描述    |
|----- |----- |
| default | 默认插槽 |

## 方法(methods)
| 名称      | 描述    | 参数|
|----- |----- |----- |
| validate | 校验某一个prop(Promise) | 参数prop名称|
| validateAll | 校验全部prop(Promise) | |
| clearValidate | 清除某个prop校验信息 |参数prop名称 |
| clearValidateAll | 清除全部校验信息 | |



<script setup>
    import {ref} from 'vue'
    const form1 = ref()
    const form2 = ref()

    const formData =ref({
      inp: '',
      nm:''
    })
    const rules = {
      'inp': [
        { required: true, message: `inp 是必填字段`, trigger: ['blur'] },
        { min: 2, max: 5 }
      ],
      nm:[
        { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
      ]
    }
    function submit() {
      form1.value.validateAll().then(res => {
        console.log('success', res);
      }).catch(err => {
        console.log(err, "err");
      })
    }
    function reset() {
      form1.value.clearValidateAll()
    }
    function submit1() {
      form2.value
        .validate('nm')
        .then(res => {
          console.log('success', res)
        })
        .catch(err => {
          console.log(err, 'err')
        })
    }
function reset1() {
  form2.value.clearValidate('nm')
}
</script>
