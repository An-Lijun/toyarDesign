<template>
  <div :class="[listNm.b(), listNm.m(size)]">
    <header :class="listNm.e('header')">
      <slot name="header">
        {{ props.header }}
      </slot>
    </header>
    <div :class="listNm.e('content')">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { listProps, listNm } from './context'

defineOptions({
  name:'TyList'
})

const props = defineProps(listProps)

provide('listValue', {
  size: props.size
})
</script>

