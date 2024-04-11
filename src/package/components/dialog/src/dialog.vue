<template>
  <!-- @click.self避免冒泡，只有点击自己时才能触发   -->
  <div :class="nm.e('wrapper')" @click.self="handleClose" v-show="modelValue">
    <transition name="dialog-fade">
      <div
        :class="nm.b()"
        :style="{ width, top }"
        ref="tyDialog"
        v-show="modelValue"
      >
        <div :class="[nm.e('header'),nm.is('underLine',isUnderLine)]" ref="tyDialogHeader" >
          <slot name="title">
            <!-- 将span放到slot内，这样不仅可以定义title文本，还可以定义样式等 -->
            <span :class="nm.e('title')">
              {{ title }}
            </span>
          </slot>
          <button :class="nm.e('headerBtn')" @click="handleClose">
            <TyIcon icon="ty-close-fill"></TyIcon>
          </button>
        </div>
        <div :class="nm.e('body')">
          <!-- 内容可能是除span以外的其他内容，比如列表等，所以在这里使用插槽，并且不规定插槽内具体的标签 -->
          <!-- 并且在这里使用匿名插槽，使用匿名插槽的好处就是不用指定名称，这样在不使用<template v-slot>指定插槽内容的时候，也可以自定义内容 -->
          <slot>
            {{ info }}
          </slot>
        </div>
        <div :class="nm.e('footer')" v-if="useSlots().footer">
          <!-- 如果footer不传递内容，则不显示footer -->
          <slot name="footer"> </slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup name="TyDialog">

import TyIcon from '../../icon'
import { onMounted, useSlots, ref } from 'vue'
import { dialogProp, dialogEmit, nm } from './context'
defineOptions({
  name:'TyDialog'
})
 defineProps(dialogProp)
const emits = defineEmits(dialogEmit)

const tyDialogHeader = ref()
const tyDialog = ref()
let x = 0
let y = 0
onMounted(() => {
  const moveDialog = e => {
    //先获取鼠标在dialog头上点击的位置
    tyDialog.value.style.margin = 0
    let moveX = e.pageX - x
    let moveY = e.pageY - y
    tyDialog.value.style.left = moveX + 'px'
    tyDialog.value.style.top = moveY + 'px'
  }
  tyDialogHeader.value.addEventListener('mousedown', e => {
    x = e.pageX - tyDialog.value.offsetLeft
    y = e.pageY - tyDialog.value.offsetTop
    if (document) {
      document?.addEventListener('mousemove', moveDialog)
    }
  })
  tyDialogHeader.value.addEventListener('mouseup', () => {
    if (document) {
      document?.removeEventListener('mousemove', moveDialog)
    }
  })
})

function handleClose () {
  emits('update:modelValue', false)
}
</script>
<style lang="scss" scoped>
.ty-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: var(--zindex-50);
  background-color: var(--opcity-5);
  color: var(--text-1);

  .ty-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: var(--color-bg-2);
    border-radius: var(--border-radius-2);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;

    &__header {
      padding: 20px 20px 10px;
      cursor: move;

      .ty-dialog__title {
        line-height: 24px;
        font-size: 18px;
      }

      .ty-dialog__headerBtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        color: var(--text-1);

        .ty-icon-close {
          vertical-align: bottom;
        }
      }
      &.is-underLine{
        border-bottom: 1px solid var(--border-color-2);
      }
    }

    &__body {
      padding: 30px 20px;
      font-size: 14px;
      word-break: break-all;
    }

    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;

      ::v-deep .ty-button:first-child {
        margin-right: 20px;
      }
    }
  }
}

.dialog-fade-enter-active {
  animation: fade 0.5s;
}

.dialog-fade-leave-active {
  animation: fade 0.5s reverse;
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
