<template>
  <div :class="nm.b()" :style="style">
    <div :class="[nm.e('title')]">
      <TyIcon :icon="cauIconObj[type]" :color="`var(--${colorObj[type]}-5)`" 
        :style="{
          fontSize: `${size}px`
        }"
      />
      <span>
        {{ title }}
      </span>
    </div>
    <div :class="[nm.e('subTitle')]">
      <slot> </slot>
    </div>
  </div>
</template>
<script setup>
import {cProps,nm} from './context'
defineOptions({
  name:'TyCaution'
})
const props = defineProps(cProps)
const cauIconObj = {
  info: 'ty-information-fill',
  success: 'ty-checkbox-circle-fill',
  warning: 'ty-information-fill',
  error: 'ty-close-circle-fill'
}
const colorObj = {
  'info': 'primary',
  'success': 'success',
  'warning': 'warning',
  'error': 'danger'
}
const style={
  background:`rgba(var(--danger-6), .2)`
}
// var(--primary-6)
</script>
<style lang="scss" scoped>
.ty-caution{
}
</style>
