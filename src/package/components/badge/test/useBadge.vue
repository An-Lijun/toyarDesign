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
import { props, nm, useBadge, propsData } from './context'

defineOptions({
  name: 'UseBadge'
})

const prop = defineProps(buildProps(propsData))
const { text } = useBadge(prop, nm)
</script>