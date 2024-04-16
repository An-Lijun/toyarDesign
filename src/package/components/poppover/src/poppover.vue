<template>
  <div :class="nm.b()" v-on="eventMaps">
    <div
      :class="[nm.e('content'), nm.is(placement)]"
      :style="style"
      v-show="isShowConfirm"
    >
      <main>
        <slot name="content">
          {{ props.content }}
        </slot>
      </main>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { popProps, nm } from './context'
defineOptions({
  name: 'TyPoppover'
})
const props = defineProps(popProps)
let eventMaps = ref({})
let isShowConfirm = ref(false)
let now = false
const handleClick = () => {
  isShowConfirm.value = !isShowConfirm.value
}
const handleEnter = () => {
  isShowConfirm.value = true
  now = true
}
const handleLeave = () => {
  now = false
  setTimeout(() => {
    if (!now) {
      isShowConfirm.value = false
    }
  }, 150)
}
switch (props.trigger) {
  case 'click':
    eventMaps.value = {
      click: handleClick
    }
    break
  case 'hover':
    eventMaps.value = {
      mouseenter: handleEnter,
      mouseleave: handleLeave
    }
    break
  default:
    eventMaps.value = {
      click: handleClick
    }
}

const getPlacement = () => {
  switch (props.placement) {
    case 'top':
      return {
        top: '0',
        left: '50%',
        transform: 'translate(-50%, calc(-100% - 5px))'
      }
    case 'bottom':
      return {
        top: '0',
        left: '50%',
        transform: 'translate(-50%, calc(50% - 5px))'
      }
  }
}
let style = ref(getPlacement())
</script>
<style lang="scss" scoped>
.ty-poppover {
  position: relative;
  display: inline;
  &__content {
    position: absolute;
    display: block;
    z-index: 99;
    min-width: 180px;
    padding: 20px;
    // border: 1px solid #000;
    background-color: var(--color-bg-2);
    box-shadow: var(--box-shadow-2);
    border-radius: 5px;
    color: var(--text-1);
    & > main {
      margin-bottom: 20px;
      text-align: left;
    }

    &:after {
      content: '';
      display: inline-block;
      // width: 10px;
      // height: 10px;
      // background-color: red;
      position: absolute;
      border: 10px solid transparent;
      border-top-color: var(--color-bg-2);
      bottom: -20px;
      left: 50%;
      transform: translate(-50%, -2px);
    }
    &.is-bottom {
      &:after {
        position: absolute;
        transform: translate(-50%, -2px);
        bottom: unset;
        top: -20px;
        border-color: transparent;
        border-bottom-color: var(--color-bg-2);
        transform: translate(-50%, 2px);
      }
    }
  }
}
</style>
