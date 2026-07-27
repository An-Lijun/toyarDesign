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
import { nm, useProps } from './context'
import useRow from './use-row'

defineOptions({
  name: 'TyRow'
})

const props = defineProps(useProps)
const { compJustify, compAlign } = useRow(props)
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
