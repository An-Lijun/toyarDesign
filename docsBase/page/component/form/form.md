# Form 表单

## 基础用法

:::demo 基础用法

```vue
<TyForm ref="form1" :formData="formData1">
  <TyInput v-model="formData1.inp"> </TyInput>
</TyForm>
```

```js
import { ref } from 'vue'
const formData1 = ref({
  inp: ''
})
```

:::

## 表单校验/清除校验(全部表单)

:::demo 全部表单校验

```html
<TyForm ref="form2" :formData="formData2" :rules="rules2">
  <TyRow :gutter="10">
    <TyCol :span="12">
      <TyFormItem prop="inp">
        <template #label> 金额 </template>
        <TyInput v-model="formData2.inp"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
     <TySpace style=" margin-bottom: 20px;">
       <ty-button @click="submit2">submit</ty-button>
       <ty-button @click="reset2">reset</ty-button> 
     </TySpace>

    </TyCol>
  </TyRow>
</TyForm>
```

```js
import { ref } from 'vue'
const formData2 = ref({
  inp: ''
})
const form2 = ref()

const rules2 = {
  inp: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ]
}
function submit() {
  form2.value
    .validateAll()
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
function reset() {
  form2.value.clearValidateAll()
}
```

:::

## 表单校验/清除校验(部分表单)

:::demo 部分表单校验

```html
<TyForm ref="form3" :formData="formData3" :rules="rules3">
  <TyRow :gutter="10">
    <TyCol :span="12">
      <TyFormItem prop="inp">
        <template #label> 金额 </template>
        <TyInput v-model="formData3.inp"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
      <TyFormItem prop="nm">
        <template #label> 姓名 </template>
        <TyInput v-model="formData3.nm"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
      <ty-button @click="submit3">submit</ty-button>
      <ty-button @click="reset3">reset</ty-button>
    </TyCol>
  </TyRow>
</TyForm>
```
```js

import { ref } from 'vue'
const formData3 = ref({
  inp: '',
  nm: ''
})
const form3 = ref()

const rules3 = {
  inp: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ],
  nm: [{ required: true, message: `dd 是必填字段`, trigger: ['blur'] }]
}
function submit3() {
  form3.value
    .validate('nm')
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
function reset3() {
  form3.value.clearValidateAll('nm')
}
```
:::


## 表单校验2(部分表单)

:::demo 

```html
{{formData4}}
<TyForm ref="form4" :formData="formData4" :rules="rules4">
  <TyRow :gutter="10">
    <TyCol :span="24">
      <TyFormItem prop="username">
        <template #label> 姓名 </template>
        <TyInput v-model="formData4.username"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="24">
      <TyFormItem prop="age">
        <template #label> 年龄 </template>
       <TyInputNumber v-model="formData4.age" :min="1" :max="120" :step="1" /> 
      </TyFormItem>
    </TyCol>

    <TyCol :span="24">
      <TyFormItem prop="sex">
        <template #label> 性别 </template>
        <TyRadioGroup v-model="formData4.sex">
          <TyRadio value="man">
              男
          </TyRadio>
          <TyRadio value="woman">
              女
          </TyRadio>
        </TyRadioGroup>
      </TyFormItem>
    </TyCol>


    <TyCol :span="24">
      <TyFormItem prop="hobby ">
        <template #label> 爱好 </template>
          <TyCheckBoxGroup v-model="formData4.hobby">
            <TyCheckBox value="football">
                足球
            </TyCheckBox>
            <TyCheckBox value="basketball">
                篮球
            </TyCheckBox>
          </TyCheckBoxGroup> 
      </TyFormItem>
    </TyCol>
    <TyCol :span="24">
        <TySpace style="width:100%;">
          <ty-button @click="submit4">submit</ty-button>
          <ty-button @click="reset4">reset</ty-button>
        </TySpace>
    </TyCol>
  </TyRow>
</TyForm>
```

```js

import { ref } from 'vue'
const formData4 = ref({
  username:'',
  sex:'',
  age:'',
  hobby:[],
})
const form4 = ref()

const rules4 = {
    username:[
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] }
  ],
  inp: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ],
  nm: [{ required: true, message: `dd 是必填字段`, trigger: ['blur'] }]
}
function submit4() {
  form2.value
    .validateAll('nm')
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
function reset4() {
  form4.value.clearValidateAll('nm')
}
```

:::

## 表单属性

:::demo 属性配置 （disabled，labelWidth）

```html
<TyForm ref="form5" :formData="formData5" labelWidth="150" :disabled="true">
  <TyRow :gutter="10">
    <TyCol :span="12">
      <TyFormItem prop="inp">
        <template #label> 金额 </template>
        <TyInput v-model="formData5.inp"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
      <TyFormItem prop="nm">
        <template #label> 姓名 </template>
        <TyInput v-model="formData5.nm"> </TyInput>
      </TyFormItem>
    </TyCol>
  </TyRow>
</TyForm>
```

```js
const formData5 = ref({
  inp:'',
  nm:''
})
```

:::

## 表单属性 2

:::demo 属性配置 2 （readonly，size）

```html
<TyForm
  ref="form6"
  :formData="formData6"
  labelWidth="80"
  :readonly="true"
  size="large"
>
  <TyRow :gutter="10">
    <TyCol :span="12">
      <TyFormItem prop="inp">
        <template #label> 金额 </template>
        <TyInput v-model="formData6.inp"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
      <TyFormItem prop="nm">
        <template #label> 姓名 </template>
        <TyInput v-model="formData6.nm"> </TyInput>
      </TyFormItem>
    </TyCol>
  </TyRow>
</TyForm>
```

```js
const formData6 = ref({
  inp:'',
  nm:''
})
```

:::




## 表单布局

:::demo 全部表单校验

```html
<TyForm ref="form7" layout="vertical" :formData="formData7" :rules="rules7">
  <TyRow :gutter="10">
    <TyCol :span="12">
      <TyFormItem prop="inp">
        <template #label> 金额 </template>
        <TyInput v-model="formData7.inp"> </TyInput>
      </TyFormItem>
    </TyCol>
    <TyCol :span="12">
      <ty-button @click="submit7">submit</ty-button>
      <ty-button @click="reset7">reset</ty-button>
    </TyCol>
  </TyRow>
</TyForm>
```

```js
import { ref } from 'vue'
const formData7 = ref({
  inp: ''
})
const form7 = ref()

const rules7 = {
  inp: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ]
}
function submit7() {
  form7.value
    .validateAll()
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
function reset7() {
  form7.value.clearValidateAll();
}

```
:::



## 滚动到指定prop


:::demo 全部表单校验

```html
  <div style="height:150px; max-height:150px;overflow:scroll">
    <TyForm ref="form8" layout="vertical" :formData="formData8" >
      <TyRow :gutter="10">
        <TyCol :span="24">
          <ty-button @click="scroll">scroll</ty-button>
        </TyCol>
        </br>
        </br>
        </br>
        <TyCol :span="24">
          <TyFormItem prop="inp">
            <template #label> 金额 </template>
            <TyInput v-model="formData8.inp"> </TyInput>
          </TyFormItem>
        </TyCol>
        </br>
        </br>
        </br>
        <TyCol :span="24">
          <TyFormItem prop="name">
            <template #label> 名称 </template>
            <TyInput v-model="formData8.name"> </TyInput>
          </TyFormItem>
        </TyCol>
        </br>
        </br>
        </br>
        <TyCol :span="24">
          <TyFormItem prop="sex">
            <template #label> 性别sex </template>
            <TyInput v-model="formData8.sex"> </TyInput>
          </TyFormItem>
        </TyCol>

      </TyRow>
    </TyForm>
  </div>
```

```js
const form8 = ref()
const formData8 = ref({
  inp:'',
  name:'',
  sex:'',
})

const scroll =()=>{
  form8.scrollTo('sex')
}
```
:::

## 检验并滚动到

:::demo 全部表单校验

```html
  <div style="height:150px; max-height:150px;overflow:scroll">
    <TyForm ref="form9" layout="vertical" :formData="formData9" :rules="rules9">
      <TyRow :gutter="10">
        <TyCol :span="24">
          <ty-button @click="submit9">submit</ty-button>
        </TyCol>
        </br>
        </br>
        </br>
        <TyCol :span="24">
          <TyFormItem prop="inp">
            <template #label> 金额 </template>
            <TyInput v-model="formData9.inp"> </TyInput>
          </TyFormItem>
        </TyCol>
        </br>
        </br>
        </br>
        <TyCol :span="24">
          <TyFormItem prop="name">
            <template #label> 名称 </template>
            <TyInput v-model="formData9.name"> </TyInput>
          </TyFormItem>
        </TyCol>
        </br>
        </br>
        </br>
        <TyCol :span="24">
          <TyFormItem prop="sex">
            <template #label> 性别sex </template>
            <TyInput v-model="formData9.sex"> </TyInput>
          </TyFormItem>
        </TyCol>

      </TyRow>
    </TyForm>
  </div>
```

```js

const form9 = ref()
const formData9 = ref({
  inp:'',
  name:'',
  sex:''
})

const submit9 =()=>{
  form9.validateAll().then(res=>{

  }.catch(err)=>{
    form9.scrollTo(err[0])
  })
}

const rules9 ={
  sex:[{
    required:true
  }]
}
```
:::




## 属性(Attributes)

<div class="listTb">

| 属性       | 描述                           | 类型    | 默认  |
| ---------- | ------------------------------ | ------- | ----- |
| disabled   | 整个 form 组件的 disabled 状态 | boolean | false |
| readonly   | 整个 form 组件的 readonly 状态 | boolean | false |
| size       | 整个组件的尺寸状态             | string  | mini  |
| labelWidth | 整个 form 组件的 labelWidth    | string  | 100   |
| rules      | 整个 form 组件的校验规则       | array   | []    |

</div>

## 插槽(slot)

<div class="listTb">

| 名称    | 描述     |
| ------- | -------- |
| default | 默认插槽 |

</div>

## 方法(methods)

<div class="listTb">

| 名称             | 描述                     | 参数           |
| ---------------- | ------------------------ | -------------- |
| validate         | 校验某一个 prop(Promise) | 参数 prop 名称 |
| validateAll      | 校验全部 prop(Promise)   |                |
| clearValidate    | 清除某个 prop 校验信息   | 参数 prop 名称 |
| clearValidateAll | 清除全部校验信息         |                |

</div>

<script setup>
  import {ref} from 'vue'

  const form1 = ref()
  const formData1 = ref({
    inp: ''
  })




const form2 = ref()
const formData2 = ref({
  inp: ''
})
const rules2 = {
  inp: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ]
}
function submit2() {
  form2.value
    .validateAll()
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
function reset2() {
  form2.value.clearValidateAll()
}



   
const formData3 = ref({
  inp: '',
  nm: ''
})
const form3 = ref()

const rules3 = {
  inp: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ],
  nm: [{ required: true, message: `dd 是必填字段`, trigger: ['blur'] }]
}
function submit3() {
  form3.value
    .validate('nm')
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
function reset3() {
  form3.value.clearValidateAll('nm')
}




const formData4 = ref({
  username:'',
  sex:'',
  age:'',
  hobby:[]
})
const form4 = ref()

const rules4 = {
  username:[
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] }
  ],
  inp66: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ],
  nm66: [{ required: true, message: `dd 是必填字段`, trigger: ['blur'] }]
}
function submit4() {
  form4.value
    .validateAll('nm')
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
function reset4() {
  form4.value.clearValidateAll('nm')
}




const formData5 = ref({
  nm:'',
  inp:''
})





const formData6 = ref({
  inp:'',
  nm:''
})













const formData7 = ref({
  inp: ''
})
const form7 = ref()

const rules7 = {
  inp: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ]
}
function submit7() {
  form7.value
    .validateAll()
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}

function reset7() {
  form7.value.clearValidateAll();
}


const form8 = ref()
const formData8 = ref({
  inp:'',
  name:'',
  sex:''
})

const scroll =()=>{
  form8.value.scrollTo('sex')
}




const form9 = ref()

const formData9 = ref({
  inp:'',
  name:'',
  sex:''
})

const submit9 =()=>{
  form9.value.validateAll()
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    form9.value.scrollTo(err[0])
  })
}

const rules9 ={
  sex:[{
    required:true
  }]
}
</script>
