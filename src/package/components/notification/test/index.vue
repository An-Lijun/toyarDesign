<template>
  <div>
  <TyButton @click="notification">notification</TyButton>
  <TyButton @click="notification1">notification1</TyButton>

  </div>
</template>
<script setup>
import TyNotification from '../index'

const notification =()=>{
    TyNotification('你好Ty-Design',{
    time:3500,
    type:'success'
  })
}
const notification1 =()=>{
   TyNotification('你好Ty-Design',{
    time:3500,
    type:'error'
  })
}
</script>
