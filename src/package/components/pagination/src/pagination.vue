<template>
  <div :class="nm.b()">
    <div :class="nm.e('total')">
      <slot name="total"> 共 {{ props.total }} 条 </slot>
    </div>
    <div :class="nm.e('items')">
      <div :class="nm.e('left')" @click="preClick">
        <TyIcon icon="ty-arrow-left-s-line"></TyIcon>
      </div>
      <div :class="[nm.e('item'), item === props.current ? 'active' : '']" v-for="item in items"
        @click="itemClick(item)">
        {{ item }}
      </div>
      <div :class="nm.e('right')" @click="aftClick">
        <TyIcon icon="ty-arrow-right-s-line"></TyIcon>
      </div>
    </div>
  </div>
</template>
<script setup>
import TyIcon from '../../icon'
import { pagProps, nm } from './context'
defineOptions({
  name: 'TyPagination'
})
const props = defineProps(pagProps)
const emit = defineEmits(['currentChange', 'sizeChange'])

const items = computed(() => {
  const item = Math.floor(props.current / props.pageSize)
  let min = item * props.pageSize
  let max = (item + 1) * props.pageSize
  let arr = []
  let totalFloor = Math.floor(props.total / props.pageSize)
  if (props.current === min) {
    min = min - props.pageSize
    max = props.current
  }

  if (props.total <= max) {
    max = props.total
  }

  for (let i = min; i < max; i++) {
    arr.push(i + 1)
  }
  return arr
})
const preClick = () => {
  let current = props.current
  if ((current - props.pageSize) > 0) {
    current -= props.pageSize
    emit('currentChange', current)
  }
}
const aftClick = () => {
  let current = props.current
  let sum = current + props.pageSize

  if (sum < props.total) {
    current = sum
    emit('currentChange', current)
  }
  if (sum >= props.total) {
    current = props.total
    emit('currentChange', current)
  }
}
const itemClick = (item) => {
  emit('currentChange', item)
}
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
// ty-arrow-down-s-line</style>
