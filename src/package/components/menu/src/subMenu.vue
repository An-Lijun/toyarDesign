<template>
  <div :class="[subNm.b()]" ref="subMenu">
    <div :class="subNm.e('inner')" @click.stop="openChildMenu">
      <menuIndex :compLevel="compLevel" class="menuIndex" />
      <div :class="subNm.e('icon')" :style="compStyle">
        <slot name="icon"></slot>
      </div>
      <div :class="subNm.e('text')">
        <slot name="title"></slot>
      </div>
      <div :class="[subNm.e('arrow'), subNm.is('opened', isOpened)]" >
        <TyiArrowDownSLine/>
      </div>
    </div>
    <div :class="[
      subNm.e('content'),
      subNm.is('opend', isOpened),
    ]">
      <ul ref="popRef">
        <slot></slot>
        <div :class="subNm.e('arrowLeft')" ref="arrowRef">
        </div>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts" name="TySubMenu">
import { injectLevel } from './hooks/level.ts'
import { subNm } from './context'
import { inject, ref, unref, computed } from 'vue'
import menuIndex from './menuIndex.vue'
import { arrow, createPopper } from '@popperjs/core';
import {TyiArrowDownSLine} from 'toyaricon'
defineOptions({
  name: 'TySubMenu'
})
const props = defineProps({
  index: String,
  option: {
    type: Array
  },
  data: String
})
let isOpened = ref(false)
const compLevel = injectLevel(true)
const menuProvide = inject('menu', {})
const subMenu = ref() // menuref

let popperInstance = null
const popRef = ref();
const arrowRef = ref();
const createInstance = () => {
  popperInstance = createPopper(unref(subMenu), unref(popRef), {
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        options: {
          // 偏移值 左右，上下
          offset: [0, 20]
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

const openChildMenu = () => {

  menuProvide.clickSubMenu(props.index)
  if (menuProvide.isFold.value) {
    createInstance()
  } else {
    popperInstance?.destroy()
  }
  isOpened.value = !isOpened.value

}

const compStyle = computed(() => {
  return { '--toyar-gray-10': isOpened.value ? 'var(--toyar-xblue-6)' : '' }
})


const clickFn = () => {
  if (menuProvide.isFold.value) {
    isOpened.value = false
  }
}
window.addEventListener('click', clickFn)
onUnmounted(() => {
  window.removeEventListener('click', clickFn)
})

</script>
<style lang="scss" scoped>
.ty-sub-menu {
  width: 100%;
  color: var(--text-2);
  position: relative;
  font-size: var(--font-body-3);

  &:hover {
    // background-color: var(--toyar-gray-2);
  }

  &__inner {
    line-height: 40px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }


  &__icon {
    width: 50px;
    min-width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    flex: 1;
  }

  &__arrow {
    width: 40px;
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__arrow.is-opened {
    transform: rotate(180deg);
  }

  &__content {
    display: grid;
    grid-template-rows: 0fr;
    transition: 0.3s;
    overflow: hidden;

    &>ul {
      min-height: 0;
      margin: unset;
      padding: unset;
      border: unset;
    }

    &.is-opend {
      grid-template-rows: 1fr;
      // .ty-menu-item{
      //   background-color: red !important;
      // }
      background-color: var(--menu-open);

      ul {
        border-radius: 3px;
      }
    }
  }



}

[data-popper-placement="right"] {
  .ty-sub-menu__arrowLeft {
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    /* 调整箭头大小 */
    border-color: transparent var(--color-bg-2) transparent transparent;
    left: -16px;
    z-index: 999;

    /* 调整箭头颜色 */
  }
}

.is-fold {
  & .ty-sub-menu__inner {
    padding: unset;

    &>.ty-sub-menu__icon {
      width: 40px;
      min-width: 40px;
    }
  }

  & .ty-sub-menu__content {
    overflow: auto;
    position: fixed;
    left: 0px;
    z-index: 150;

    &.is-opend {
      grid-template-rows: 1fr;
      overflow: unset;

      &>ul {
        display: block;
        box-sizing: border-box;
        background-color: var(--color-bg-2);
        color: var(--text-2);
        border: 1px solid var(--color-bg-2);
      }
    }
  }
}
.ty-menu:not(.is-fold){
  .ty-sub-menu__content{
    ul{
      position: relative!important;
      transform: unset!important;
    }
  }
}
</style>
