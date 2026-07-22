<template>
  <component :is="tag" ref="affixRef">
    <div :class="[nm.b(), nm.is('fixed', isFixed)]" :style="styles">
      <slot></slot>
    </div>
  </component>
</template>

<script setup>
import buildProps from '../../../utils/buildProps';
import { useProps, nm, useEmits,useAffix,staticProps }  from './context'

defineOptions({
  name: "usEAffix",
}); 

const prop = defineProps(buildProps(staticProps));
const emit = defineEmits(useEmits)
const { styles, isFixed, affixRef } = useAffix(prop, emit, nm)
</script>