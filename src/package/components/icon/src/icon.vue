<template>
  <i
    :class="['toyar', icon]"
    :style="{
      fontSize: props.size > 0 ? size + 'px' : 'unset',
      color: color
    }"
  >
  </i>
</template>
<script lang="ts" setup>
import { iconProps } from './context'
defineOptions({
  name:'TyIcon'
})
const props = defineProps(iconProps)
</script>
<style lang="scss" scoped>
.ty-icon {
  font-size: 1em;
  color: var(--toyar-gray-10);
}
</style>
