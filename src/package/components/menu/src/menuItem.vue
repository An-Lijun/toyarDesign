<template>
  <li :class="nm.bem('item')" @click="handleClick">
    <span
      v-if="isShowRef"
      :class="nm.bem('item', 'index')"
      v-for="item in compLevel"
    >
    </span>
    <slot></slot>
  </li>
</template>
<script setup>
import { nm } from './context'
import { injectLevel } from './hooks/level.ts'
defineOptions({
  name: 'TyMenuItem'
})
const compLevel = injectLevel()
const menuData = inject('menu', null)
const emit = defineEmits(['click'])
let isShowRef = ref(true)
const handleClick=()=>{
  if(menuData.isFold){
     menuData.setOpenId('')
  }
  emit('click')
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
}
</script>
<style lang="scss" scoped>
.ty-menu-item {
  line-height: 40px;
  list-style: none;
  padding: 0 14px;
  border-radius: 5px;
  user-select: none;
  margin-bottom: 4px;
  &:hover {
    background-color: var(--toyar-gray-2);
    cursor: pointer;
  }
  &__index {
    width: 20px;
    display: inline-block;
    height: 100%;
  }
}
</style>
