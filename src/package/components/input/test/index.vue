<template>
  <div class="divRoot">
    <TyInput v-model="inp" />

    <hr>
    <TyInput v-model="inp" :clearable="false"/>
    <hr>
    <TyInput v-model="inp"  size="mini" :showLimit="true" maxlength="10" />
    <hr>
    <TyInput v-model="inp"  size="mini" />

    <hr>
    <TyInput v-model="inp"  size="small" />
    <hr>
    <TyInput v-model="inp"  size="medium" />
    <hr>
    <TyInput v-model="inp"  size="large" />
    <hr>
    <TyInput v-model="inp"  outPreText="http" size="large" />
    <hr />
    <TyInput v-model="inp" >
  <template #outPre>
    <TyButton>btn</TyButton>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp"  disabled>
  <template #outPre>
    <TyButton>btn</TyButton>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp"  outAftText=".com" size="large" />
<hr />
<TyInput v-model="inp" size="mini">
  <template #outAft>
    <TyButton>
      <ty-icon color="#FFF" icon="ty-search-line" />
    </TyButton>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp" >
  <template #outAft>
    <TyButton>
      <ty-icon color="#FFF" icon="ty-search-line" />
    </TyButton>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp" size="medium" >
  <template #outAft>
    <TyButton  style="height: 100%;">
      <ty-icon color="#FFF" icon="ty-search-line" />
    </TyButton>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp"  size="large" >
  <template #outAft>
    <TyButton style="height: 100%;">
      <ty-icon color="#FFF" icon="ty-search-line" />
    </TyButton>
  </template>
</TyInput>
<TyInput  v-model="inp2" @blur="inpBlur" @input="inpInput"
  @focus="inpFocus"
  @enter="inpEnter"
  @clear="inpClear"
  clearable
> 

</TyInput>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const inp = ref('')
const inp2 = ref('')



const inpBlur=(data)=>{
  console.log('blur');
  
}
const inpInput=(data)=>{
  console.log('inpInput',data);
  
}
const inpFocus=(data)=>{
  console.log('inpFocus');
  
}
const inpEnter=(data)=>{
  console.log('inpEnter');
}
const inpClear=(data)=>{
  console.log('inpClear');
}

</script>
<style lang="less" scoped>
</style>
