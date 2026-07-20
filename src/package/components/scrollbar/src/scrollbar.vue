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
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue';

defineOptions({
  name: 'TyScrollBar'
})

const BAR_MIN_SIZE = 24
const BAR_MAX_RATIO = 0.6
const BAR_PADDING = 4

let containerHeight = 0
let containerWidth = 0
let scrollHeight = 0
let scrollWidth = 0

let rightTopV = ref('0px')
let bottomV = ref('0px')
let rightBarHeight = ref(`${BAR_MIN_SIZE}px`)
let bottomBarWidth = ref(`${BAR_MIN_SIZE}px`)
let isShowRight = ref(false)
let isShowBottom = ref(false)

const container = ref(null)
const rightBar = ref(null)
const bottomBar = ref(null)

let isDraggingRight = false
let isDraggingBottom = false
let startX = 0
let startY = 0
let startScrollLeft = 0
let startScrollTop = 0

let resizeObserver = null
let mutationObserver = null

const updateDimensions = () => {
  if (!container.value) return
  
  containerHeight = container.value.clientHeight
  containerWidth = container.value.clientWidth
  scrollHeight = container.value.scrollHeight
  scrollWidth = container.value.scrollWidth
  
  updateBarVisibility()
  updateBarSizes()
}

const updateBarVisibility = () => {
  isShowRight.value = containerHeight < scrollHeight
  isShowBottom.value = containerWidth < scrollWidth
}

const updateBarSizes = () => {
  const rightAvailableHeight = containerHeight - BAR_PADDING * 2
  const scrollRatio = containerHeight / scrollHeight
  const rightMaxSize = rightAvailableHeight * BAR_MAX_RATIO
  const rightSize = Math.max(BAR_MIN_SIZE, Math.min(rightMaxSize, rightAvailableHeight * scrollRatio))
  rightBarHeight.value = `${rightSize}px`
  
  const bottomAvailableWidth = containerWidth - BAR_PADDING * 2
  const bottomScrollRatio = containerWidth / scrollWidth
  const bottomMaxSize = bottomAvailableWidth * BAR_MAX_RATIO
  const bottomSize = Math.max(BAR_MIN_SIZE, Math.min(bottomMaxSize, bottomAvailableWidth * bottomScrollRatio))
  bottomBarWidth.value = `${bottomSize}px`
}

const updateBarPositions = () => {
  if (!container.value) return
  
  const scrollTop = container.value.scrollTop
  const scrollLeft = container.value.scrollLeft
  
  const maxScrollTop = scrollHeight - containerHeight
  const maxScrollLeft = scrollWidth - containerWidth
  
  const rightMaxPosition = containerHeight - parseFloat(rightBarHeight.value) - BAR_PADDING
  const bottomMaxPosition = containerWidth - parseFloat(bottomBarWidth.value) - BAR_PADDING
  
  const rightPosition = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * rightMaxPosition : 0
  const bottomPosition = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * bottomMaxPosition : 0
  
  rightTopV.value = `${rightPosition}px`
  bottomV.value = `${bottomPosition}px`
}

const handleResize = () => {
  updateDimensions()
  updateBarPositions()
}

const resetScrollBar = () => {
  setTimeout(() => {
    updateDimensions()
    updateBarPositions()
  }, 200)
}

const handleScroll = (ev) => {
  if (isDraggingRight || isDraggingBottom) {
    return
  }
  updateBarPositions()
}

const rightBarContainerClick = (e) => {
  if (e.target === rightBar.value) return
  
  const containerRect = container.value?.getBoundingClientRect()
  if (!containerRect) return
  
  const clickY = e.clientY - containerRect.top
  const barTop = parseFloat(rightTopV.value)
  
  if (clickY < barTop) {
    container.value.scrollTop -= containerHeight * 0.8
  } else {
    container.value.scrollTop += containerHeight * 0.8
  }
  
  updateBarPositions()
}

const bottomBarContainerClick = (e) => {
  if (e.target === bottomBar.value) return
  
  const containerRect = container.value?.getBoundingClientRect()
  if (!containerRect) return
  
  const clickX = e.clientX - containerRect.left
  const barLeft = parseFloat(bottomV.value)
  
  if (clickX < barLeft) {
    container.value.scrollLeft -= containerWidth * 0.8
  } else {
    container.value.scrollLeft += containerWidth * 0.8
  }
  
  updateBarPositions()
}

const rightMove = (e) => {
  if (!isDraggingRight || !container.value) return
  
  e.preventDefault()
  
  const maxScrollTop = scrollHeight - containerHeight
  const rightMaxPosition = containerHeight - parseFloat(rightBarHeight.value) - BAR_PADDING
  
  let deltaY = e.pageY - startY
  let newScrollTop = startScrollTop + (deltaY / rightMaxPosition) * maxScrollTop
  
  newScrollTop = Math.max(0, Math.min(maxScrollTop, newScrollTop))
  container.value.scrollTop = newScrollTop
  
  updateBarPositions()
}

const rightMouseUp = () => {
  isDraggingRight = false
  document.removeEventListener('mousemove', rightMove)
  document.removeEventListener('mouseup', rightMouseUp)
}

const rightMouseDown = (e) => {
  isDraggingRight = true
  startY = e.pageY
  startScrollTop = container.value?.scrollTop || 0
  
  document.addEventListener('mousemove', rightMove)
  document.addEventListener('mouseup', rightMouseUp)
}

const bottomMove = (e) => {
  if (!isDraggingBottom || !container.value) return
  
  e.preventDefault()
  
  const maxScrollLeft = scrollWidth - containerWidth
  const bottomMaxPosition = containerWidth - parseFloat(bottomBarWidth.value) - BAR_PADDING
  
  let deltaX = e.pageX - startX
  let newScrollLeft = startScrollLeft + (deltaX / bottomMaxPosition) * maxScrollLeft
  
  newScrollLeft = Math.max(0, Math.min(maxScrollLeft, newScrollLeft))
  container.value.scrollLeft = newScrollLeft
  
  updateBarPositions()
}

const bottomMouseUp = () => {
  isDraggingBottom = false
  document.removeEventListener('mousemove', bottomMove)
  document.removeEventListener('mouseup', bottomMouseUp)
}

const bottomMouseDown = (e) => {
  isDraggingBottom = true
  startX = e.pageX
  startScrollLeft = container.value?.scrollLeft || 0
  
  document.addEventListener('mousemove', bottomMove)
  document.addEventListener('mouseup', bottomMouseUp)
}

onMounted(() => {
  updateDimensions()
  updateBarPositions()
  
  window.addEventListener('resize', handleResize)
  
  resizeObserver = new ResizeObserver(handleResize)
  if (container.value) {
    resizeObserver.observe(container.value)
  }
  
  mutationObserver = new MutationObserver(() => {
    resetScrollBar()
  })
  if (container.value) {
    mutationObserver.observe(container.value, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    })
  }
})

onBeforeUnmount(() => {
  rightMouseUp()
  bottomMouseUp()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  
  if (mutationObserver) {
    mutationObserver.disconnect()
  }
})

defineExpose({
  resetScrollBar
})
</script>
<style lang="scss" scoped>
.ty-scrollbar {
  overflow: hidden;
  position: relative;

  &__container {
    height: 100%;
    max-height: 100%;
    overflow: auto;
    position: relative;
    scrollbar-width: none;
  }

  &__container::-webkit-scrollbar {
    display: none;
  }

  &__rightBarContainer {
    position: absolute;
    right: 0;
    top: 0;
    width: 12px;
    height: 100%;
    z-index: 15;
    background-color: var(--opacity-color-4);
    opacity: 0;
    visibility: hidden;
    transition: opacity .2s ease, visibility .2s ease;
    box-sizing: border-box;
    cursor: pointer;
  }

  &__rightBar {
    width: 8px;
    background-color: var(--fill-4);
    border-radius: 4px;
    position: absolute;
    box-sizing: border-box;
    right: 2px;
    top: 2px;
    user-select: none;
    -webkit-user-drag: none;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  &__bottomBarContainer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 12px;
    width: calc(100% - 12px);
    z-index: 15;
    background-color: var(--opacity-color-4);
    opacity: 0;
    visibility: hidden;
    transition: opacity .2s ease, visibility .2s ease;
    box-sizing: border-box;
    cursor: pointer;
  }

  &__bottomBar {
    height: 8px;
    background-color: var(--fill-4);
    border-radius: 4px;
    position: absolute;
    box-sizing: border-box;
    top: 2px;
    left: 2px;
    user-select: none;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  &:hover {
    .ty-scrollbar__rightBarContainer,
    .ty-scrollbar__bottomBarContainer {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>