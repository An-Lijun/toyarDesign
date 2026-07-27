<template>
  <div :class="nm.b()">
    <div :class="nm.e('inner')">
      <slot name="icon">
        <TyiInbox2Line :size="size" />
      </slot>
      <span>
        {{ title }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts" name="TyEmpty">
import { TyiInbox2Line } from 'toyaricon'
import { nm, useProps } from './context'
import useEmpty from './use-empty'

defineOptions({
  name: 'TyEmpty'
})

const props = defineProps(useProps)
useEmpty(props)
</script>
