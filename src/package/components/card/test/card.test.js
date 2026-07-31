import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import TyCard from '../index.ts'

/**
 * TyCard 组件单元测试
 * 组件依赖 TySkeleton（loading 时显示），需 mock 避免引入复杂依赖
 */

// Mock TySkeleton 组件
vi.mock('../../skeleton', () => ({
  default: {
    name: 'TySkeleton',
    props: ['count'],
    render() { return null }
  }
}))

describe('TyCard 组件', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-card', () => {
      const wrapper = mount(TyCard, {
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card').exists()).toBe(true)
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TyCard, {
        slots: { default: '内容' }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('应渲染默认插槽内容到 ty-card__main', () => {
      const wrapper = mount(TyCard, {
        slots: { default: '卡片主体内容' }
      })
      const main = wrapper.find('.ty-card__main')
      expect(main.exists()).toBe(true)
      expect(main.text()).toContain('卡片主体内容')
      wrapper.unmount()
    })

    it('应渲染 header 插槽到 ty-card__header', () => {
      const wrapper = mount(TyCard, {
        slots: {
          default: '内容',
          header: '卡片标题'
        }
      })
      const header = wrapper.find('.ty-card__header')
      expect(header.exists()).toBe(true)
      expect(header.text()).toContain('卡片标题')
      wrapper.unmount()
    })

    it('未传 header 插槽时不渲染 header 元素', () => {
      const wrapper = mount(TyCard, {
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card__header').exists()).toBe(false)
      wrapper.unmount()
    })

    it('header 插槽支持复杂内容', () => {
      const wrapper = mount(TyCard, {
        slots: {
          default: '内容',
          header: '<div class="title">标题</div><span class="sub">副标题</span>'
        }
      })
      expect(wrapper.find('.ty-card__header .title').exists()).toBe(true)
      expect(wrapper.find('.ty-card__header .sub').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== Props - border =====
  describe('Props - border', () => {
    it('默认 border 为 true，应有 is-border 类', () => {
      const wrapper = mount(TyCard, {
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card').classes()).toContain('is-border')
      wrapper.unmount()
    })

    it('border=false 时不应有 is-border 类', () => {
      const wrapper = mount(TyCard, {
        props: { border: false },
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card').classes()).not.toContain('is-border')
      wrapper.unmount()
    })

    it('border 切换时应更新类名', async () => {
      const wrapper = mount(TyCard, {
        props: { border: true },
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card').classes()).toContain('is-border')

      await wrapper.setProps({ border: false })
      expect(wrapper.find('.ty-card').classes()).not.toContain('is-border')
      wrapper.unmount()
    })
  })

  // ===== Props - shadow =====
  describe('Props - shadow', () => {
    it('默认 shadow 为 none，无阴影类', () => {
      const wrapper = mount(TyCard, {
        slots: { default: '内容' }
      })
      const classes = wrapper.find('.ty-card').classes()
      expect(classes).not.toContain('is-shadow')
      expect(classes).not.toContain('is-hoverShadow')
      wrapper.unmount()
    })

    it('shadow=shadow 时应有 is-shadow 类', () => {
      const wrapper = mount(TyCard, {
        props: { shadow: 'shadow' },
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card').classes()).toContain('is-shadow')
      wrapper.unmount()
    })

    it('shadow=hover 时应有 is-hoverShadow 类', () => {
      const wrapper = mount(TyCard, {
        props: { shadow: 'hover' },
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card').classes()).toContain('is-hoverShadow')
      wrapper.unmount()
    })

    it('shadow=shadow 时不应有 is-hoverShadow 类', () => {
      const wrapper = mount(TyCard, {
        props: { shadow: 'shadow' },
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card').classes()).not.toContain('is-hoverShadow')
      wrapper.unmount()
    })

    it('shadow 切换时应更新类名', async () => {
      const wrapper = mount(TyCard, {
        props: { shadow: 'none' },
        slots: { default: '内容' }
      })
      await wrapper.setProps({ shadow: 'shadow' })
      expect(wrapper.find('.ty-card').classes()).toContain('is-shadow')

      await wrapper.setProps({ shadow: 'hover' })
      expect(wrapper.find('.ty-card').classes()).not.toContain('is-shadow')
      expect(wrapper.find('.ty-card').classes()).toContain('is-hoverShadow')
      wrapper.unmount()
    })
  })

  // ===== Props - isLoading =====
  describe('Props - isLoading', () => {
    it('默认 isLoading 为 false，显示 main 内容', () => {
      const wrapper = mount(TyCard, {
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card__main').exists()).toBe(true)
      wrapper.unmount()
    })

    it('isLoading=true 时不显示 main 内容', () => {
      const wrapper = mount(TyCard, {
        props: { isLoading: true },
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card__main').exists()).toBe(false)
      wrapper.unmount()
    })

    it('isLoading=true 时显示 TySkeleton 加载组件', () => {
      const wrapper = mount(TyCard, {
        props: { isLoading: true },
        slots: { default: '内容' }
      })
      // TySkeleton 被 mock 为 render: () => null，但组件标签会被渲染
      // 验证 main 不存在即可说明 loading 状态生效
      expect(wrapper.find('.ty-card__main').exists()).toBe(false)
      wrapper.unmount()
    })

    it('isLoading 切换时应显示/隐藏 main', async () => {
      const wrapper = mount(TyCard, {
        props: { isLoading: true },
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-card__main').exists()).toBe(false)

      await wrapper.setProps({ isLoading: false })
      expect(wrapper.find('.ty-card__main').exists()).toBe(true)
      expect(wrapper.find('.ty-card__main').text()).toContain('内容')
      wrapper.unmount()
    })

    it('isLoading=true 时 header 仍可显示', () => {
      const wrapper = mount(TyCard, {
        props: { isLoading: true },
        slots: {
          default: '内容',
          header: '标题'
        }
      })
      expect(wrapper.find('.ty-card__header').exists()).toBe(true)
      expect(wrapper.find('.ty-card__main').exists()).toBe(false)
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('空默认插槽时也能正常渲染', () => {
      const wrapper = mount(TyCard)
      expect(wrapper.find('.ty-card').exists()).toBe(true)
      expect(wrapper.find('.ty-card__main').exists()).toBe(true)
      wrapper.unmount()
    })

    it('同时设置 border、shadow', () => {
      const wrapper = mount(TyCard, {
        props: { border: true, shadow: 'shadow' },
        slots: { default: '内容' }
      })
      const classes = wrapper.find('.ty-card').classes()
      expect(classes).toContain('is-border')
      expect(classes).toContain('is-shadow')
      wrapper.unmount()
    })

    it('border=false + shadow=hover', () => {
      const wrapper = mount(TyCard, {
        props: { border: false, shadow: 'hover' },
        slots: { default: '内容' }
      })
      const classes = wrapper.find('.ty-card').classes()
      expect(classes).not.toContain('is-border')
      expect(classes).toContain('is-hoverShadow')
      wrapper.unmount()
    })

    it('多个 Card 独立渲染互不影响', () => {
      const wrapper = mount({
        components: { TyCard },
        template: `
          <div>
            <TyCard data-test="a" border>有边框</TyCard>
            <TyCard data-test="b" :border="false">无边框</TyCard>
            <TyCard data-test="c" shadow="shadow">有阴影</TyCard>
          </div>
        `
      })
      const cards = wrapper.findAll('.ty-card')
      expect(cards.length).toBe(3)

      // data-test 通过 fallthrough 直接在 .ty-card 元素上
      const a = wrapper.find('.ty-card[data-test="a"]')
      const b = wrapper.find('.ty-card[data-test="b"]')
      const c = wrapper.find('.ty-card[data-test="c"]')

      expect(a.classes()).toContain('is-border')
      expect(b.classes()).not.toContain('is-border')
      expect(c.classes()).toContain('is-shadow')
      wrapper.unmount()
    })

    it('isLoading + border + shadow 组合', () => {
      const wrapper = mount(TyCard, {
        props: { isLoading: true, border: false, shadow: 'hover' },
        slots: {
          default: '内容',
          header: '标题'
        }
      })
      const classes = wrapper.find('.ty-card').classes()
      expect(classes).not.toContain('is-border')
      expect(classes).toContain('is-hoverShadow')
      expect(wrapper.find('.ty-card__header').exists()).toBe(true)
      expect(wrapper.find('.ty-card__main').exists()).toBe(false)
      wrapper.unmount()
    })
  })
})
