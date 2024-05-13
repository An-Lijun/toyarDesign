<template>
  <div v-if="model === props.name">
    <!-- <div>{{ props.title }}</div> -->
    <slot></slot>
  </div>
</template>
<script setup>
import {inject} from 'vue'

defineOptions({
  name:'TyTabItem'
})
const props = defineProps({
  title: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
})
const {model,itemChange,setHeader,is} =inject('tabValue',{})
setHeader && setHeader({
  name:props.name,
  title:props.title
})
</script>
<style lang="scss" scoped>
</style>
