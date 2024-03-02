<template>
  <div
    :class="['ty-row', compJustify, compAlign]"
    :style="{
      marginLeft: gutter / 2 + 'px',
      marginRight: gutter / 2 + 'px'
    }"
  >
    <slot> </slot>
  </div>
</template>
<script lang="ts" setup name="TyRow">
import { provide, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'line'
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    default: 'start'
  },
  align: {
    type: String,
    default: 'center'
  }
})
provide('gutter', {
  value: props.gutter
})

const compJustify = computed(() => {
  switch (props.justify) {
    case 'start':
      return ''
    case 'center':
      return 'justify-center'
    case 'end':
      return 'justify-end'
    case 'around':
      return 'justify-around'
    case 'between':
      return 'justify-between'
  }
})
const compAlign = computed(() => {
  switch (props.align) {
    case 'center':
      return 'align-center'
    case 'end':
      return 'align-bottom'
    case 'top':
      return 'align-top'
  }
})
</script>
<style lang="scss">
.ty-row {
  &.justify-center {
    display: flex;
    justify-content: center;
  }
  &.justify-end {
    display: flex;
    justify-content: justify-end;
  }
  &.justify-around {
    display: flex;
    justify-content: space-around;
  }
  &.justify-between {
    display: flex;
    justify-content: space-between;
  }
  &.align-end {
    display: flex;
    align-items: flex-end;
  }
  &.align-center {
    display: flex;
    align-items: center;
  }
  &.align-top {
    display: flex;
    align-items: flex-start;
  }
}
</style>
