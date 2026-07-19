<template>
  <div :class="[nm.b(), nm.bem(direction)]">
    <span
      :class="[nm.e('inner'), nm.bem('','inner', position)]"
      v-if="useSlots().default"
    >
      <slot> </slot>
    </span>
  </div>
</template>
<script lang="ts" setup name="TyDivider">
import { useSlots } from 'vue'
import { dividerProps, nm } from './context'

defineOptions({
  name:'TyDivider'
})
defineProps(dividerProps)
</script>
