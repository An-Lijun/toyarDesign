<template>
  <section :class="[nm.b(), nm.is('fold', isFold)]">
    <header>
      <slot name="header"></slot>
    </header>
    <div :class="nm.e('inner')">
      <slot></slot>
    </div>
  </section>
</template>
<script setup>
import { provideLevel } from './hooks/level.ts'
import { nm, menuProps } from './context'
defineOptions({
  name: 'TyMenu'
})
const props = defineProps(menuProps)
const openId = ref('')
provideLevel(0)
provide('menu', {
  isFold: computed(() => props.isFold),
  lastMenuFn:null,
  setOpenId:(value)=>{
    openId.value=value
  },
  openId,
  width:{
    0:0,
    1:0,
    2:0,
    3:0,
    4:0,
    5:0
  }
})

watch(
    () => props.isFold,
    newVal => {
      openId.value=''
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
  transition: all .5s;
  position: relative;
  overflow: hidden;
  &.is-fold {
    width: 50px;
    transition: all .5s;
    // overflow: unset;
    // overflow-y: scroll;
  }
}
</style>
