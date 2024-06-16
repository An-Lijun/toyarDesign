<template>
  <div :class="[subNm.b(), subNm.is('fold', !isShowRef)]" ref="subMenu">
    <div :class="subNm.e('inner')" @click="openChildMenu">
      <span
        v-if="isShowRef"
        :class="subNm.e('index')"
        v-for="item in compLevel"
        :key="item"
      >
      </span>
      <div
        :class="subNm.e('icon')"
        :style="{
          '--toyar-gray-10': flag ? 'var(--toyar-xblue-6)' : ''
        }"
      >
        <slot name="icon"></slot>
      </div>
      <div :class="subNm.e('text')" v-if="isShowRef">
        <slot name="title"></slot>
      </div>
      <div
        :class="[subNm.e('flag'), subNm.is('opened', flag)]"
        v-if="isShowRef ? true : compLevel > 0"
      >
        <TyIcon icon="ty-arrow-down-s-line"></TyIcon>
      </div>
    </div>
    <div
      :style="{
        transform: !isShowRef
          ? `translate(${width}px,-40px)`
          : ''
      }"
      :class="[
        subNm.e('content'),
        subNm.is('opend', flag),
        subNm.is('fold', !isShowRef)
      ]"
    >
      <ul>
        <slot ></slot>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts" name="TySubMenu">
import { injectLevel } from './hooks/level.ts'
import { subNm } from './context'
import { inject, ref, watch } from 'vue'

defineOptions({
  name: 'TySubMenu'
})
const props = defineProps({
  index: String,
  option:{
    type:Array
  },
  data:String
})
let flag = ref(false)
const compLevel = injectLevel(true)
const menuData = inject('menu', {})
const subMenu = ref() // menuref
let isShowRef = ref(true)

let width = ref(0)
const openChildMenu = (cValue) => {
  let data = subMenu.value.getBoundingClientRect().width + 10
  if(compLevel.value ===0){
    data+= subMenu.value.getBoundingClientRect().left
  }
  width.value =data
  menuData.setOpenId(props.index)
  setTimeout(() => {
      flag.value = !flag.value
  })
}


if (menuData) {
  watch(
    () => menuData.isFold,
    newVal => {
      setTimeout(() => {
        isShowRef.value = !newVal.value
      }, 300)
    },
    {
      deep: true
    }
  )

  watch(
    () => menuData.openId,
    newVal => {
      if (
        newVal !== props.index && 
        menuData.isFold.value
        &&
        !String(newVal.value).startsWith(props.index)
      ) {
        flag.value = false
      }
    },
    {
      deep: true
    }
  )
}

provide('subMenu', {
  childClick:()=>{
    if(menuData.isFold.value){
      menuData.setOpenId('')
    }
  }
})
</script>
<style lang="scss" scoped>
.ty-sub-menu {
  width: 100%;
  color: var(--text-2);
  position: relative;
  &:hover {
    background-color: var(--toyar-gray-2);
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

  &__index {
    width: 10px;
    display: inline-block;
    height: 100%;
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
  &__flag {
    width: 40px;
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__flag.is-opened {
    transform: rotate(180deg);
  }
  &__content {
    display: grid;
    grid-template-rows: 0fr;
    transition: 0.3s;
    overflow: hidden;
    & > ul {
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
    & > .ty-sub-menu__inner {
      padding: unset;
      & > .ty-sub-menu__icon {
        width: 40px;
        min-width: 40px;
      }
    }
    & > .ty-sub-menu__content {
      overflow: auto;
      position: fixed;
      left: 0px;

      &.is-opend {
        grid-template-rows: 1fr;
        overflow: unset;
        & > ul {
          display: block;
          box-sizing: border-box;
          border: 1px solid var(--border-color-2) !important;
        }
      }
    }
    .is-fold.ty-sub-menu__content > ul {
      box-sizing: border-box;
      border: unset;
    }
  }
}
</style>
