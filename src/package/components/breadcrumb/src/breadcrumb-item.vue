<template>
  <span :class="nmI.b()">
    <span :class="nmI.is('to',to.length)"   @click="onClick">
      <slot></slot>
    </span>
    <span :class="nmI.e('separator')" v-if="(value+1) !== bread.numb.value.value">
      {{ bread.separator }}
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
const bread = inject('separator', null)
const instance = getCurrentInstance()
const router = instance.appContext.config.globalProperties.$router 

let {value} = bread.numb.value
bread.setNumb(value+1)
const onClick = () => {
  if (!props.to || !router) return
  // props.replace ? router.replace(props.to) : 
  router.push(props.to)
}
</script>
<style lang="scss" scoped>
.ty-breadcrumb-item {
  color: var(--text-1);

  &__separator {
    margin: 0 6px;
  }
  .is-to{
    font-weight: bold;
    &:hover{
      cursor: pointer;
      color: var(--primary-6);
    }
  }
}
</style>
