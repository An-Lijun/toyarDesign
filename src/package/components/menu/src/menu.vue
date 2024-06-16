<template>
  <section :class="[nm.b(), nm.is('fold', isFold)]">
    <header>
      <slot name="header"></slot>
    </header>
    <div :class="nm.e('inner')">
      <slot v-if="!option"> </slot>
      <optionsRender v-else :option="option" :a1="123"/>
    </div>
  </section>
</template>
<script setup>
import menuItem from './menuItem.vue'
import subMenu from './menuItem.vue'
import optionsRender from './optionsRender'
import { provideLevel } from './hooks/level.ts'
import { nm, menuProps } from './context'

defineOptions({
  name: 'TyMenu'
})

const props = defineProps(menuProps)
const openId = ref('')
// 给menu 注入层级
provideLevel(0)
provide('menu', {
  isFold: computed(() => props.isFold),
  lastMenuFn: null,
  setOpenId: value => {
    openId.value = value
  },
  openId
})

watch(
  () => props.isFold,
  newVal => {
    openId.value = ''
  },
  {
    deep: true
  }
)

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
  &.is-fold {
    width: 50px;
    transition: all 0.5s;
  }
}
</style>
