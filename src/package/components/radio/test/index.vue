<template>
  <div class="divRoot">
    <TyRadio v-model="isC" :value="0" size="mini">123</TyRadio>
    <TyRadio v-model="isC" :value="1" size="small">456</TyRadio>
    <hr />
    <TyRadio v-model="isC" :value="2" size="mini">123</TyRadio>
    <TyRadio v-model="isC" :value="3" size="small">456</TyRadio>
    <TyRadio v-model="isC" :value="4" size="medium">456</TyRadio>
    <TyRadio v-model="isC" :value="5" size="large">456</TyRadio>
    <TyRadio v-model="isC" disabled :value="5" size="large">456</TyRadio>

    <TyForm disabled>
      <TyRadio v-model="isC" :value="5" size="large">456</TyRadio>
    </TyForm>
    <TyForm>
      <TyFormItem disabled>
        <TyRadio v-model="isC" :value="5" size="large">456</TyRadio>
      </TyFormItem>
    </TyForm>

    <TyForm>
      <TyFormItem readonly>
        <TyRadio v-model="isC" :value="5" size="large">456</TyRadio>
      </TyFormItem>
    </TyForm>

    <TyForm ref="tForm" :formData="formData" :rules="rules">
      <TyFormItem prop="isC1">
        <TyRadio v-model="formData.isC1" :value="5" size="large">456</TyRadio>
      </TyFormItem>
    </TyForm>
    <TyButton @click="sub"> 123 </TyButton>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const isC = ref('')
const tForm = ref()

const formData = ref({
  isC1: ''
})
const rules = {
  isC1: [{ required: true, message: `isC1 是必填字段`, trigger: ['blur'] }]
}
const sub = () => {
  tForm.value
    .validateAll()
    .then(res => {
      console.log('success', res)
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
</script>
<style lang="less" scoped></style>
