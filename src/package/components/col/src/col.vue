<template>
  <div
    :class="[nm.b(),compStyle]"
    :style="{
      marginLeft: (100 / 24) * offset + '%',
      padding: 0 + ' ' + gutter?.value/2 + 'px' + ' ' + gutter?.value + 'px' 
    }"
  >
    <slot></slot>
  </div>
</template>
<script  setup lang="ts" name="TyCol">
import { computed ,inject} from 'vue'
import  {colProps,nm} from './context'
import {rowContent} from '../../../hooks/symbolNm'
defineOptions({
  name:'TyCol'
})
const props = defineProps(colProps)
const gutter = inject(rowContent, null) as {value:number}|null

const compStyle = computed(() => {
  if (props.span instanceof Object) {
    let style = ''
    for (const key in (props.span as Object)) {
      style += nm.bem(`${key}-${props.span[key]}`)+' '
    }
    return style
  }
  return nm.bem(String(props.span))
})
</script>
<style lang="scss" scoped>
.ty-col {
  display: inline-block;
  box-sizing: border-box;
}
@for $i from 0 through 24 {
  .ty-col-#{$i} {
    width: calc(1 / 24 * $i * 100) * 1%;
  }
}
@media (min-width: 1600px) {
  @for $i from 0 through 24 {
    .ty-col-xxl-#{$i} {
      width: calc(1 / 24 * $i * 100) * 1%;
    }
  }
}
@media screen and (min-width: 1200px) and (max-width:1600px) {
  @for $i from 0 through 24 {
    .ty-col-xl-#{$i} {
      width: calc(1 / 24 * $i * 100) * 1%;
    }
  }
}
@media screen and (min-width: 992px) and (max-width:1200px) {
  @for $i from 0 through 24 {
    .ty-col-lg-#{$i} {
      width: calc(1 / 24 * $i * 100) * 1%;
    }
  }
}
@media screen and (min-width: 768px)  and (max-width:992px) {
  @for $i from 0 through 24 {
    .ty-col-md-#{$i} {
      width: calc(1 / 24 * $i * 100) * 1%;
    }
  }
}
@media screen and (min-width: 0px) and (max-width:768px) {
  @for $i from 0 through 24 {
    .ty-col-sm-#{$i} {
      width: calc(1 / 24 * $i * 100) * 1%;
    }
  }
}
</style>
