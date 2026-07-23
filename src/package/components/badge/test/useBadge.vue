<template>
  <div :class="[nm.b(), nm.m(prop.status), nm.is('dot', prop.dot)]">
    <slot></slot>
    <span :class="nm.e('text')">
      <slot name="icon">
        {{ text }}
      </slot>
    </span>
  </div>
</template>

<script setup>
import buildProps from '../../../utils/buildProps'
import { useProps, nm, useBadge, staticProps } from './context'

defineOptions({
  name: 'UseBadge'
})

const prop = defineProps(useProps)
const { text } = useBadge(prop, nm)
</script>