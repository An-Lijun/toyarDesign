<template>
  <div :class="nm.bem('option-group')">
    <div :class="nm.bem('option-group','header')">
      <slot name="group">
        {{ title}}
      </slot>
    </div>
    <slot></slot>
    <div style="padding:  0 12px;">
      <TyDivider></TyDivider>
    </div>
  </div>
</template>
<script setup>
import  {nm} from './context'
import { groupProps } from './context'

defineOptions({
  name: 'TySelectGroup'
})
const props = defineProps(groupProps)

</script>
<style lang="scss" scoped>
.ty-select-option-group{

  &__header{
    margin: 5px 12px;
  }
}
</style>
