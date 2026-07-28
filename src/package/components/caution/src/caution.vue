<template>
  <div :class="[nm.b(), nm.m(type)]">
    <component v-if="isShowIcon" :is="cauIconObj[type]" :size="size" style="font-size: 24px;margin-right: 10px;"
      :color="`var(--${colorObj[type]}-5)`"></component>
    <div :class="nm.e('content')">
      <div :class="[nm.e('title')]">
        <span>
          {{ title }}
        </span>
      </div>
      <div :class="[nm.e('subTitle')]" v-if="$slots.default">
        <slot> </slot>
      </div>
    </div>

  </div>
</template>
<script setup>
import { useProps, nm, useEmits } from './context'
import useCaution from './use-caution'

defineOptions({
  name: 'TyCaution'
})

const props = defineProps(useProps)
defineEmits(useEmits)

const { cauIconObj, colorObj } = useCaution()
</script>
