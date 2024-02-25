<template>
  <transition name="ty-message-fade" >
  <div
    v-show="visible"
    :style="{
      top: `${top}px`
    }"
    :class="['ty-message', `ty-message-${type}`]"
  >
    <div class="ty-message-icon">
      <slot name="icon">
        <TyIcon :icon="msgIconObj[type]"></TyIcon>
      </slot>
    </div>
    <div class="ty-message-msg">
      {{ msg }}
    </div>
    <div class="ty-message-close">
      <slot name="close">
        <TyIcon icon="ty-close-fill"></TyIcon>
      </slot>
    </div>
  </div>
</transition>

</template>
<script setup>
import TyIcon from '../../icon'
const props = defineProps({
  msg: {
    type: String,
    required: true
  },
  options: {
    type: Object
  },
  top: {
    type: String,
    default: '0'
  }
})
const a = inject('aa')
console.log(a);
const visible= ref(false)
const msgIconObj = {
  info: 'ty-information-fill',
  success: 'ty-checkbox-circle-fill',
  warning: 'ty-information-fill',
  error: 'ty-close-circle-fill'
}
const type = msgIconObj.hasOwnProperty(props.options.type)
  ? props.options.type
  : 'info'

onMounted(()=>{
  visible.value= true  
})
onBeforeMount(() => {
  visible.value = false  
})
setTimeout(() => {
  visible.value = false  
}, 2500);

</script>
<style lang="scss" scoped>


.ty-message-fade-enter-active,
.ty-message-fade-leave-active {
  transition: all 1s ease;
}
.ty-message-fade-enter-from,
.ty-message-fade-leave-to {
  transform: translate(-50%, -100%) !important;
  opacity: 0;
}
.ty-message {
  position: fixed;
  left: 50%;
  width: 500px;
  height: 50px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  transform: translateX(-50%);

  .ty-message-icon,
  .ty-message-close {
    width: 40px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ty-message-msg {
    flex: 1;
    text-align: left;
  }

  // ---------------Message状态样式
  @mixin addMessageState($state, $value) {
    &.ty-message-#{$state} {
      background-color: var(--#{$value}-2);
      border: 1px solid var(--#{$value}-3);
      color: var(--#{$value}-5);

      .ty-message-icon,
      .ty-message-close {
        --toyar-gray-10: var(--#{$value}-7);
      }
    }
  }

  @each $state,
    $value
      in (
        'info': 'primary',
        'success': 'success',
        'warning': 'warning',
        'error': 'danger'
      )
  {
    @include addMessageState($state, $value);
  }
}
</style>
