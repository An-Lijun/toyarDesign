<template>
  <li :class="[nm.bem('item'), nm.is('level', Boolean(useSlots().icon)),
  nm.is('fold', !isShowRef)
    , nm.is('active', menuProvide.model.value == mkey)]" @click="handleClick">
    <span v-if="isShowRef" :class="nm.bem('item', 'index')" v-for="item in compLevel">
    </span>
    <span :class="nm.bem('item', 'icon')" v-if="Boolean(useSlots().icon)"> 
      <slot name="icon"></slot>
    </span>
    <span :class="nm.bem('item', 'label')">
      <slot></slot>
    </span>
  </li>
</template>
<script setup>
import { nm } from './context'
import { injectLevel } from './hooks/level.ts'
import { useSlots,inject,ref ,watch} from "vue";
defineOptions({
  name: 'TyMenuItem'
})
const props = defineProps({
  mkey: {
    type: String
  },
  _mItem:{
    type:Object
  }
})
const compLevel = injectLevel()
const menuProvide = inject('menu', null)
const subMenu = inject('subMenu', null)
const emit = defineEmits(['click'])
let isShowRef = ref(true)
const handleClick = () => {
  
  menuProvide.setModel(props.mkey)
  if(!subMenu){
    return
  }
  if(props._mItem&& menuProvide.model.value!==props.mkey){
    menuProvide.clickMenu(props._mItem)
  }
  subMenu.childClick()
}
if (menuProvide) {
  watch(
    () => menuProvide.isFold,
    newVal => {
      setTimeout(() => {
        isShowRef.value = !newVal.value
      }, 300)
    },
    {
      deep: true,
      immediate:true
    }
  )
}
</script>
<style lang="scss" scoped>
.ty-menu-item {
  line-height: 40px;
  list-style: none;
  padding: 0 10px;
  user-select: none;
  margin-bottom: 4px;
  color: var(--text-2);
  font-size: var(--font-body-3);
  white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  &__icon {
    width: 50px;
    min-width: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: var(--toyar-gray-4);
    cursor: pointer;
  }

  &__index {
    width: 20px;
    display: inline-block;
    height: 100%;
  }
  &__label{
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  &.is-active {
    background-color: var(--primary-6);
    color: #fff;
  }

  &.is-level.is-fold {
    padding: unset;

    .ty-menu-item__icon {
      width: 40px;
      min-width: 40px;
    }

    .ty-menu-item__label {
      display: none;
    }
  }
}
</style>
