<template>
  <div :class="[nm.b(),nm.m(type)]">
    <div class="ty-result-icon">
      <component :is="msgIconObj[type]" :size="size" :color="`var(--${colorObj[type]}-5)`"></component>
    </div>
    <div :class="nm.e('title') " v-if="title">
      {{ title }}
    </div>
    <div  :class="nm.e('subTitle') "  v-if="subTitle">
      {{ subTitle }}
    </div>
  </div>
</template>
<script setup>
import {resProps,nm} from './context'

import { TyiInformationFill,TyiCheckboxCircleFill,TyiCloseCircleFill } from 'toyaricon'
defineOptions({
  name:'TyResult'
})
const props = defineProps(resProps)

const msgIconObj = {
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
</script>
<style lang="scss" scoped>
.ty-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:100%;


  &__title {
    font-size: 30px;
    margin: 20px 0 15px 0;
    color:var(--text-1);
  }

  &__subTitle {
    font-size: 20px;
    color:var(--text-2);
  }
}
</style>
