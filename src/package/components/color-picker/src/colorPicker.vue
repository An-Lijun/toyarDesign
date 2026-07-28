<template>
  <div :class="nm.b()" ref="containerRef">
    <div :class="nm.e('selector')" @click="handleClick" :style="{
      background: colorFormat.hexColor
    }">

    </div>
    <div :class="nm.e('container')" ref="popRef" v-show="isShowColor" @click.stop="() => {}">
      <div :class="nm.e('wrap')" ref="wrapRef">
        <div class="draggable" ref="wrapDraggerRef"></div>
      </div>
      <div :class="nm.e('hue')">
        <div class="draggable" ref="hueDraggerRef"></div>
      </div>
      <div :class="nm.e('alpha')" ref="alphaRef">
        <div class="draggable" ref="alphaDraggerRef"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useProps, nm, useEmits } from './context'
import useColorPicker from './use-color-picker'

defineOptions({
  name: 'TyColorPicker'
})

defineProps(useProps)
const emit = defineEmits(useEmits)

const {
  wrapRef,
  wrapDraggerRef,
  hueDraggerRef,
  alphaDraggerRef,
  alphaRef,
  containerRef,
  popRef,
  isShowColor,
  colorFormat,
  handleClick,
  initPopper
} = useColorPicker(emit)

onMounted(() => {
  initPopper()
})
</script>
