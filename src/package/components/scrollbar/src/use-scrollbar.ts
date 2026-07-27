import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { type UseScrollBarReturn } from './type'

/**
 * ScrollBar 组件的核心逻辑 Hook
 * 实现自定义滚动条功能，包括水平和垂直滚动条
 * @returns {UseScrollBarReturn} 返回滚动条相关的状态和方法
 */
export default function useScrollBar(): UseScrollBarReturn {
  const BAR_MIN_SIZE = 24
  const BAR_MAX_RATIO = 0.6
  const BAR_PADDING = 4

  let containerHeight = 0
  let containerWidth = 0
  let scrollHeight = 0
  let scrollWidth = 0

  const rightTopV = ref('0px')
  const bottomV = ref('0px')
  const rightBarHeight = ref(`${BAR_MIN_SIZE}px`)
  const bottomBarWidth = ref(`${BAR_MIN_SIZE}px`)
  const isShowRight = ref(false)
  const isShowBottom = ref(false)

  const container = ref<HTMLElement | null>(null)
  const rightBar = ref<HTMLElement | null>(null)
  const bottomBar = ref<HTMLElement | null>(null)

  let isDraggingRight = false
  let isDraggingBottom = false
  let startX = 0
  let startY = 0
  let startScrollLeft = 0
  let startScrollTop = 0

  let resizeObserver: ResizeObserver | null = null
  let mutationObserver: MutationObserver | null = null

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

  const handleScroll = (ev: Event) => {
    if (isDraggingRight || isDraggingBottom) {
      return
    }
    updateBarPositions()
  }

  const rightBarContainerClick = (e: MouseEvent) => {
    if (e.target === rightBar.value) return

    const containerRect = container.value?.getBoundingClientRect()
    if (!containerRect) return

    const clickY = e.clientY - containerRect.top
    const barTop = parseFloat(rightTopV.value)

    if (clickY < barTop) {
      container.value!.scrollTop -= containerHeight * 0.8
    } else {
      container.value!.scrollTop += containerHeight * 0.8
    }

    updateBarPositions()
  }

  const bottomBarContainerClick = (e: MouseEvent) => {
    if (e.target === bottomBar.value) return

    const containerRect = container.value?.getBoundingClientRect()
    if (!containerRect) return

    const clickX = e.clientX - containerRect.left
    const barLeft = parseFloat(bottomV.value)

    if (clickX < barLeft) {
      container.value!.scrollLeft -= containerWidth * 0.8
    } else {
      container.value!.scrollLeft += containerWidth * 0.8
    }

    updateBarPositions()
  }

  const rightMove = (e: MouseEvent) => {
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

  const rightMouseDown = (e: MouseEvent) => {
    isDraggingRight = true
    startY = e.pageY
    startScrollTop = container.value?.scrollTop || 0

    document.addEventListener('mousemove', rightMove)
    document.addEventListener('mouseup', rightMouseUp)
  }

  const bottomMove = (e: MouseEvent) => {
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

  const bottomMouseDown = (e: MouseEvent) => {
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

  return {
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
  }
}
