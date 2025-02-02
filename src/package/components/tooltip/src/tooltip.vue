<template>
  <transition>
    <div :class="nm.b()" ref="containerRef" v-on="eventMaps">
      <div :class="nm.e('tip')" v-show="isShowTip" ref="popRef">
        {{ props.content }}
        <div ref="arrowRef" data-popper-arrow :class="nm.e('arrow')">
        </div>
      </div>
      <span>
        <slot></slot>
      </span>
    </div>
  </transition>
</template>
<script setup>
import { nextTick, ref, unref } from 'vue'
import { toolProps, nm } from './context'
import { arrow, createPopper } from '@popperjs/core';
defineOptions({
  name: 'TyTooltip'
})
const props = defineProps(toolProps)
let eventMaps = ref({})
let isShowTip = ref(false)

const popRef = ref();
const arrowRef = ref();
const containerRef = ref();
let popperInstance = null
const handleClick = () => {
  isShowTip.value = !isShowTip.value
  createInstance()
}
const handleEnter = () => {
  isShowTip.value = true
  createInstance()
}
const handleLeave = () => {
  isShowTip.value = false
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
// v-show="isShowTip"
// top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
const destroyPopper = () => {
  // 销毁 Popper 实例
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}
const createInstance = () => {

  popperInstance = createPopper(unref(containerRef), unref(popRef), {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          // 偏移值 左右，上下
          offset: [0, 5]
        }
      },
      {
        name: 'arrow',
        options: {
          element: unref(arrowRef),
        }
      }
    ]
  });
  nextTick(() => {
    // 异步更新
    popperInstance.update()
  })
}


</script>
<style lang="scss" scoped>
.ty-tooltip {
  position: relative;
  display: inline-block;

  &:hover {
    cursor: pointer;
  }

  &__tip {
    position: absolute;
    display: inline-block;
    z-index: 99;
    background-color: var(--tooltip);
    border-radius: 5px;
    min-height: 30px;
    line-height: 30px;
    // width: 3%;
    padding: 0 5px;

    white-space: auto;
    // width: 150%;
    color: #fff;
    text-align: center;
  }

  &__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    /* 调整箭头大小 */
    border-color: transparent transparent var(--tooltip) transparent;
    z-index: 999;
    /* 调整箭头颜色 */
  }
}



.v-enter-active,
.v-leave-active {
  transition: opacity .3s ease-out, transform .3s ease-out;
  opacity: 1;
  transform: scaleY(1);
  transform-origin: center top;
}

[data-popper-placement="right"] {
  .ty-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    /* 调整箭头大小 */
    border-color: transparent var(--tooltip) transparent transparent;
    left: -13px;
    z-index: 999;
    /* 调整箭头颜色 */
  }
}

[data-popper-placement="top"] {
  .ty-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    /* 调整箭头大小 */
    border-color: var(--tooltip) transparent transparent transparent;
    z-index: 999;
    bottom: -13px;
    /* 调整箭头颜色 */
  }
}

[data-popper-placement="bottom"] {
  .ty-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    /* 调整箭头大小 */
    border-color: var(--tooltip) transparent transparent transparent;
    border-color: transparent transparent var(--tooltip) transparent;

    top: -13px;
    z-index: 999;
    /* 调整箭头颜色 */
  }
}

[data-popper-placement="left"] {
  .ty-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    /* 调整箭头大小 */
    border-color: transparent transparent transparent var(--tooltip);
    right: -13px;
    z-index: 999;
    /* 调整箭头颜色 */
  }
}

[data-popper-placement="right"] {
  .ty-tooltip__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    /* 调整箭头大小 */
    border-color: transparent var(--tooltip) transparent transparent;
    left: -13px;
    z-index: 999;
    /* 调整箭头颜色 */
  }
}


.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
