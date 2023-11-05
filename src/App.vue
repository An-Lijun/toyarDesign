

<template>
  <header>
    <button @click="change">切换</button>
    <button @click="change2">状态切换</button>
  </header>
  <button @click="fnnn">111</button>
  <TyButton @dblclick="fnn">提交1</TyButton>

  <!-- <TyForm   :formData="{}">

  </TyForm> -->
  <TyForm :formData="formData" :rules="{
    'dd':[
      {required:true, message:`dd 是必填字段`},
      {min:2,max:5}
    ],
    'cc':[
      {required:true, message:`cc 是必填字段`},
    ]
  }">
    <TyRow :gutter="num" >
      <TyCol :span="12">
        <TyFormItem prop="dd">
          <template #label>
            金额
          </template>

          <TyInput v-model="formData.dd"  @input="inp" @blur="a">
            <template #outPre>
              <ty-button @click="fn" disabled>btn</ty-button>
            </template>
            <template #innerPre>
              <ty-icon icon="ty-money-cny-circle-line">
              </ty-icon>
            </template>
            <template #outAft>
              <TyButton>提交</TyButton>
            </template>
          </TyInput>
        </TyFormItem>
      </TyCol>
      <TyCol :span="12">
    
        <TyFormItem prop="cc">
          <template #label>
          el
        </template>
          <TyInput v-model="formData.cc"/>
        </TyFormItem>
      </TyCol>
    </TyRow>

  </TyForm>
  <TyInput :disabled="boolean" v-model="dd" @input="inp" @blur="a" style="width:500px">
    <template #outPre>
      <ty-button @click="fn">btn</ty-button>
    </template>
    <template #innerPre>
      <ty-icon icon="ty-money-cny-circle-line">
      </ty-icon>
    </template>
    <template #innerAft>
      <ty-icon icon="ty-money-cny-circle-line">
      </ty-icon>
    </template>
    <template #outAft>
      <TyButton>提交</TyButton>
    </template>
  </TyInput>
  {{ formData.dd }}
  <div>
    <ty-button @click="fn" :disabled="boolean">btn</ty-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { TyCol } from './package';
const formData= ref({
  dd:''
})
let boolean = ref(true)
let boolean1 = ref(true)

let dd = ref('111')
let num = ref(10)
const change = () => {
  boolean1.value = !boolean1.value
  let html = document.getElementsByTagName('html');
  html[0].setAttribute('toyar-theme', boolean1.value ? 'light' : 'dark')
}
const change2 = () => {
  boolean.value = !boolean.value
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
