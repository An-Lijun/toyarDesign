<template>
  <section :class="[nm.b(), nm.is('fold', isFold), getTheme]">
    <header :class="nm.e('header')">
      <slot name="header"></slot>
    </header>
    <TyScrollBar :class="nm.e('inner')" ref="scrollBar" :style="{
      height: `calc(100% - ${$slots.header ? '50px' : '0px'})`
    }">
      <slot v-if="!option"> </slot>
      <optionsRender v-else :option="option" />
    </TyScrollBar>
  </section>
</template>
<script setup>
import optionsRender from './optionsRender'
import { provideLevel } from './hooks/level.ts'
import { nm, menuProps, emits } from './context'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { nowTheme } from '../../../hooks/changeTheme'
import { ref, computed, provide, watch } from 'vue'
import { TyScrollBar } from '../../scrollbar'

defineOptions({
  name: 'TyMenu'
})
const props = defineProps(menuProps)
const emit = defineEmits(emits)
const model = defineModel()
const opend = defineModel('opend', {
  type: Array,
  default: () => []
})

const scrollBar = ref()
const getTheme = computed(() => {
  switch (props.theme) {
    case 'dark':
    case 'light':
      return 'ty' + props.theme
    case 'rDesign':
      return nowTheme.value === 'dark' ? 'ty-light' : 'ty-dark'
  }
})

// 给menu 注入层级
provide('menu', {
  isFold: computed(() => props.isFold),
  lastMenuFn: null,
  model: computed(() => {
    return model.value
  }),
  setModel: (val) => {
    model.value = val
    emit('change', val)
  },
  clickSubMenu: (subMenu) => {
    if (opend.value.includes(subMenu)) {
      opend.value = opend.value.filter(item => item !== subMenu)
    } else {
      opend.value = [...opend.value, subMenu]
    }
    setTimeout(() => {
      if (scrollBar && scrollBar.value) {
        scrollBar.value.resetScrollBar()
      }
    })
    emit('opendChange', subMenu)
  }
})



</script>
<style lang="scss" scoped>
.ty-menu {
  height: 100%;
  width: 250px;
  background: var(--color-bg-2);
  padding: 0 5px;
  overflow: auto;
  transition: background-color 1s;
  box-sizing: border-box;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;

  &__header {
    height: 50px;
    overflow: hidden;
  }

  &.is-fold {
    width: 50px;
    transition: all 0.5s;
    :deep(.ty-menu__index){
      display: none;
    }
  }
}
</style>
