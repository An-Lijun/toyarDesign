<template>
  <div :class="subNm.b()">
    <div :class="subNm.e('inner')" @click="openChildMenu">
      <span :class="subNm.e('index')" v-for="item in compLevel"> </span>
      <div
        :class="subNm.e('icon')"
        :style="{
          '--toyar-gray-10': flag ? 'var(--toyar-xblue-6)' : ''
        }"
      >
        <slot name="icon"></slot>
      </div>
      <div div :class="subNm.e('text')">
        <slot name="title"></slot>
      </div>
      <div :class="[subNm.e('flag'), subNm.is('opened',flag)]">
        <TyIcon icon="ty-arrow-down-s-line"></TyIcon>
      </div>
    </div>
    <div :class="[subNm.e('content'), subNm.is('opend',flag)]">
      <!-- v-show="flag" -->
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts" name="TySubMenu">
import { injectLevel } from './hooks/level.ts'
import { subNm } from './context'

defineOptions({
  name:'TySubMenu'
})

let flag = ref(false)
const compLevel = injectLevel(true)
const openChildMenu = () => {
  flag.value = !flag.value
}
</script>
<style lang="scss" scoped>
.ty-sub-menu {
  width: 100%;
  color: var(--text-2);

  &__inner {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    border-radius: 5px;
    user-select: none;
    &:hover{
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
  &:hover {
    background-color: var(--toyar-gray-2);

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
    }
    &.is-opend {
      grid-template-rows: 1fr;
    }
  }
}
</style>
