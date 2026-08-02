import { onBeforeUnmount, onMounted, ref, computed, watch } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps, useEmits } from './context'
import useNmSpace from '@/package/hooks/useBem'
import { debounce } from 'robinson'
import { type UseAffixReturn } from './type.ts'
import { type ExtractEmitsFn } from '@/package/utils/type'

/**
 * Affix 组件的核心逻辑 Hook
 * 使用 IntersectionObserver 实现元素的固定定位功能
 * @param props - 组件属性
 * @param emits - 事件发射器
 * @param nm - BEM 命名空间函数
 * @returns {UseAffixReturn} 返回样式、固定状态和元素引用
 */
export default function useAffix(
  props: ExtractPropTypes<typeof useProps>,
  emits: ExtractEmitsFn<typeof useEmits>,
  nm: ReturnType<typeof useNmSpace>
): UseAffixReturn {
  void nm

  const affixRef = ref<HTMLElement | null>(null)
  const isFixed = ref(false)
  const styles = ref<Record<string, string>>({})
  const targetDom = computed<Element | null>(() => props.target ?? null)

  let observer: IntersectionObserver | null = null
  let placeholder: HTMLElement | null = null
  let targetScrollHandler: (() => void) | null = null
  let lastTargetEl: Element | null = null
  let windowScrollHandler: (() => void) | null = null

  const offsetType = computed(() => (props.offsetBottom !== undefined && props.offsetBottom >= 0 ? 'bottom' : 'top'))
  const offsetTop = computed(() => Number(props.offsetTop) || 0)
  const offsetBottom = computed(() => Number(props.offsetBottom) || 0)
  const hasTarget = computed(() => targetDom.value !== null)

  const isStyleEqual = (a: Record<string, string>, b: Record<string, string>): boolean => {
    if (Object.keys(a).length !== Object.keys(b).length) return false
    for (const key in a) {
      if (a[key] !== b[key]) return false
    }
    return true
  }

  /**
   * 设置元素的固定状态
   * @param value - 是否固定
   * @param style - 固定时的样式
   */
  const stateChangeOrigin = () => {
    emits('onChange', isFixed.value)
  }
  type ChangeHandler = () => void
  const stateChange = debounce(stateChangeOrigin, 150) as ChangeHandler

  const setIsFixed = (value: boolean, style: Record<string, string> = {}) => {
    if (isFixed.value !== value) {
      isFixed.value = value
      stateChange()
    }
    if (!isStyleEqual(styles.value, style)) {
      styles.value = style
    }
  }

  let cachedElPosition: { left: number } | null = null
  let isPlaceholderCreated = false

  /**
   * 获取元素尺寸
   * @returns {Object} 元素的宽度和高度
   */
  const getElementSize = () => {
    if (!affixRef.value) return { width: 0, height: 0 }
    return {
      width: affixRef.value.offsetWidth,
      height: affixRef.value.offsetHeight
    }
  }

  /**
   * 清除尺寸缓存
   */
  const clearSizeCache = () => {
    // 预留：清除缓存逻辑
  }

  /**
   * 创建占位元素，保持布局稳定
   * 当元素固定时，占位元素会占据原位置，防止页面跳动
   */
  const createPlaceholder = () => {
    if (!affixRef.value) return

    const { width, height } = getElementSize()

    if (isPlaceholderCreated && placeholder) {
      // 更新已存在的 placeholder 尺寸
      placeholder.style.width = `${width}px`
      placeholder.style.height = `${height}px`
      return
    }

    placeholder = document.createElement('div')
    placeholder.style.width = `${width}px`
    placeholder.style.height = `${height}px`
    placeholder.style.visibility = 'hidden'

    if (affixRef.value.parentNode) {
      affixRef.value.parentNode.insertBefore(placeholder, affixRef.value)
      isPlaceholderCreated = true
    }
  }

  /**
   * 移除占位元素
   */
  const removePlaceholder = () => {
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder)
      placeholder = null
      isPlaceholderCreated = false
    }
  }
  const updateDom = (
    value: boolean,
    style: Record<string, string> = {},
    position: { left: number } | null,
    isRemove: boolean
  ) => {
    if (isRemove) {
      removePlaceholder()
    } else {
      createPlaceholder()
    }
    setIsFixed(value, style)
    cachedElPosition = position
  }

  /**
   * 获取元素相对于视口或 target 容器的位置
   */
  const getRelativePosition = () => {
    if (!affixRef.value) return { top: 0, left: 0 }

    const elRect = affixRef.value.getBoundingClientRect()

    if (hasTarget.value && targetDom.value) {
      const targetRect = targetDom.value.getBoundingClientRect()
      return {
        top: elRect.top - targetRect.top,
        left: elRect.left - targetRect.left
      }
    }

    return { top: elRect.top, left: elRect.left }
  }

  /**
   * 处理 target 容器内的滚动固定逻辑
   * 使用 position:fixed 实现容器内固定，每次滚动动态计算视口坐标
   */
  const handleTargetScroll = () => {
    if (!affixRef.value || !targetDom.value) return

    const targetEl = targetDom.value
    const targetRect = targetEl.getBoundingClientRect()
    const { width, height: elHeight } = getElementSize()

    // 获取元素原始文档流位置（已固定时用 placeholder，否则用元素自身）
    let originalTop: number
    let originalLeft: number
    if (isFixed.value && placeholder) {
      const phRect = placeholder.getBoundingClientRect()
      originalTop = phRect.top - targetRect.top
      originalLeft = phRect.left - targetRect.left
    } else {
      const elRect = affixRef.value.getBoundingClientRect()
      originalTop = elRect.top - targetRect.top
      originalLeft = elRect.left - targetRect.left
    }

    const result: {
      fixedValue: boolean
      fixedObject: Record<string, string>
      position: { left: number } | null
      isRemove: boolean
    } = {
      fixedValue: false,
      fixedObject: {},
      position: null,
      isRemove: false
    }

    if (offsetType.value === 'top') {
      if (originalTop <= offsetTop.value) {
        result.fixedValue = true
        result.fixedObject = {
          position: 'fixed',
          top: `${targetRect.top + offsetTop.value}px`,
          left: `${targetRect.left + originalLeft}px`,
          width: `${width}px`,
          zIndex: 'var(--zindex-affix)'
        }
        result.position = { left: originalLeft }
      } else {
        result.isRemove = true
      }
    } else {
      // 底部固定
      const targetHeight = targetEl.clientHeight
      const elBottomInTarget = originalTop + elHeight
      const distanceToBottom = targetHeight - elBottomInTarget

      if (distanceToBottom <= offsetBottom.value) {
        result.fixedValue = true
        const fixedBottom = window.innerHeight - (targetRect.bottom - offsetBottom.value)
        result.fixedObject = {
          position: 'fixed',
          bottom: `${fixedBottom}px`,
          left: `${targetRect.left + originalLeft}px`,
          width: `${width}px`,
          zIndex: 'var(--zindex-affix)'
        }
        result.position = { left: originalLeft }
      } else {
        result.isRemove = true
      }
    }

    updateDom(result.fixedValue, result.fixedObject, result.position, result.isRemove)
  }

  /**
   * 处理无 target 时基于视口的固定逻辑
   * 从 IntersectionObserver 回调中提取，供 updatePosition 直接调用
   */
  const handleViewportFix = () => {
    if (!affixRef.value) return

    const { top, left } = affixRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const { height: elHeight, width } = getElementSize()

    const result: {
      fixedValue: boolean
      fixedObject: Record<string, string>
      position: { left: number } | null
      isRemove: boolean
    } = {
      fixedValue: false,
      fixedObject: {},
      position: null,
      isRemove: false
    }

    switch (offsetType.value) {
      case 'top':
        if (top <= offsetTop.value && !isFixed.value) {
          result.fixedValue = true
          result.fixedObject = {
            position: 'fixed',
            top: `${offsetTop.value}px`,
            left: `${left}px`,
            width: `${width}px`,
            zIndex: 'var(--zindex-affix)'
          }
          result.position = { left }
        } else if (top > offsetTop.value && isFixed.value) {
          result.fixedValue = false
          result.fixedObject = {}
          result.position = null
          result.isRemove = true
        }
        break
      case 'bottom':
        if (!isFixed.value) {
          if (windowHeight - top - elHeight <= offsetBottom.value) {
            result.fixedValue = true
            result.fixedObject = {
              position: 'fixed',
              bottom: `${offsetBottom.value}px`,
              left: `${left}px`,
              width: `${width}px`,
              zIndex: 'var(--zindex-affix)'
            }
            result.position = { left }
          }
        } else if (placeholder) {
          const placeholderTop = placeholder.getBoundingClientRect().top
          if (windowHeight - placeholderTop - elHeight > offsetBottom.value) {
            result.fixedValue = false
            result.fixedObject = {}
            result.position = null
            result.isRemove = true
          }
        }
        break
    }
    updateDom(result.fixedValue, result.fixedObject, result.position, result.isRemove)
  }

  /**
   * 立即更新固定位置（无防抖）
   * 可通过组件实例的 updatePosition 方法调用，用于外部主动触发位置刷新
   */
  const updatePosition = () => {
    if (!affixRef.value) return
    clearSizeCache()
    if (hasTarget.value && targetDom.value) {
      handleTargetScroll()
    } else {
      handleViewportFix()
    }
  }

  const initObserver = () => {
    if (!affixRef.value) return

    // 使用保存的旧 target 引用
    const oldTarget = lastTargetEl
    const oldHandler = targetScrollHandler

    if (observer) {
      observer.disconnect()
    }

    // 移除旧的 scroll 监听
    if (oldHandler) {
      if (oldTarget) {
        oldTarget.removeEventListener('scroll', oldHandler)
      }
      targetScrollHandler = null
    }

    // 移除旧的 window scroll 监听
    if (windowScrollHandler) {
      window.removeEventListener('scroll', windowScrollHandler)
      windowScrollHandler = null
    }

    clearSizeCache()

    if (hasTarget.value && targetDom.value) {
      // 有 target：使用 scroll 监听实现容器内固定
      const target = targetDom.value
      targetScrollHandler = debounce(handleTargetScroll, 10) as () => void
      target.addEventListener('scroll', targetScrollHandler, { passive: true })

      // 页面滚动时 target 容器在视口中的位置也会变化，需要同步更新 fixed 元素位置
      windowScrollHandler = debounce(handleTargetScroll, 10) as () => void
      window.addEventListener('scroll', windowScrollHandler, { passive: true })

      // 保存当前 target 供下次清理
      lastTargetEl = target

      // 初始调用一次
      handleTargetScroll()
    } else {
      // 无 target：使用 IntersectionObserver
      observer = new IntersectionObserver(
        entries => {
          const entry = entries[0]
          if (!entry) return

          const { top, left } = entry.boundingClientRect
          const windowHeight = window.innerHeight
          const { height: elHeight, width } = getElementSize()
          let fixedValue = false
          let fixedObject: Record<string, string> = {}
          let position = null
          let isRemove = false
          switch (offsetType.value) {
            case 'top':
              if (top <= offsetTop.value && !isFixed.value) {
                fixedValue = true
                fixedObject = {
                  position: 'fixed',
                  top: `${offsetTop.value}px`,
                  left: `${left}px`,
                  width: `${width}px`,
                  zIndex: 'var(--zindex-affix)'
                }
                position = { left }
                isRemove = false
              } else if (top > offsetTop.value && isFixed.value) {
                fixedValue = false
                fixedObject = {}
                position = null
                isRemove = true
              }
              break
            case 'bottom':
              if (!isFixed.value) {
                if (windowHeight - top - elHeight <= offsetBottom.value) {
                  fixedValue = true
                  fixedObject = {
                    position: 'fixed',
                    bottom: `${offsetBottom.value}px`,
                    left: `${left}px`,
                    width: `${width}px`,
                    zIndex: 'var(--zindex-affix)'
                  }
                  position = { left }
                  isRemove = false
                }
              } else {
                if (placeholder) {
                  const placeholderTop = placeholder.getBoundingClientRect().top
                  if (windowHeight - placeholderTop - elHeight > offsetBottom.value) {
                    fixedValue = false
                    fixedObject = {}
                    position = null
                    isRemove = true
                  }
                }
              }
              break
          }
          updateDom(fixedValue, fixedObject, position, isRemove)
        },
        {
          root: window.document,
          rootMargin:
            offsetType.value === 'top' ? `-${offsetTop.value}px 0px 0px 0px` : `0px 0px -${offsetBottom.value}px 0px`,
          threshold: 0
        }
      )

      observer.observe(affixRef.value)

      // 清除保存的 target
      lastTargetEl = null
    }
  }

  /**
   * 处理窗口大小变化
   * 当窗口尺寸改变时，重新计算固定元素的位置和尺寸
   */
  const handleResize = () => {
    if (isFixed.value && affixRef.value) {
      clearSizeCache()
      const { width } = getElementSize()
      const pos = getRelativePosition()

      if (pos.left !== cachedElPosition?.left || width + 'px' !== styles.value.width) {
        setIsFixed(true, {
          ...styles.value,
          left: `${pos.left}px`,
          width: `${width}px`
        })
        cachedElPosition = { left: pos.left }
      }
    }
  }

  /**
   * 防抖处理的 resize 函数
   * 延迟 150ms 执行，避免高频触发
   */
  type ResizeHandler = (ev: UIEvent) => void
  const debouncedResize = debounce(handleResize, 150) as ResizeHandler

  watch(
    () => [props.offsetTop, props.offsetBottom, props.target],
    () => {
      initObserver()
    }
  )

  onMounted(() => {
    initObserver()
    window.addEventListener('resize', debouncedResize, { passive: true })
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
    if (targetScrollHandler && lastTargetEl) {
      lastTargetEl.removeEventListener('scroll', targetScrollHandler)
      targetScrollHandler = null
    }
    if (windowScrollHandler) {
      window.removeEventListener('scroll', windowScrollHandler)
      windowScrollHandler = null
    }
    removePlaceholder()
    window.removeEventListener('resize', debouncedResize)
  })

  return {
    styles,
    isFixed,
    affixRef,
    updatePosition
  }
}
