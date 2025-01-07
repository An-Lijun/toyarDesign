<template>
  <span :class="nmI.b()">
    <span :class="nmI.is('to',to.length)"   @click="onClick">
      <slot></slot>
    </span>
  </span>
</template>
<script setup>
import { nmI ,breadItemProps} from './context'
import {getCurrentInstance} from 'vue'

defineOptions({
  name: 'TyBreadcrumbItem'
})
const props = defineProps(breadItemProps)
const instance = getCurrentInstance()
const router = instance.appContext.config.globalProperties.$router 

const onClick = () => {
  if (!props.to || !router) return
  router.push(props.to)
}
</script>
<style lang="scss" scoped>
.ty-breadcrumb-item {
  color: var(--text-1);
  .is-to{
    font-weight: bold;
    &:hover{
      cursor: pointer;
      color: var(--primary-6);
    }
  }
}
</style>
