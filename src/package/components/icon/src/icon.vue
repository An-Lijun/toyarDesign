<template>
  <i
    :class="['toyar', nm.b(), icon]"
    :style="{
      fontSize: size > 0 ? size + 'px' : 'unset',
      color: color?color :''
    }"
  >
  </i>
</template>
<script lang="ts" setup>
import { iconProps,nm } from './context'
defineOptions({
  name:'TyIcon'
})
const props = defineProps(iconProps)
</script>
<style lang="scss" scoped>
.ty-icon {
  font-size: 1em;
  color: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
