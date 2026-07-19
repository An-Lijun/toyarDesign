<template>
  <div :class="[listNm.b(item),listNm.bem(item,'',size)]">
    <slot></slot>
  </div>
</template>
<script setup>
import { inject } from 'vue'
import {listNm } from './context'

defineOptions({
  name:'TyListItem'
})
const { size } = inject('listValue')
</script>
