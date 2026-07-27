<template>
  <div :class="nm.b()">
    <slot />
  </div>
</template>
<script setup>
import { nm, useProps } from './context'
import useConfigProvider from './use-configProvider'

defineOptions({
  name: 'TyConfigProvider'
})

const props = defineProps(useProps)
useConfigProvider(props)
</script>
<style lang="less" scoped></style>
