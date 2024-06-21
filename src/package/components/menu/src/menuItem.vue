<template>
  <li
    :class="[nm.bem('item'), nm.is('active', menuData.model.value == mkey)]"
    @click="handleClick"
  >
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
const props = defineProps({
  mkey: {
    type: String
  }
})
const compLevel = injectLevel()
const menuData = inject('menu', null)
const subMenu = inject('subMenu', null)
const emit = defineEmits(['click'])
let isShowRef = ref(true)
const handleClick = () => {
  menuData.setModel(props.mkey)
  subMenu.childClick()
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
  user-select: none;
  margin-bottom: 4px;
  &:hover {
    background-color: var(--toyar-gray-4);
    cursor: pointer;
  }
  &__index {
    width: 20px;
    display: inline-block;
    height: 100%;
  }
  &.is-active {
    background-color: var(--primary-6);
    color: #fff;
  }
}
</style>
