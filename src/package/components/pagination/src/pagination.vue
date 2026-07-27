<template>
  <div :class="nm.b()">
    <div :class="nm.e('total')">
      <slot name="total"> 共 {{ props.total }} 条 </slot>
    </div>
    <div :class="nm.e('items')">
      <div :class="nm.e('left')" @click="preClick">
        <TyiArrowLeftSLine/>
      </div>
      <div :class="[nm.e('item'), item === props.current ? 'active' : '']" v-for="item in items"
        @click="itemClick(item)">
        {{ item }}
      </div>
      <div :class="nm.e('right')" @click="aftClick">
        <TyiArrowRightSLine/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { TyiArrowRightSLine, TyiArrowLeftSLine } from 'toyaricon'
import { nm, useProps, useEmits } from './context'
import usePagination from './use-pagination'

defineOptions({
  name: 'TyPagination'
})

const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const { items, preClick, aftClick, itemClick } = usePagination(props, emit)
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
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
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
      background-color: var(--fill-2);
    }

    &.active {
      color: var(--primary-6);
      background-color: var(--primary-2);

      &:hover {
        cursor: pointer;
        color: var(--primary-6);
        background-color: var(--primary-2);
      }
    }
  }
}
</style>
