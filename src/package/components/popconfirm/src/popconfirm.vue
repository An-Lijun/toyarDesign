<template>
  <div :class="nm.b()" @click="handleShow" ref="containerRef">
    <div ref="popRef" :class="nm.e('confirm')"  v-show="isShowConfirm">
      <main>
        <slot name="content">
          {{ props.content }}
        </slot>
      </main>
      <div :class="nm.e('btnList')">
        <TyButton @click.stop="handleReject" type="secondary" size="mini" v-if="props.showRejectBtn">
          {{ props.rejectText }}
        </TyButton>
        <TyButton @click.stop="handleReslove" size="mini" v-if="props.showResloveBtn">
          {{ props.resloveText }}
        </TyButton>
      </div>
      <div ref="arrowRef" data-popper-arrow :class="nm.e('arrow')">
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { popProps, nm } from './context'
import { arrow, createPopper } from '@popperjs/core';

defineOptions({
  name: 'TyPopconfirm'
})
const props = defineProps(popProps)
let isShowConfirm = ref(false)
let popperInstance = null
const popRef = ref();
const arrowRef = ref();
const containerRef = ref();
const handleReslove = () => {
  isShowConfirm.value = false
}
const handleReject = () => {
  isShowConfirm.value = false
}

const handleShow=()=>{
  isShowConfirm.value = true
  createInstance()

}

const createInstance = () => {
  popperInstance = createPopper(unref(containerRef), unref(popRef), {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          // 偏移值 左右，上下
          offset: [0, 25]
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
.ty-popconfirm {
  position: relative;
  display: inline;

  &__confirm {
    position: absolute;
    display: block;
    z-index: 99;
    min-width: 180px;
    padding: 20px;
    // border: 1px solid #000;
    background-color: var(--tooltip);
    box-shadow: var(--box-shadow-2);
    border-radius: 5px;
    color: #fff;

    &>main {
      text-align: left;
      margin-bottom: 20px;
    }
  }

  &__btnList {
    display: flex;
    justify-content: center;
    align-items: center;

    .ty-button {
      margin: 0 5px;
    }
  }
}


[data-popper-placement="right"] {
  .ty-popconfirm__arrow {
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
  .ty-popconfirm__arrow {
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
  .ty-popconfirm__arrow {
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
  .ty-popconfirm__arrow {
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
  .ty-popconfirm__arrow {
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

</style>
