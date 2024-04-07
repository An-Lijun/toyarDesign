<template>
  <div class="divRoot">
    <TyCheckBox v-model="r2" readonly :size="item">22</TyCheckBox>


    <TyCheckBox v-model="r1">11</TyCheckBox>
    <hr />
    <div v-for="item in ['mini', 'small', 'medium', 'large']">
      <TyCheckBox v-model="r1" :size="item">22</TyCheckBox>
    </div>
    <hr />
    <TyCheckBox disabled v-model="r1" :size="item">22</TyCheckBox>
    <TyCheckBox canHarf v-model="r1" :size="item">22</TyCheckBox>

    <TyForm disabled>
      <TyCheckBox v-model="r1" :size="item">22</TyCheckBox>
    </TyForm>
    <TyForm>
      <TyFormItem disabled>
        <TyCheckBox v-model="r1" :size="item">22</TyCheckBox>
      </TyFormItem>
    </TyForm>
    <TyForm ref="tForm" :formData="formData" :rules="rules">
      <TyFormItem prop="r2">
        <TyCheckBox v-model="formData.r2" :size="item">22</TyCheckBox>
      </TyFormItem>
    </TyForm>
    <TyForm readonly>
      <TyCheckBox v-model="r1" :size="item">22</TyCheckBox>
    </TyForm>
    <TyForm>
      <TyFormItem readonly>
        <TyCheckBox v-model="r1" :size="item">22</TyCheckBox>
      </TyFormItem>
    </TyForm>

    <TyForm :formData="formData" :rules="rules">
      <TyFormItem >
        <TyCheckBox v-model="r2" :size="item">22</TyCheckBox>
      </TyFormItem>
    </TyForm>
    <TyButton @click="sub"> 123 </TyButton>
  </div>
</template>
<script setup>
import { ref } from 'vue'

let r1 = ref(false)
const tForm = ref()

const formData = ref({
  r2: ''
})
const rules = {
  r2: [{ required: true, message: `r2 是必填字段`, trigger: ['blur'] }]
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
