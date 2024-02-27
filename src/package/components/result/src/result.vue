<template>
  <div :class="['ty-result', `ty-result-${type}`]">
    <div class="ty-result-icon">
      <TyIcon :icon="msgIconObj[type]"  :color="`var(--${colorObj[type]}-5)`" 
        :style="{
          fontSize: `${size}px`
        }"
      />
    </div>
    <div class="ty-result-title" v-if="title">
      {{ title }}
    </div>
    <div class="ty-result-subTitle" v-if="subTitle">
      {{ subTitle }}
    </div>
  </div>
</template>
<script setup>
import TyIcon from '../../icon'
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(value) {
      return ['info', 'success', 'warning', 'error'].includes(value)
    }
  },
  title: {
    type: String
  },
  subTitle: {
    type: String
  },
  size:{
    type:String,
    default:'100'
  }
})

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


  .ty-result-title {
    font-size: 30px;
    margin: 20px 0 15px 0;
    color:var(--text-1);
  }

  .ty-result-subTitle {
    font-size: 20px;
    color:var(--text-2);

  }
}
</style>
