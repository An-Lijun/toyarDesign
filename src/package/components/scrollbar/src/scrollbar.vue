<template>
  <div :class="nm.b()">
    <div :class="nm.e('container')" ref="container" @scroll="handleScroll($event)">
      <slot />
    </div>
    <div :class="nm.e('rightBarContainer')" v-if="isShowRight" @mousedown="rightBarContainerClick($event)">
      <div ref="rightBar" :class="nm.e('rightBar')" @mousedown="rightMouseDown($event)" :style="{
        top: rightTopV,
        height: rightBarHeight
      }">
      </div>
    </div>
    <div :class="nm.e('bottomBarContainer')" v-if="isShowBottom" @mousedown="bottomBarContainerClick($event)">
      <div :class="nm.e('bottomBar')" ref="bottomBar" @mousedown="bottomMouseDown($event)" :style="{
        left: bottomV,
        width: bottomBarWidth
      }">
      </div>
    </div>
  </div>
</template>
<script setup>
import { nm } from './context';
import useScrollBar from './use-scrollbar';

defineOptions({
  name: 'TyScrollBar'
})

const {
  rightTopV,
  bottomV,
  rightBarHeight,
  bottomBarWidth,
  isShowRight,
  isShowBottom,
  container,
  rightBar,
  bottomBar,
  handleScroll,
  rightBarContainerClick,
  bottomBarContainerClick,
  rightMouseDown,
  bottomMouseDown,
  resetScrollBar
} = useScrollBar()

defineExpose({
  resetScrollBar
})
</script>

