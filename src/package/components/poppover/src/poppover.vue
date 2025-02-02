<template>
  <div :class="nm.b()" v-on="eventMaps"  ref="containerRef">
      <div :class="[nm.e('content')]"  v-show="isShowConfirm" ref="popRef">
        <main>
          <slot name="content">
            {{ props.content }}
          </slot>
        </main>
        <div ref="arrowRef" data-popper-arrow :class="nm.e('arrow')">
        </div>
      </div>

    <span ref="defaultSlot" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { popProps, nm } from './context'
import { arrow, createPopper } from '@popperjs/core';

defineOptions({
  name: 'TyPoppover'
})
const props = defineProps(popProps)

let popperInstance = null
const popRef = ref();
const arrowRef = ref();
const containerRef = ref();

const defaultSlot = ref()
let eventMaps = ref({})
let isShowConfirm = ref(false)
let now = false
const handleClick = (e) => {
  setTimeout(() => {
    isShowConfirm.value = !isShowConfirm.value
    createInstance()

  })
}
const handleEnter = () => {
  createInstance()

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
const createInstance = () => {
  popperInstance = createPopper(unref(containerRef), unref(popRef), {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          // 偏移值 左右，上下
          offset: [0, 10]
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
.ty-poppover {
  position: relative;
  display: inline-block;
  color: var(--text-2);

  &__content {
    position: absolute;
    display: block;
    z-index: 99;
    min-width: 180px;
    padding: 20px;
    background-color: var(--tooltip);
    border-radius: 4px;
    border: 1px solid var(--toyar-gray-3);
    z-index: 999;
    color: #fff;

    &>main {
      margin-bottom: 20px;
      text-align: left;
    }
  }
}




[data-popper-placement="right"] {
  .ty-poppover__arrow {
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
  .ty-poppover__arrow {
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
  .ty-poppover__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    /* 调整箭头大小 */
    border-color: transparent transparent var(--tooltip) transparent;

    top: -13px;
    z-index: 999;
    /* 调整箭头颜色 */
  }
}

[data-popper-placement="left"] {
  .ty-poppover__arrow {
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
  .ty-poppover__arrow {
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

[data-popper-placement="top-end"] {
  .ty-poppover__arrow {
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
[data-popper-placement="top-end"] {
  .ty-poppover__arrow {
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
[data-popper-placement="top-start"] {
  .ty-poppover__arrow {
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
[data-popper-placement="bottom-end"] {
  .ty-poppover__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    /* 调整箭头大小 */
    border-color: transparent transparent var(--tooltip) transparent;

    z-index: 999;
    top: -13px;
    /* 调整箭头颜色 */
  }
}
[data-popper-placement="bottom-start"] {
  .ty-poppover__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    /* 调整箭头大小 */
    border-color: transparent transparent var(--tooltip) transparent;

    z-index: 999;
    top: -13px;
    /* 调整箭头颜色 */
  }
}
</style>
