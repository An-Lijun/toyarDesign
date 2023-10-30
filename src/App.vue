

<template>
  <header>
    <button @click="change">切换</button>
  </header>
  <TyButton @dblclick="fnn">提交1</TyButton>

  <TyForm   :formData="{}">
    <TyRow :gutter="num">
      <TyCol :span="6">
        <TyFormItem>
            <template #label>
                金额
            </template>
            <TyInput>
              <template #outPre>
                  <ty-button @click="fn"   :disabled="boolean">btn</ty-button>
              </template>
              <template #innerPre>
                <ty-icon icon="ri-money-cny-circle-line">
                </ty-icon>
              </template>
              <template #innerAft>
                <!-- <ty-button @click="fn"   :disabled="boolean">btn</ty-button> -->
                <ty-icon icon="ri-close-circle-line">

                </ty-icon>
              </template>
                <template #outAft>
                  <TyButton >提交</TyButton>
                </template>
              </TyInput>
        </TyFormItem> 
        </TyCol>
    </TyRow>
  </TyForm>


  <div>
    <ty-button @click="fn"   :disabled="boolean">btn</ty-button>
  </div>

</template>
<script setup lang="ts">
import { TyRow } from './package';
import {ref} from 'vue';
  let boolean =ref(true)
  let num =ref(10)
  const change=()=>{
    boolean.value=!boolean.value
    let html = document.getElementsByTagName('html');
      html[0].setAttribute('toyar-theme', boolean.value?'light':'dark')
  }
  const data1={labelWidth:50}
  const fn=()=>{
    num.value++
    data1.labelWidth++
  }
  function fnn(){
    console.log("666");
    
  }
</script>
<style scoped>

</style>
