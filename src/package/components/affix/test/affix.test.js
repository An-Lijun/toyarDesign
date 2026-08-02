import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'

/**
 * TyAffix 组件单元测试
 * 组件依赖 IntersectionObserver 实现固定定位，jsdom 不原生支持，需 mock
 * robinson 包的 debounce 内部依赖 dayjs ESM 存在解析问题，需 mock
 *
 * 注意：affixRef 指向外层 <component :is="tag"> 元素（即 wrapper.element），
 * 而样式（.ty-affix / is-fixed）应用在内层 div 上。
 * 占位元素 placeholder 插入在 affixRef.value（外层元素）之前，即 wrapper.element.parentNode 中。
 */

// Mock robinson 的 debounce，同步执行以简化测试时序
vi.mock('robinson', () => ({
  debounce: fn => {
    const debounced = (...args) => {
      fn(...args)
    }
    debounced.cancel = () => {}
    return debounced
  }
}))

import TyAffix from '../index.ts'

// ===== IntersectionObserver Mock =====
let observerInstances = []
let lastObserverCallback = null
let lastObserverOptions = null
const observeMock = vi.fn()
const unobserveMock = vi.fn()
const disconnectMock = vi.fn()

// ===== Scroll Event Mock =====
let scrollListeners = new Map() // targetEl -> [handlers]
const addEventListenerSpy = vi.fn((type, handler) => {
  if (type === 'scroll') {
    scrollListeners.set(targetElForSpy, [...(scrollListeners.get(targetElForSpy) || []), handler])
  }
})
const removeEventListenerSpy = vi.fn((type, handler) => {
  if (type === 'scroll') {
    const handlers = scrollListeners.get(targetElForSpy) || []
    const idx = handlers.indexOf(handler)
    if (idx > -1) handlers.splice(idx, 1)
  }
})
let targetElForSpy = null

/**
 * 触发 target 容器的 scroll 事件
 */
const triggerTargetScroll = targetEl => {
  const handlers = scrollListeners.get(targetEl) || []
  handlers.forEach(h => h())
}

class MockIntersectionObserver {
  constructor(callback, options) {
    lastObserverCallback = callback
    lastObserverOptions = options
    this.callback = callback
    this.options = options
    observerInstances.push(this)
  }
  observe(el) {
    observeMock(el)
  }
  unobserve(el) {
    unobserveMock(el)
  }
  disconnect() {
    disconnectMock()
  }
}

/**
 * 触发一次 intersection 回调
 * @param {Object} boundingClientRect - 元素的位置信息 { top, left, width, height }
 */
const triggerIntersection = boundingClientRect => {
  if (lastObserverCallback) {
    lastObserverCallback([{ boundingClientRect, isIntersecting: false }])
  }
}

/**
 * 工具函数：mock 元素尺寸
 * 注意：需传入 affixRef 指向的元素（wrapper.element，即外层 component 元素）
 */
const mockElementSize = (el, width, height) => {
  Object.defineProperty(el, 'offsetWidth', { configurable: true, value: width })
  Object.defineProperty(el, 'offsetHeight', { configurable: true, value: height })
  Object.defineProperty(el, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({ top: 0, left: 0, width, height, bottom: height, right: width })
  })
}

/**
 * 工具函数：mock 元素相对于 target 的位置
 * 同时 mock placeholder 的位置（已固定时 handleTargetScroll 使用 placeholder 位置）
 */
const mockRelativePosition = (el, relativeTop, relativeLeft, width, height) => {
  const rectFn = () => ({
    top: relativeTop + 100, // 100 是 target 的偏移
    left: relativeLeft + 50,
    width,
    height,
    bottom: relativeTop + 100 + height,
    right: relativeLeft + 50 + width
  })
  Object.defineProperty(el, 'getBoundingClientRect', {
    configurable: true,
    value: rectFn
  })
  // 同时 mock placeholder（如果已存在）
  const placeholder = el.previousElementSibling
  if (placeholder && placeholder.style && placeholder.style.visibility === 'hidden') {
    Object.defineProperty(placeholder, 'getBoundingClientRect', {
      configurable: true,
      value: rectFn
    })
  }
}

/**
 * 工具函数：mock target 元素的位置
 */
const mockTargetPosition = (targetEl, top = 100, left = 50, width = 300, height = 300) => {
  Object.defineProperty(targetEl, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      top,
      left,
      width,
      height,
      bottom: top + height,
      right: left + width
    })
  })
}

/**
 * 创建挂载容器，便于检测 placeholder 插入/移除
 */
const createContainer = () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  return container
}

describe('TyAffix 组件', () => {
  beforeEach(() => {
    observerInstances = []
    lastObserverCallback = null
    lastObserverOptions = null
    observeMock.mockClear()
    unobserveMock.mockClear()
    disconnectMock.mockClear()
    scrollListeners.clear()
    addEventListenerSpy.mockClear()
    removeEventListenerSpy.mockClear()

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

    // Spy on addEventListener/removeEventListener for scroll events
    vi.spyOn(Element.prototype, 'addEventListener').mockImplementation(function (type, handler, options) {
      if (type === 'scroll') {
        // 找到这个元素作为 target
        scrollListeners.set(this, [...(scrollListeners.get(this) || []), handler])
      }
      return this
    })
    vi.spyOn(Element.prototype, 'removeEventListener').mockImplementation(function (type, handler, options) {
      if (type === 'scroll') {
        const handlers = scrollListeners.get(this) || []
        const idx = handlers.indexOf(handler)
        if (idx > -1) {
          handlers.splice(idx, 1)
          // 如果数组为空，删除 Map 的键
          if (handlers.length === 0) {
            scrollListeners.delete(this)
          }
        }
      }
      return this
    })

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 800
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应正确渲染默认插槽内容', () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '<span class="content">固定内容</span>' }
      })
      expect(wrapper.html()).toContain('固定内容')
      expect(wrapper.find('.content').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染基础 BEM 类名 ty-affix', () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-affix').exists()).toBe(true)
      wrapper.unmount()
    })

    it('初始状态不应包含 is-fixed 类名', () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      expect(wrapper.find('.is-fixed').exists()).toBe(false)
      wrapper.unmount()
    })

    it('默认使用 div 标签作为容器', () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })
  })

  // ===== Props 测试 =====
  describe('Props', () => {
    it('tag 属性：默认值为 div', () => {
      const wrapper = mount(TyAffix, {
        props: { tag: 'div' },
        slots: { default: '内容' }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('tag 属性：支持自定义标签 span', () => {
      const wrapper = mount(TyAffix, {
        props: { tag: 'span' },
        slots: { default: '内容' }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('span')
      wrapper.unmount()
    })

    it('tag 属性：支持自定义标签 section', () => {
      const wrapper = mount(TyAffix, {
        props: { tag: 'section' },
        slots: { default: '内容' }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('section')
      wrapper.unmount()
    })

    it('offsetTop 属性：默认值为 0', () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      expect(wrapper.props('offsetTop')).toBe(0)
      wrapper.unmount()
    })

    it('offsetTop 属性：可设置自定义值', () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      expect(wrapper.props('offsetTop')).toBe(100)
      wrapper.unmount()
    })

    it('offsetBottom 属性：默认为 undefined', () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      expect(wrapper.props('offsetBottom')).toBeUndefined()
      wrapper.unmount()
    })

    it('offsetBottom 属性：可设置自定义值', () => {
      const wrapper = mount(TyAffix, {
        props: { offsetBottom: 50 },
        slots: { default: '内容' }
      })
      expect(wrapper.props('offsetBottom')).toBe(50)
      wrapper.unmount()
    })

    it('target 属性：默认为 undefined', () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      expect(wrapper.props('target')).toBeUndefined()
      wrapper.unmount()
    })
  })

  // ===== 生命周期与 Observer 测试 =====
  describe('IntersectionObserver 集成', () => {
    it('挂载时应创建 IntersectionObserver 并 observe 元素', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()
      expect(observerInstances.length).toBeGreaterThanOrEqual(1)
      expect(observeMock).toHaveBeenCalled()
      wrapper.unmount()
    })

    it('卸载时应调用 disconnect 清理 observer', () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      wrapper.unmount()
      expect(disconnectMock).toHaveBeenCalled()
    })

    it('offsetTop 模式下 rootMargin 应为负的 offsetTop', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 80 },
        slots: { default: '内容' }
      })
      await nextTick()
      expect(lastObserverOptions.rootMargin).toBe('-80px 0px 0px 0px')
      wrapper.unmount()
    })

    it('offsetBottom 模式下 rootMargin 应为负的 offsetBottom', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetBottom: 60 },
        slots: { default: '内容' }
      })
      await nextTick()
      expect(lastObserverOptions.rootMargin).toBe('0px 0px -60px 0px')
      wrapper.unmount()
    })

    it('threshold 应为 0', async () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      await nextTick()
      expect(lastObserverOptions.threshold).toBe(0)
      wrapper.unmount()
    })

    it('未传 target 时 root 应为 document', async () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      await nextTick()
      expect(lastObserverOptions.root).toBe(window.document)
      wrapper.unmount()
    })

    it('传入 target 时应添加 scroll 事件监听，而非创建 IntersectionObserver', async () => {
      const targetEl = document.createElement('div')
      const wrapper = mount(TyAffix, {
        props: { target: targetEl },
        slots: { default: '内容' }
      })
      await nextTick()

      // 有 target 时不应创建 IntersectionObserver
      expect(observerInstances.length).toBe(0)
      // 应添加 scroll 事件监听
      expect(scrollListeners.has(targetEl)).toBe(true)
      expect(scrollListeners.get(targetEl).length).toBeGreaterThan(0)
      wrapper.unmount()
    })
  })

  // ===== target 容器固定行为测试 =====
  describe('target 容器固定行为', () => {
    it('传入 target 容器时，元素在 target 内滚动至 offsetTop 范围应固定', async () => {
      const targetEl = document.createElement('div')
      Object.defineProperty(targetEl, 'clientHeight', { configurable: true, value: 300 })
      mockTargetPosition(targetEl)

      const wrapper = mount(TyAffix, {
        props: { target: targetEl, offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()

      expect(scrollListeners.has(targetEl)).toBe(true)

      mockElementSize(wrapper.element, 200, 40)
      mockRelativePosition(wrapper.element, 30, 10, 200, 40)

      // 触发 scroll 事件（debounce 同步执行）
      triggerTargetScroll(targetEl)
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(true)

      const styles = wrapper.find('.ty-affix').attributes('style') || ''
      expect(styles).toContain('position: fixed')
      // fixed top = targetRect.top(100) + offsetTop(50) = 150px
      expect(styles).toContain('top: 150px')
      wrapper.unmount()
    })

    it('传入 target 容器时，元素滚出 offsetTop 范围应取消固定', async () => {
      const targetEl = document.createElement('div')
      Object.defineProperty(targetEl, 'clientHeight', { configurable: true, value: 300 })
      mockTargetPosition(targetEl)

      const wrapper = mount(TyAffix, {
        props: { target: targetEl, offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // 先固定：relativeTop=30 <= 50
      mockRelativePosition(wrapper.element, 30, 10, 200, 40)
      triggerTargetScroll(targetEl)
      await nextTick()
      expect(wrapper.find('.is-fixed').exists()).toBe(true)

      // 滚出范围取消固定：relativeTop=100 > 50
      mockRelativePosition(wrapper.element, 100, 10, 200, 40)
      triggerTargetScroll(targetEl)
      await nextTick()
      expect(wrapper.find('.is-fixed').exists()).toBe(false)
      wrapper.unmount()
    })

    it('target 容器场景下固定时应触发 onChange 事件', async () => {
      const targetEl = document.createElement('div')
      Object.defineProperty(targetEl, 'clientHeight', { configurable: true, value: 300 })
      mockTargetPosition(targetEl)

      const wrapper = mount(TyAffix, {
        props: { target: targetEl, offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)
      mockRelativePosition(wrapper.element, 30, 10, 200, 40)

      triggerTargetScroll(targetEl)
      await nextTick()

      expect(wrapper.emitted('onChange')).toBeTruthy()
      expect(wrapper.emitted('onChange')[0]).toEqual([true])
      wrapper.unmount()
    })

    it('target 容器场景下固定时应插入占位元素', async () => {
      const container = createContainer()
      const targetEl = document.createElement('div')
      Object.defineProperty(targetEl, 'clientHeight', { configurable: true, value: 300 })
      mockTargetPosition(targetEl)

      const wrapper = mount(TyAffix, {
        props: { target: targetEl, offsetTop: 50 },
        slots: { default: '内容' },
        attachTo: container
      })
      await nextTick()

      // mount 时 handleTargetScroll 已创建 placeholder（尺寸为 0）
      // 设置正确的 mock 后，triggerTargetScroll 会更新 placeholder 尺寸
      mockElementSize(wrapper.element, 200, 40)
      mockRelativePosition(wrapper.element, 30, 10, 200, 40)

      triggerTargetScroll(targetEl)
      await nextTick()

      // 验证 placeholder 存在且尺寸正确
      const parentNode = wrapper.element.parentNode
      const placeholderEl = parentNode.querySelector('div[style*="visibility: hidden"]')
      expect(placeholderEl).not.toBeNull()
      expect(placeholderEl.style.width).toBe('200px')
      expect(placeholderEl.style.height).toBe('40px')

      wrapper.unmount()
      container.remove()
    })

    it('target 容器场景下 offsetBottom 固定行为', async () => {
      const targetEl = document.createElement('div')
      Object.defineProperty(targetEl, 'clientHeight', { configurable: true, value: 300 })
      mockTargetPosition(targetEl)

      const wrapper = mount(TyAffix, {
        props: { target: targetEl, offsetBottom: 80 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // elBottomInTarget = relativeTop + elHeight = 200 + 40 = 240
      // distanceToBottom = targetHeight - elBottomInTarget = 300 - 240 = 60 <= 80
      mockRelativePosition(wrapper.element, 200, 20, 200, 40)

      triggerTargetScroll(targetEl)
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(true)

      const styles = wrapper.find('.ty-affix').attributes('style') || ''
      expect(styles).toContain('position: fixed')
      // fixed bottom = innerHeight(800) - (targetRect.bottom(400) - offsetBottom(80)) = 480px
      expect(styles).toContain('bottom: 480px')
      wrapper.unmount()
    })

    it('从有 target 切换为 undefined 时，应移除 scroll 监听并回退到 IntersectionObserver', async () => {
      const targetEl = document.createElement('div')
      mockTargetPosition(targetEl)
      const wrapper = mount(TyAffix, {
        props: { target: targetEl, offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()
      expect(scrollListeners.has(targetEl)).toBe(true)

      await wrapper.setProps({ target: undefined })
      await nextTick()

      // 应移除 scroll 监听
      expect(scrollListeners.has(targetEl)).toBe(false)
      // 应创建 IntersectionObserver
      expect(observerInstances.length).toBeGreaterThan(0)
      expect(lastObserverOptions.root).toBe(window.document)
      wrapper.unmount()
    })

    it('切换 target 为新容器时，应更新 scroll 监听', async () => {
      const targetEl1 = document.createElement('div')
      const targetEl2 = document.createElement('div')
      mockTargetPosition(targetEl1)
      mockTargetPosition(targetEl2)

      const wrapper = mount(TyAffix, {
        props: { target: targetEl1, offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()
      expect(scrollListeners.has(targetEl1)).toBe(true)
      expect(scrollListeners.has(targetEl2)).toBe(false)

      await wrapper.setProps({ target: targetEl2 })
      await nextTick()

      expect(scrollListeners.has(targetEl1)).toBe(false)
      expect(scrollListeners.has(targetEl2)).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== 固定行为测试：offsetTop =====
  describe('顶部固定行为（offsetTop）', () => {
    it('元素顶部 <= offsetTop 时应固定', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      // affixRef 指向外层 component 元素（wrapper.element）
      mockElementSize(wrapper.element, 200, 40)

      // 模拟滚动到顶部 100px 以内（top=50 <= offsetTop=100）
      triggerIntersection({ top: 50, left: 10, width: 200, height: 40 })
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(true)
      const styles = wrapper.find('.ty-affix').attributes('style') || ''
      expect(styles).toContain('position: fixed')
      expect(styles).toContain('top: 100px')
      expect(styles).toContain('left: 10px')
      expect(styles).toContain('width: 200px')
      wrapper.unmount()
    })

    it('元素顶部 > offsetTop 时不应固定', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // top=200 > offsetTop=100，不固定
      triggerIntersection({ top: 200, left: 10, width: 200, height: 40 })
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(false)
      wrapper.unmount()
    })

    it('已固定后，元素顶部 > offsetTop 时应取消固定', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // 先固定
      triggerIntersection({ top: 50, left: 10, width: 200, height: 40 })
      await nextTick()
      expect(wrapper.find('.is-fixed').exists()).toBe(true)

      // 再回滚取消固定
      triggerIntersection({ top: 150, left: 10, width: 200, height: 40 })
      await nextTick()
      expect(wrapper.find('.is-fixed').exists()).toBe(false)
      wrapper.unmount()
    })

    it('固定时应包含 zIndex 样式', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 0 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      triggerIntersection({ top: 0, left: 0, width: 200, height: 40 })
      await nextTick()

      const styles = wrapper.find('.ty-affix').attributes('style') || ''
      expect(styles).toContain('z-index')
      wrapper.unmount()
    })
  })

  // ===== 固定行为测试：offsetBottom =====
  describe('底部固定行为（offsetBottom）', () => {
    it('距底部 <= offsetBottom 时应固定', async () => {
      // innerHeight = 800, elHeight = 40, offsetBottom = 100
      // windowHeight - top - elHeight <= offsetBottom → 800 - top - 40 <= 100 → top >= 660
      const wrapper = mount(TyAffix, {
        props: { offsetBottom: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // top=700: 800 - 700 - 40 = 60 <= 100，应固定
      triggerIntersection({ top: 700, left: 20, width: 200, height: 40 })
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(true)
      const styles = wrapper.find('.ty-affix').attributes('style') || ''
      expect(styles).toContain('position: fixed')
      expect(styles).toContain('bottom: 100px')
      expect(styles).toContain('left: 20px')
      wrapper.unmount()
    })

    it('距底部 > offsetBottom 时不应固定', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetBottom: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // top=100: 800 - 100 - 40 = 660 > 100，不固定
      triggerIntersection({ top: 100, left: 20, width: 200, height: 40 })
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(false)
      wrapper.unmount()
    })
  })

  // ===== 事件测试 =====
  describe('事件', () => {
    it('固定状态改变时应触发 onChange 事件（true）', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      triggerIntersection({ top: 50, left: 10, width: 200, height: 40 })
      await nextTick()

      // debounce 延迟 150ms 触发 emit，需等待真实定时器
      await vi.waitFor(() => {
        expect(wrapper.emitted('onChange')).toBeTruthy()
        expect(wrapper.emitted('onChange')[0]).toEqual([true])
      })
      wrapper.unmount()
    })

    it('取消固定时应触发 onChange 事件（false）', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // 固定
      triggerIntersection({ top: 50, left: 10, width: 200, height: 40 })
      await nextTick()

      // 等待 debounce（150ms）触发第一次 onChange(true)
      await vi.waitFor(() => {
        expect(wrapper.emitted('onChange')).toBeTruthy()
        expect(wrapper.emitted('onChange')[0]).toEqual([true])
      })

      // 取消固定
      triggerIntersection({ top: 150, left: 10, width: 200, height: 40 })
      await nextTick()

      // 等待 debounce 触发第二次 onChange(false)
      await vi.waitFor(() => {
        const events = wrapper.emitted('onChange')
        expect(events[1]).toEqual([false])
      })
      wrapper.unmount()
    })

    it('未固定且无需固定时不应触发 onChange', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // top=200 > offsetTop=100，未固定也无需固定，不应触发事件
      triggerIntersection({ top: 200, left: 10, width: 200, height: 40 })
      await nextTick()

      expect(wrapper.emitted('onChange')).toBeFalsy()
      wrapper.unmount()
    })
  })

  // ===== 占位元素测试 =====
  describe('占位元素（placeholder）', () => {
    it('固定时应在父节点插入占位元素', async () => {
      const container = createContainer()
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' },
        attachTo: container
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // placeholder 插入在 affixRef（wrapper.element）之前
      const parentNode = wrapper.element.parentNode
      const beforeCount = parentNode.children.length

      triggerIntersection({ top: 50, left: 10, width: 200, height: 40 })
      await nextTick()

      expect(parentNode.children.length).toBe(beforeCount + 1)
      wrapper.unmount()
      container.remove()
    })

    it('占位元素应具有 visibility:hidden 样式', async () => {
      const container = createContainer()
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' },
        attachTo: container
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      triggerIntersection({ top: 50, left: 10, width: 200, height: 40 })
      await nextTick()

      // placeholder 是在 wrapper.element 之前的兄弟元素
      const placeholder = wrapper.element.previousElementSibling
      expect(placeholder).toBeTruthy()
      expect(placeholder.tagName.toLowerCase()).toBe('div')
      const placeholderStyle = placeholder.getAttribute('style') || ''
      expect(placeholderStyle).toContain('visibility: hidden')
      wrapper.unmount()
      container.remove()
    })

    it('取消固定时应移除占位元素', async () => {
      const container = createContainer()
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' },
        attachTo: container
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      const parentNode = wrapper.element.parentNode
      const initialCount = parentNode.children.length

      // 固定 → 插入占位
      triggerIntersection({ top: 50, left: 10, width: 200, height: 40 })
      await nextTick()
      expect(parentNode.children.length).toBe(initialCount + 1)

      // 取消固定 → 移除占位
      triggerIntersection({ top: 150, left: 10, width: 200, height: 40 })
      await nextTick()
      expect(parentNode.children.length).toBe(initialCount)
      wrapper.unmount()
      container.remove()
    })

    it('占位元素尺寸应与原元素一致', async () => {
      const container = createContainer()
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' },
        attachTo: container
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      triggerIntersection({ top: 50, left: 10, width: 200, height: 40 })
      await nextTick()

      const placeholder = wrapper.element.previousElementSibling
      const placeholderStyle = placeholder.getAttribute('style') || ''
      expect(placeholderStyle).toContain('width: 200px')
      expect(placeholderStyle).toContain('height: 40px')
      wrapper.unmount()
      container.remove()
    })
  })

  // ===== Props 变化触发重新初始化 =====
  describe('Props 变化响应', () => {
    it('offsetTop 变化时应重新初始化 observer', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()
      const initialCount = observerInstances.length

      await wrapper.setProps({ offsetTop: 120 })
      await nextTick()

      expect(observerInstances.length).toBeGreaterThan(initialCount)
      wrapper.unmount()
    })

    it('offsetBottom 变化时应重新初始化 observer', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetBottom: 50 },
        slots: { default: '内容' }
      })
      await nextTick()
      const initialCount = observerInstances.length

      await wrapper.setProps({ offsetBottom: 120 })
      await nextTick()

      expect(observerInstances.length).toBeGreaterThan(initialCount)
      wrapper.unmount()
    })

    it('offsetTop 变化后 rootMargin 应更新', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()

      await wrapper.setProps({ offsetTop: 200 })
      await nextTick()

      expect(lastObserverOptions.rootMargin).toBe('-200px 0px 0px 0px')
      wrapper.unmount()
    })

    it('target 变化时应重新初始化（移除旧 scroll 监听，添加新 scroll 监听）', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()
      const initialObserverCount = observerInstances.length

      // 初始无 target，应创建 observer
      expect(initialObserverCount).toBeGreaterThan(0)

      const newTarget = document.createElement('div')
      await wrapper.setProps({ target: newTarget })
      await nextTick()

      // 有 target 时不应创建新的 observer
      expect(observerInstances.length).toBe(initialObserverCount)
      // 应添加 scroll 监听到新 target
      expect(scrollListeners.has(newTarget)).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== Resize 处理 =====
  describe('窗口 resize 处理', () => {
    it('挂载时应监听 resize 事件', () => {
      const addSpy = vi.spyOn(window, 'addEventListener')
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function), { passive: true })
      wrapper.unmount()
      addSpy.mockRestore()
    })

    it('卸载时应移除 resize 监听', () => {
      const removeSpy = vi.spyOn(window, 'removeEventListener')
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      wrapper.unmount()
      expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function))
      removeSpy.mockRestore()
    })
  })

  // ===== useAffix Hook 返回值 =====
  describe('useAffix Hook 返回值', () => {
    it('应返回 styles、isFixed、affixRef 供组件使用', async () => {
      const wrapper = mount(TyAffix, {
        slots: { default: '内容' }
      })
      await nextTick()

      const affixDiv = wrapper.find('.ty-affix')
      expect(affixDiv.exists()).toBe(true)
      // isFixed 初始为 false，无 is-fixed 类
      expect(affixDiv.classes()).not.toContain('is-fixed')
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('offsetTop 为 0 时，元素到达顶部即固定', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 0 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // top=0 <= offsetTop=0
      triggerIntersection({ top: 0, left: 0, width: 200, height: 40 })
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(true)
      wrapper.unmount()
    })

    it('offsetTop 为负数时逻辑能正常运行不报错', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: -10 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // Number(-10) || 0 = -10，top=0 <= -10 为 false，不固定
      triggerIntersection({ top: 0, left: 0, width: 200, height: 40 })
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(false)
      wrapper.unmount()
    })

    it('空插槽内容时也能正常渲染', () => {
      const wrapper = mount(TyAffix)
      expect(wrapper.find('.ty-affix').exists()).toBe(true)
      wrapper.unmount()
    })

    it('同时设置 offsetTop 和 offsetBottom 时，offsetBottom 优先', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100, offsetBottom: 50 },
        slots: { default: '内容' }
      })
      await nextTick()

      // offsetType 逻辑：offsetBottom !== undefined && offsetBottom >= 0 → 'bottom'
      // rootMargin 应使用 bottom 模式
      expect(lastObserverOptions.rootMargin).toBe('0px 0px -50px 0px')
      wrapper.unmount()
    })

    it('多次挂载/卸载不会泄漏 observer', () => {
      const wrapper1 = mount(TyAffix, { slots: { default: '1' } })
      const wrapper2 = mount(TyAffix, { slots: { default: '2' } })
      expect(observerInstances.length).toBeGreaterThanOrEqual(2)

      wrapper1.unmount()
      wrapper2.unmount()

      // disconnect 至少调用两次
      expect(disconnectMock.mock.calls.length).toBeGreaterThanOrEqual(2)
    })
  })

  // ===== updatePosition 方法测试 =====
  describe('updatePosition 方法', () => {
    it('组件实例应暴露 updatePosition 方法', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      expect(typeof wrapper.vm.updatePosition).toBe('function')
      wrapper.unmount()
    })

    it('无 target 时，updatePosition 应能触发固定', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // 模拟元素滚动到固定范围内（top=50 <= offsetTop=100）
      Object.defineProperty(wrapper.element, 'getBoundingClientRect', {
        configurable: true,
        value: () => ({ top: 50, left: 10, width: 200, height: 40, bottom: 90, right: 210 })
      })

      wrapper.vm.updatePosition()
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(true)
      const styles = wrapper.find('.ty-affix').attributes('style') || ''
      expect(styles).toContain('position: fixed')
      expect(styles).toContain('top: 100px')
      wrapper.unmount()
    })

    it('无 target 时，updatePosition 应能取消固定', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // 先固定
      Object.defineProperty(wrapper.element, 'getBoundingClientRect', {
        configurable: true,
        value: () => ({ top: 50, left: 10, width: 200, height: 40, bottom: 90, right: 210 })
      })
      triggerIntersection({ top: 50, left: 10, width: 200, height: 40 })
      await nextTick()
      expect(wrapper.find('.is-fixed').exists()).toBe(true)

      // mock placeholder 位置（取消固定时用 placeholder 判断）
      const placeholder = wrapper.element.previousElementSibling
      if (placeholder) {
        Object.defineProperty(placeholder, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({ top: 200, left: 10, width: 200, height: 40, bottom: 240, right: 210 })
        })
      }

      // 调用 updatePosition，元素已移出范围（top=200 > offsetTop=100）
      Object.defineProperty(wrapper.element, 'getBoundingClientRect', {
        configurable: true,
        value: () => ({ top: 200, left: 10, width: 200, height: 40, bottom: 240, right: 210 })
      })
      wrapper.vm.updatePosition()
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(false)
      wrapper.unmount()
    })

    it('有 target 时，updatePosition 应能触发固定', async () => {
      const targetEl = document.createElement('div')
      Object.defineProperty(targetEl, 'clientHeight', { configurable: true, value: 300 })
      mockTargetPosition(targetEl)

      const wrapper = mount(TyAffix, {
        props: { target: targetEl, offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)
      // 元素在固定范围内：relativeTop=30 <= offsetTop=50
      mockRelativePosition(wrapper.element, 30, 10, 200, 40)

      wrapper.vm.updatePosition()
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(true)
      const styles = wrapper.find('.ty-affix').attributes('style') || ''
      expect(styles).toContain('position: fixed')
      // fixed top = targetRect.top(100) + offsetTop(50) = 150px
      expect(styles).toContain('top: 150px')
      wrapper.unmount()
    })

    it('有 target 时，updatePosition 应能取消固定', async () => {
      const targetEl = document.createElement('div')
      Object.defineProperty(targetEl, 'clientHeight', { configurable: true, value: 300 })
      mockTargetPosition(targetEl)

      const wrapper = mount(TyAffix, {
        props: { target: targetEl, offsetTop: 50 },
        slots: { default: '内容' }
      })
      await nextTick()

      mockElementSize(wrapper.element, 200, 40)

      // 先固定：relativeTop=30 <= 50
      mockRelativePosition(wrapper.element, 30, 10, 200, 40)
      triggerTargetScroll(targetEl)
      await nextTick()
      expect(wrapper.find('.is-fixed').exists()).toBe(true)

      // 滚出范围：relativeTop=100 > 50
      mockRelativePosition(wrapper.element, 100, 10, 200, 40)
      wrapper.vm.updatePosition()
      await nextTick()

      expect(wrapper.find('.is-fixed').exists()).toBe(false)
      wrapper.unmount()
    })

    it('updatePosition 不应在 affixRef 为空时报错', async () => {
      const wrapper = mount(TyAffix, {
        props: { offsetTop: 100 },
        slots: { default: '内容' }
      })
      await nextTick()

      // 正常调用不应抛出异常
      expect(() => wrapper.vm.updatePosition()).not.toThrow()
      wrapper.unmount()
    })
  })
})
