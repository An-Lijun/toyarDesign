<template>
  <div :class="[nm.b(), nm.m(props.status), nm.is('dot', dot)]">
    <slot></slot>
    <span :class="nm.e('text')">
      <slot name="icon">
        {{ text }}
      </slot>
    </span>
  </div>
</template>
<script setup lang='ts' name="TyBadge">
import { computed } from 'vue'
import { badgeProp,nm } from './context'

defineOptions({
  name:'TyBadge'
})
const props = defineProps(badgeProp)

const text = computed(() => {
  if (props.dot) {
    return ''
  }
  if (!isNaN(props.text as number)) {
    const text = Number(props.text)
    return text > props.max ? props.max + '+' : text
  }
  return props.text
})
</script>

