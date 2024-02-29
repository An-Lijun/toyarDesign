# formItem

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
## 属性(Attributes)

<div class="listTb">

| 属性      | 描述    | 类型      | 默认       | 
|----- |----- |----- |----- |
| prop     | 配合form rules进行校验  | string  | -- |

</div>

## 插槽(slot)

<div class="listTb">

| 名称      | 描述    |
|----- |----- |
| default | 默认插槽 |

</div>


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
