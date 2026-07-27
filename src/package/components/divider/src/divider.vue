<template>
  <div :class="[nm.b(), nm.bem(direction)]">
    <span
      :class="[nm.e('inner'), nm.bem('', 'inner', position)]"
      v-if="hasDefaultSlot()"
    >
      <slot> </slot>
    </span>
  </div>
</template>
<script lang="ts" setup name="TyDivider">
import { nm, useProps } from './context'
import useDivider from './use-divider'

defineOptions({
  name: 'TyDivider'
})

const props = defineProps(useProps)
const { hasDefaultSlot } = useDivider(props)
</script>
