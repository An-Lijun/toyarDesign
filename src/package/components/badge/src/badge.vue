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

<script setup lang="ts" name="TyBadge">
import { badgeProp, nm } from './context'
import useBadge from './use-badge'

defineOptions({
  name: 'TyBadge'
})

const props = defineProps(badgeProp)
const { text } = useBadge(props, nm)
</script>