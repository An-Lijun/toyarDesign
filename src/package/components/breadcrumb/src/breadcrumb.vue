<template>
  <div :class="[nm.b()]">
    <slot />
  </div>
</template>
<script setup>
import { nm, breadProps } from './context.ts'
const props = defineProps(breadProps)
defineOptions({
  name: 'TyBreadcrumb'
})
let numb = ref(1)
provide('separator', {
  separator: props.separator,
  numb: computed(()=> numb),
  setNumb: value => {
    numb.value = value
  }
})
</script>
<style lang="scss" scoped>
.ty-breadcrumb {
  padding: 24px;
}
</style>
