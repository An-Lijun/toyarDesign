<template>
  <div :class="nm.b()" v-on="eventMaps">
    <div v-show="isShowConfirm">
        <main :style="style" :class="[nm.e('content')]">
          <slot name="content">
            {{ props.content }}
          </slot>
        </main>
      <div :class="[nm.e('arrows'), nm.is(placement)]">
      </div>
    </div>
    <span ref="defaultSlot" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>
<script setup>
import { useProps, nm, useEmits } from './context'
import useTrigger from './use-trigger'

defineOptions({
  name: 'TyTrigger'
})

const props = defineProps(useProps)

const {
  defaultSlot,
  eventMaps,
  isShowConfirm,
  style
} = useTrigger(props)
</script>
