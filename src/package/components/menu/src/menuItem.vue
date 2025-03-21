<template>
  <li :class="[nm.bem('item'), nm.is('level', Boolean(useSlots().icon))
    , nm.is('active', menuProvide.model.value == mkey)]" @click="handleClick">

    <menuIndex :compLevel="compLevel" />
    <span :class="nm.bem('item', 'icon')">
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
import { useSlots, inject, ref } from "vue";
import menuIndex from './menuIndex.vue'

defineOptions({
  name: 'TyMenuItem'
})
const props = defineProps({
  mkey: {
    type: String
  },
  _mItem: {
    type: Object
  }
})
const compLevel = injectLevel()
const menuProvide = inject('menu', null)
const emit = defineEmits(['click'])
const handleClick = () => {

  menuProvide.setModel(props.mkey)
  if (props._mItem && menuProvide.model.value !== props.mkey) {
    menuProvide.setModel(props._mItem)
  }
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
  text-overflow: ellipsis;
  overflow: hidden;

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

  &__label {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &.is-active {
    background-color: var(--primary-6);
    color: #fff;
  }


}
.is-fold {
  .is-level{
    padding: unset;
  }
    .ty-menu-item__icon{
      width: 40px;
      min-width: 40px;
    }

    .ty-menu-item__label {
      // display: none;
    }
  }
</style>
