<template>
  <div
    :class="[nm.b(), compJustify, compAlign]"
    :style="{
      marginLeft: gutter/2 + 'px',
      marginRight: gutter/2 + 'px'
    }"
  >
    <slot> </slot>
  </div>
</template>
<script lang="ts" setup name="TyRow">
import { provide, computed } from 'vue'
import {rowContent} from '../../../hooks/symbolNm'
import {rowProps ,nm} from './context'
defineOptions({
  name:'TyRow'
})
const props = defineProps(rowProps)
provide(rowContent, {
  value: props.gutter
})

const compJustify = computed(() => {
  switch (props.justify) {
    case 'start':
      return ''
    case 'center':
      return nm.is('justify-center') 
    case 'end':
      return nm.is('justify-end') 
    case 'around':
      return nm.is('justify-around') 
    case 'between':
      return nm.is('justify-between') 
  }
})
const compAlign = computed(() => {
  switch (props.align) {
    case 'center':
      return nm.is('align-center') 
    case 'end':
      return nm.is('align-bottom') 
    case 'top':
      return nm.is('align-top') 
  }
})
</script>
<style lang="scss">
.ty-row {
  &.is-justify-center {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  &.is-justify-end {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  &.is-justify-around {
    display: flex;
    flex-wrap: wrap;

    justify-content: space-around;
  }
  &.is-justify-between {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &.is-align-end {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
  }
  &.is-align-center {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &.is-align-top {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
}
</style>
