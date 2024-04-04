<template>
  <div class="divRoot">
    <TyButton @click="message">message</TyButton>
    <TyButton @click="message1">message1</TyButton>
  </div>
</template>
<script setup>
// import {TyMessage} from '../../../../src/package/index.ts'
import TyMessageJs  from '../index'

const message = () => {
  TyMessageJs('你好?', {
    time: 3500,
    type: 'success'
  })
}
const message1 = () => {
  TyMessageJs.warning('你好??')
}
</script>
<style lang="less" scoped></style>
