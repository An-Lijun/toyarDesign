<template>
  <component :is="tag" ref="affixRef">
    <div :class="[nm.b(), nm.is('fixed', isFixed)]" :style="styles">
      <slot></slot>
    </div>
  </component>
</template>

<script setup>
import buildProps from '../../../utils/buildProps';
import {props, nm, emits,useAffix,propsData}  from './context'

defineOptions({
  name: "usEAffix",
});

const prop = defineProps(buildProps(propsData));
const emit = defineEmits(emits)
const { styles, isFixed, affixRef } = useAffix(prop, emit, nm)
</script>