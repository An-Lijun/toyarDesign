<template>
  <div class="divRoot">
    <TyForm ref="form1" :formData="formData" :rules="rules">
    <TyRow :gutter="num">
      <TyCol :span="12">
        <TyFormItem prop="dd">
          <template #label> 金额 </template>

          <TyInput v-model="formData.dd">
            <template #outPre>
              <ty-button >btn</ty-button>
            </template>
            <template #innerPre>
              <ty-icon icon="ty-money-cny-circle-line"> </ty-icon>
            </template>
            <template #outAft>
              <TyButton>提交</TyButton>
            </template>
          </TyInput>
        </TyFormItem>
      </TyCol>
      <TyCol :span="12">
        <TyFormItem prop="cc">
          <template #label> el </template>
          <TyInput v-model="formData.cc" />
        </TyFormItem>
      </TyCol>
    </TyRow>
  </TyForm>
  <ty-button @click="submit">submit</ty-button>
  <ty-button @click="reset">reset</ty-button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const form1 = ref()

const formData = ref({
  dd: ''
})
const rules = {
  dd: [
    { required: true, message: `dd 是必填字段`, trigger: ['blur'] },
    { min: 2, max: 5 }
  ],
  cc: [
    { required: true, message: `cc 是必填字段`, trigger: ['blur'] },
    {
      validate: val
    }
  ]
}
function reset() {
  form1.value.clearValidateAll()
}
function val(data, cb) {
  if (data.length < 2) {
    return cb('length must >2')
  }
  cb()
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
</script>
<style lang="less" scoped>
</style>
