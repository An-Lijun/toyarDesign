<template>
  <div v-show="isVisible" :class="[
    nm.b(),
    nm.is('circle', circle)
  ]" :style="styles" @click="back" ref="backTopRef">
    <slot>
      <TyiArrowUpSFill style="color:#fff;"></TyiArrowUpSFill>
    </slot>
  </div>
</template>

<script lang='ts' setup name='TyBackTop'>
import { nm, backTopProps, backTopEmits } from './context'
import useBackTop from './use-back-top'
import { TyiArrowUpSFill } from 'toyaricon'

defineOptions({
  name: 'TyBackTop'
})

const props = defineProps(backTopProps)
const emits = defineEmits(backTopEmits)
const { backTopRef, isVisible, styles, back } = useBackTop(props, emits, nm)
</script>
