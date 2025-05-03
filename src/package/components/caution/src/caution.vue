<template>
  <div :class="nm.b()" :style="style">
    <component v-if="isShowIcon"  :is="cauIconObj[type]" :size="size"  style="font-size: 24px;margin-right: 10px;" :color="`var(--${colorObj[type]}-5)`"></component>
    <div :class="nm.e('content')">
      <div :class="[nm.e('title')]">
        <span>
          {{ title }}
        </span>
      </div>
      <div :class="[nm.e('subTitle')]" v-if="$slots.default">
        <slot> </slot>
      </div>
    </div>

  </div>
</template>
<script setup>
import { cProps, nm } from './context'
import { TyiInformationFill,TyiCheckboxCircleFill,TyiCloseCircleFill } from 'toyaricon'

defineOptions({
  name: 'TyCaution'
})
const props = defineProps(cProps)
const cauIconObj = {
  info: TyiInformationFill,
  success: TyiCheckboxCircleFill,
  warning: TyiInformationFill,
  error: TyiCloseCircleFill
}
const colorObj = {
  'info': 'primary',
  'success': 'success',
  'warning': 'warning',
  'error': 'danger'
}
const style = {
  background: `var(--${colorObj[props.type]}-2)`
  // background:`rgba(var(--danger-6), .2)`
}
// var(--primary-6)
</script>
<style lang="scss" scoped>
.ty-caution {
  padding: var(--padding-4) var(--padding-6);
  border-radius: var(--border-radius-4);
  display: flex;
  align-items: center;
  &__content{
    width: 100%;
  }
  &__title {
    color: var(--text-1);
    font-weight: 500;
    font-size: 16px;
  }
  &__subTitle {
    color: var(--text-2);
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
