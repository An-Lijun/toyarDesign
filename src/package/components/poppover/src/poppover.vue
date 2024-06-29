<template>
  <div :class="nm.b()" v-on="eventMaps">
    <div :class="[nm.e('content'), nm.is(placement)]" :style="style" v-show="isShowConfirm">
      <main>
        <slot name="content">
          {{ props.content }}
        </slot>
      </main>
    </div>
    <span ref="defaultSlot" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { popProps, nm } from './context'
defineOptions({
  name: 'TyPoppover'
})
const props = defineProps(popProps)

const defaultSlot = ref()
let eventMaps = ref({})
let isShowConfirm = ref(false)
let now = false
const handleClick = (e) => {
  setTimeout(() => {
    isShowConfirm.value = !isShowConfirm.value
  })
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
const clickFn = () => {
  isShowConfirm.value = false
}
window.addEventListener('click', clickFn)
onUnmounted(() => {
  window.removeEventListener('click', clickFn)
})

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
let style = ref('')
onMounted(() => {
  let { width, height } = getComputedStyle(defaultSlot.value)
  width = width.slice(0, -2)
  height = height.slice(0, -2)

  const getPlacement = () => {
    switch (props.placement) {
      case 'tl':
        return {
          top: '0',
          left: '50%',
          transform: `translate(calc(0% - ${width / 2}px), calc(-100% - 15px))`,
          '--ui-width': width + 'px',
          '--ui-height': width + 'px',
        }
      case 'top':
        return {
          top: '0',
          left: '50%',
          transform: 'translate(-50%, calc(-100% - 15px))'
        }
      case 'tr':
        return {
          top: '0',
          right: '0%',
          transform: `translate(calc(0%), calc(-100% - 15px))`
        }
      case 'bl':
        return {
          top: '0',
          left: '50%',
          transform: `translate(calc(0% - ${width / 2}px), 50%)`,
          '--ui-width': width + 'px',
          '--ui-height': width + 'px',
        }
      case 'bottom':
        return {
          top: '0',
          left: '50%',
          transform: 'translate(-50%, calc(50% - 5px))'
        }
      case 'br':
        return {
          top: '0',
          right: '0%',
          transform: `translate(calc(0% ), 50%)`,
          '--ui-width': width + 'px',
          '--ui-height': width + 'px',
        }
    }
  }
  style.value = getPlacement()
})

</script>
<style lang="scss" scoped>
.ty-poppover {
  position: relative;
  display: inline;
  color: var(--text-2);

  &__content {
    position: absolute;
    display: block;
    z-index: 99;
    min-width: 180px;
    padding: 20px;
    background-color: var(--bg-5);
    border-radius: 4px;
    border: 1px solid var(--toyar-gray-3);

    &>main {
      margin-bottom: 20px;
      text-align: left;
    }

    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 20px;
      height: 20px;
      border: 1px solid var(--toyar-gray-3);
      bottom: -20px;
      background-color: var(--bg-5);
      transform: rotate(45deg);
      z-index: 95;
    }

    &.is-tl {
      &:after {
        position: absolute;
        bottom: unset;
        bottom: -20px;
        border-top-color: var(--bg-5);
        transform: translate(-50%, -12px) rotate(45deg);
        border: 1px solid var(--toyar-gray-3);
        ;

      }
    }

    &.is-top {
      &:after {
        position: absolute;
        bottom: unset;
        bottom: -20px;
        left: 50%;

        border-top-color: var(--bg-5);
        transform: translate(-50%, -12px) rotate(45deg);

      }
    }

    &.is-tr {
      &:after {
        position: absolute;
        bottom: unset;
        bottom: -20px;

        border-top-color: var(--bg-5);
        transform: translate(-50%, -12px) rotate(45deg);
        right: 0%;
      }
    }

    &.is-bl {
      &:after {
        position: absolute;
        bottom: unset;
        top: -20px;

        border-bottom-color: var(--bg-5);
        transform: translate(0%, 12px) rotate(45deg);
      }
    }

    &.is-bottom {
      &:after {
        position: absolute;
        bottom: unset;
        top: -20px;
        left: 50%;

        border-bottom-color: var(--bg-5);
        transform: translate(-50%, 12px) rotate(45deg);
      }
    }

    &.is-br {
      &:after {
        position: absolute;
        bottom: unset;
        top: -20px;

        border-bottom-color: var(--bg-5);
        right: 0;
        transform: translate(-50%, 12px) rotate(45deg);
      }
    }
  }
}
</style>
