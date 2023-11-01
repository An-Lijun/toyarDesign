

<template>
  <header>
    <button @click="change">切换</button>
  </header>
  <button @click="fnnn">111</button>
  <TyButton @dblclick="fnn">提交1</TyButton>

  <!-- <TyForm   :formData="{}">
    <TyRow :gutter="num">
      <TyCol :span="6">
        <TyFormItem>
            <template #label>
                金额
            </template>
          
        </TyFormItem> 
        </TyCol>
    </TyRow>
  </TyForm> -->
  <TyInput v-model="dd" @input="inp" @blur="a" style="width:500px">
    <template #outPre>
      <ty-button @click="fn" :disabled="boolean">btn</ty-button>
    </template>
    <template #innerPre>
      <ty-icon icon="ty-money-cny-circle-line">
      </ty-icon>
    </template>
    <template #outAft>
      <TyButton>提交</TyButton>
    </template>
  </TyInput>
  {{ dd }}
  <div>
    <ty-button @click="fn" :disabled="boolean">btn</ty-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

let boolean = ref(true)
let dd = ref('111')
let num = ref(10)
const change = () => {
  boolean.value = !boolean.value
  let html = document.getElementsByTagName('html');
  html[0].setAttribute('toyar-theme', boolean.value ? 'light' : 'dark')
}
const data1 = { labelWidth: 50 }
const fn = () => {
  num.value++
  data1.labelWidth++
}
function fnn() {
  console.log("666");

}
function inp() {
  console.log("61");

}
function a() {
  console.log('blur');

}
function fnnn() {
  dd.value = "777"
}
</script>
<style scoped></style>
