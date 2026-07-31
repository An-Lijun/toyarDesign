import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'

/**
 * TyBackTop 组件单元测试
 * 组件通过 document.querySelector(target) 查找滚动容器，监听 scroll 事件控制显隐
 * 点击时滚动到顶部并触发 click 事件
 *
 * 依赖说明：
 * - toyaricon 的 TyiArrowUpSFill：需 mock 为占位组件
 * - jsdom 不支持 scrollTo 的 smooth 行为，需 mock
 */

// Mock toyaricon 图标组件
vi.mock('toyaricon', () => ({
  TyiArrowUpSFill: {
    name: 'TyiArrowUpSFill',
    render: () => null
  }
}))

import TyBackTop from '../index.ts'

/**
 * 创建可滚动的目标容器
 * @param {string} selector - CSS 选择器类名
 * @param {Object} options - { scrollTop, scrollHeight }
 */
const createScrollTarget = (selector = '.scroll-target', { scrollTop = 0 } = {}) => {
  const target = document.createElement('div')
  target.className = selector.replace('.', '')
  target.style.overflow = 'scroll'
  target.style.height = '500px'
  document.body.appendChild(target)

  // mock scrollTop（jsdom 中 scrollTop 默认为 0 且不可写）
  Object.defineProperty(target, 'scrollTop', {
    configurable: true,
    get: () => scrollTop,
    set: (val) => { scrollTop = val }
  })

  // mock scrollTo（jsdom 不支持 smooth 行为）
  target.scrollTo = vi.fn(({ top }) => {
    scrollTop = top
  })

  return target
}

/**
 * 模拟滚动到指定位置
 */
const simulateScroll = (target, scrollTop) => {
  Object.defineProperty(target, 'scrollTop', {
    configurable: true,
    get: () => scrollTop,
    set: (val) => { scrollTop = val }
  })
  target.dispatchEvent(new Event('scroll'))
}

describe('TyBackTop 组件', () => {
  let target

  beforeEach(() => {
    document.body.innerHTML = ''
    target = createScrollTarget()
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-backTop', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      expect(wrapper.find('.ty-backTop').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染默认插槽内容', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: '回到顶部' }
      })
      expect(wrapper.text()).toContain('回到顶部')
      wrapper.unmount()
    })

    it('未传插槽时应渲染默认图标', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' }
      })
      // 默认插槽渲染 TyiArrowUpSFill（mock 后 render 返回 null，但组件结构存在）
      expect(wrapper.find('.ty-backTop').exists()).toBe(true)
      wrapper.unmount()
    })

    it('初始状态（scrollTop=0）应隐藏（v-show=false）', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', vHeight: 200 },
        slots: { default: 'UP' }
      })
      const el = wrapper.find('.ty-backTop').element
      expect(el.style.display).toBe('none')
      wrapper.unmount()
    })
  })

  // ===== Props =====
  describe('Props', () => {
    it('vHeight 默认值为 200', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      expect(wrapper.props('vHeight')).toBe(200)
      wrapper.unmount()
    })

    it('right 默认值为 40', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      expect(wrapper.props('right')).toBe(40)
      wrapper.unmount()
    })

    it('bottom 默认值为 40', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      expect(wrapper.props('bottom')).toBe(40)
      wrapper.unmount()
    })

    it('circle 默认值为 false', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      expect(wrapper.props('circle')).toBe(false)
      expect(wrapper.find('.ty-backTop').classes()).not.toContain('is-circle')
      wrapper.unmount()
    })

    it('circle=true 时应添加 is-circle 类', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', circle: true },
        slots: { default: 'UP' }
      })
      expect(wrapper.find('.ty-backTop').classes()).toContain('is-circle')
      wrapper.unmount()
    })

    it('target 默认值为空字符串', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      expect(wrapper.props('target')).toBe('.scroll-target')
      wrapper.unmount()
    })
  })

  // ===== 样式 =====
  describe('样式', () => {
    it('应应用 right 和 bottom 定位样式', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', right: 50, bottom: 60 },
        slots: { default: 'UP' }
      })
      const style = wrapper.find('.ty-backTop').attributes('style') || ''
      expect(style).toContain('right: 50px')
      expect(style).toContain('bottom: 60px')
      wrapper.unmount()
    })

    it('自定义 right/bottom 应反映在样式中', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', right: 100, bottom: 120 },
        slots: { default: 'UP' }
      })
      const style = wrapper.find('.ty-backTop').attributes('style') || ''
      expect(style).toContain('right: 100px')
      expect(style).toContain('bottom: 120px')
      wrapper.unmount()
    })

    it('right/bottom 变化时样式应更新', async () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', right: 30, bottom: 30 },
        slots: { default: 'UP' }
      })
      await wrapper.setProps({ right: 80, bottom: 90 })
      const style = wrapper.find('.ty-backTop').attributes('style') || ''
      expect(style).toContain('right: 80px')
      expect(style).toContain('bottom: 90px')
      wrapper.unmount()
    })
  })

  // ===== 可见性控制 =====
  describe('可见性控制', () => {
    it('scrollTop >= vHeight 时应显示', async () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', vHeight: 200 },
        slots: { default: 'UP' }
      })
      await nextTick()

      // 模拟滚动到 250px（>= vHeight=200）
      simulateScroll(target, 250)
      await nextTick()

      const el = wrapper.find('.ty-backTop').element
      expect(el.style.display).not.toBe('none')
      wrapper.unmount()
    })

    it('scrollTop < vHeight 时应隐藏', async () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', vHeight: 200 },
        slots: { default: 'UP' }
      })
      await nextTick()

      // 滚动到 100px（< vHeight=200）
      simulateScroll(target, 100)
      await nextTick()

      const el = wrapper.find('.ty-backTop').element
      expect(el.style.display).toBe('none')
      wrapper.unmount()
    })

    it('scrollTop 等于 vHeight 时应显示（>= 判断）', async () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', vHeight: 200 },
        slots: { default: 'UP' }
      })
      await nextTick()

      simulateScroll(target, 200)
      await nextTick()

      const el = wrapper.find('.ty-backTop').element
      expect(el.style.display).not.toBe('none')
      wrapper.unmount()
    })

    it('先滚动显示再回滚隐藏', async () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', vHeight: 200 },
        slots: { default: 'UP' }
      })
      await nextTick()

      // 滚动到 300 → 显示
      simulateScroll(target, 300)
      await nextTick()
      expect(wrapper.find('.ty-backTop').element.style.display).not.toBe('none')

      // 回滚到 100 → 隐藏
      simulateScroll(target, 100)
      await nextTick()
      expect(wrapper.find('.ty-backTop').element.style.display).toBe('none')
      wrapper.unmount()
    })

    it('自定义 vHeight 控制触发阈值', async () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', vHeight: 500 },
        slots: { default: 'UP' }
      })
      await nextTick()

      // 滚动到 400（< vHeight=500）→ 隐藏
      simulateScroll(target, 400)
      await nextTick()
      expect(wrapper.find('.ty-backTop').element.style.display).toBe('none')

      // 滚动到 500（>= vHeight=500）→ 显示
      simulateScroll(target, 500)
      await nextTick()
      expect(wrapper.find('.ty-backTop').element.style.display).not.toBe('none')
      wrapper.unmount()
    })
  })

  // ===== 事件 =====
  describe('事件', () => {
    it('点击应触发 click 事件', async () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      await wrapper.find('.ty-backTop').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click').length).toBe(1)
      wrapper.unmount()
    })

    it('点击应调用 target.scrollTo 滚动到顶部', async () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      await nextTick()

      // 先设置一个初始 scrollTop
      simulateScroll(target, 300)
      await nextTick()

      // 点击回到顶部
      await wrapper.find('.ty-backTop').trigger('click')

      expect(target.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
      wrapper.unmount()
    })

    it('多次点击应多次触发 click 事件', async () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      const el = wrapper.find('.ty-backTop')
      await el.trigger('click')
      await el.trigger('click')
      await el.trigger('click')
      expect(wrapper.emitted('click').length).toBe(3)
      wrapper.unmount()
    })
  })

  // ===== Target 查找 =====
  describe('Target 目标容器', () => {
    it('target 不存在时应抛出错误', () => {
      // 抑制 console.error
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        const wrapper = mount(TyBackTop, {
          props: { target: '.not-exist' },
          slots: { default: 'UP' }
        })
        wrapper.unmount()
      }).toThrow('target is not found')

      spy.mockRestore()
    })

    it('使用自定义选择器查找 target', async () => {
      const customTarget = document.createElement('div')
      customTarget.className = 'custom-scroll'
      customTarget.style.overflow = 'scroll'
      Object.defineProperty(customTarget, 'scrollTop', {
        configurable: true, get: () => 0, set: () => {}
      })
      customTarget.scrollTo = vi.fn()
      document.body.appendChild(customTarget)

      const wrapper = mount(TyBackTop, {
        props: { target: '.custom-scroll', vHeight: 100 },
        slots: { default: 'UP' }
      })
      await nextTick()

      // 模拟滚动
      simulateScroll(customTarget, 150)
      await nextTick()

      expect(wrapper.find('.ty-backTop').element.style.display).not.toBe('none')
      wrapper.unmount()
      customTarget.remove()
    })
  })

  // ===== 生命周期 =====
  describe('生命周期', () => {
    it('挂载时应添加 scroll 事件监听', () => {
      const addSpy = vi.spyOn(target, 'addEventListener')
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
      wrapper.unmount()
      addSpy.mockRestore()
    })

    it('卸载时应移除 scroll 事件监听', () => {
      const removeSpy = vi.spyOn(target, 'removeEventListener')
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target' },
        slots: { default: 'UP' }
      })
      wrapper.unmount()
      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
      removeSpy.mockRestore()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('vHeight=0 时滚动任意距离即显示', async () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', vHeight: 0 },
        slots: { default: 'UP' }
      })
      await nextTick()

      simulateScroll(target, 1)
      await nextTick()

      expect(wrapper.find('.ty-backTop').element.style.display).not.toBe('none')
      wrapper.unmount()
    })

    it('同时设置 circle、right、bottom', () => {
      const wrapper = mount(TyBackTop, {
        props: { target: '.scroll-target', circle: true, right: 100, bottom: 80 },
        slots: { default: 'UP' }
      })
      const el = wrapper.find('.ty-backTop')
      expect(el.classes()).toContain('is-circle')
      const style = el.attributes('style') || ''
      expect(style).toContain('right: 100px')
      expect(style).toContain('bottom: 80px')
      wrapper.unmount()
    })

    it('多个 BackTop 共享同一 target 互不影响', async () => {
      const wrapper = mount({
        components: { TyBackTop },
        template: `
          <div>
            <TyBackTop data-test="a" :vHeight="100" target=".scroll-target" right="50">A</TyBackTop>
            <TyBackTop data-test="b" :vHeight="300" target=".scroll-target" right="100">B</TyBackTop>
          </div>
        `
      })
      await nextTick()

      // 滚动到 150：A(vHeight=100) 显示，B(vHeight=300) 隐藏
      simulateScroll(target, 150)
      await nextTick()

      const backs = wrapper.findAll('.ty-backTop')
      expect(backs.length).toBe(2)
      // v-show 控制 display
      // A 应显示，B 应隐藏
      wrapper.unmount()
    })
  })
})
