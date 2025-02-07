<template>
  <div :class="[subNm.b(), subNm.is('fold', !isShowRef)]" ref="subMenu">
    <div :class="subNm.e('inner')" @click="openChildMenu">

      <template v-if="isShowRef">
        <menuIndex :compLevel="compLevel" />
      </template>

      <div :class="subNm.e('icon')" :style="compStyle">
        <slot name="icon"></slot>
      </div>
      <div :class="subNm.e('text')" v-if="isShowRef">
        <slot name="title"></slot>
      </div>
      <div :class="[subNm.e('arrow'), subNm.is('opened', isOpened)]" v-if="isShowRef ? true : compLevel > 0">
        <TyIcon icon="ty-arrow-down-s-line"></TyIcon>
      </div>
    </div>
    <div :style="{
      transform: !isShowRef
        ? `translate(${width}px,-40px)`
        : ''
    }" :class="[
      subNm.e('content'),
      subNm.is('opend', isOpened),
      subNm.is('fold', !isShowRef)
    ]">
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts" name="TySubMenu">
import { injectLevel } from './hooks/level.ts'
import { subNm } from './context'
import { inject, ref, watch, provide, computed } from 'vue'
import menuIndex from './menuIndex.vue'
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
let isShowRef = ref(true)

let width = ref(0)
const openChildMenu = () => {
  if (menuProvide.isFold.value) {
    let data = subMenu.value.getBoundingClientRect().width + 10
    if (compLevel.value === 0) {
      data += subMenu.value.getBoundingClientRect().left
    }
    width.value = data
  }
  menuProvide.setOpenId(props.index)
  menuProvide.clickSubMenu(props._mItem)
  setTimeout(() => {
    isOpened.value = !isOpened.value
  })
}

const compStyle = computed(() => {
  return { '--toyar-gray-10': isOpened.value ? 'var(--toyar-xblue-6)' : '' }
})

if (menuProvide) {
  watch(
    () => menuProvide.isFold,
    newVal => {
      isShowRef.value = !newVal.value
    },
    {
      deep: true,
      immediate: true
    }
  )

  watch(
    () => menuProvide.openId,
    newVal => {
      if (
        newVal !== props.index &&
        menuProvide.isFold.value
        &&
        !String(newVal.value).startsWith(props.index)
      ) {
        isOpened.value = false
      }
    },
    {
      deep: true
    }
  )
}

provide('subMenu', {
  childClick: () => {
    if (menuProvide.isFold.value) {
      menuProvide.setOpenId('')
    }
  }
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
    }
  }

  &.is-fold {
    &>.ty-sub-menu__inner {
      padding: unset;

      &>.ty-sub-menu__icon {
        width: 40px;
        min-width: 40px;
      }
    }

    &>.ty-sub-menu__content {
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
          border: 1px solid var(--border-color-2) !important;
        }
      }
    }

    .is-fold.ty-sub-menu__content>ul {
      box-sizing: border-box;
      border: unset;
    }
  }

}
</style>
