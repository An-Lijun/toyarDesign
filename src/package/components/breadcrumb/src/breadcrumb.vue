<template>
  <div :class="[nm.b()]">
    <TySpace size="mini">
      <slot />
      <template #split>
        {{ separator }}
      </template>
    </TySpace>
  </div>
</template>
<script setup>
import TySpace from '../../space/index';
import { nm, breadProps } from './context.ts'
const props = defineProps(breadProps)
defineOptions({
  name: 'TyBreadcrumb'
})
</script>
<style lang="scss" scoped>
.ty-breadcrumb {
  padding: 24px;
}
</style>
