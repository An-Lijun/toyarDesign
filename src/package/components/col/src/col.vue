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
import { computed ,inject,ref} from 'vue'
import  {colProps,nm} from './context'
import {rowContent} from '../../../hooks/symbolNm'
defineOptions({
  name:'TyCol'
})
const props = defineProps(colProps)
const gutter = inject(rowContent, null) as {value:number}|null || ref(0)

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
