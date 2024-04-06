<template>
  <div :class="[nm.b(),nm.m(type)]">
    <div class="ty-result-icon">
      <TyIcon :icon="msgIconObj[type]"  :color="`var(--${colorObj[type]}-5)`" 
        :style="{
          fontSize: `${size}px`
        }"
      />
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
import TyIcon from '../../icon'
import {resProps,nm} from './context'

defineOptions({
  name:'TyResult'
})
const props = defineProps(resProps)

const msgIconObj = {
  info: 'ty-information-fill',
  success: 'ty-checkbox-circle-fill',
  warning: 'ty-information-fill',
  error: 'ty-close-circle-fill'
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
