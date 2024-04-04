<template>
  <div :class="nm.b()">
    <div :class="nm.e('total')">
      <slot name="total"> 共 {{ props.total }} 条 </slot>
    </div>
    <div :class="nm.e('items')">
      <div :class="nm.e('left')">
        <TyIcon icon="ty-arrow-left-s-line"></TyIcon>
      </div>
      <div :class="nm.e('item')" v-for="item in Number(props.total)">
        {{ item }}
      </div>
      <div :class="nm.e('right')">
        <TyIcon icon="ty-arrow-right-s-line"></TyIcon>
      </div>
    </div>
  </div>
</template>
<script setup>
import TyIcon from '../../icon'
import { pagProps, nm } from './context'

const props = defineProps(pagProps)
</script>
<style lang="scss" scoped>
.ty-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin: 5px 0;
  &__items {
    flex: 1;
    display: flex;
    align-items: center;
  }
  &__left,
  &__right {
    &:hover {
      cursor: pointer;
      --toyar-gray-10: var(--primary-6);
    }
  }
  &__item {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin-right: 8px;
    border-radius: 3px;
    color: var(--text-2);
    &:hover {
      cursor: pointer;
      // color: var(--primary-6);
      background-color: var(--fill-2);
    }
    &.active {
      color: var(--primary-6);
      background-color: var(--primary-2);

      &:hover {
        cursor: pointer;
        // color: var(--primary-6);
        color: var(--primary-6);
        background-color: var(--primary-2);
      }
    }
  }
}
// ty-arrow-left-double-line
// ty-arrow-right-double-line
// ty-arrow-down-s-line
</style>
