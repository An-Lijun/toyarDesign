import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import TyBadge from '../index.ts'

/**
 * TyBadge 组件单元测试
 * 组件逻辑简单：根据 dot/max/text 计算显示文本，无外部依赖需 mock
 */

describe('TyBadge 组件', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-badge', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 5 },
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-badge').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染文本容器 ty-badge__text', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 5 }
      })
      expect(wrapper.find('.ty-badge__text').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染默认插槽内容', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 5 },
        slots: { default: '<button class="btn">按钮</button>' }
      })
      expect(wrapper.find('.btn').exists()).toBe(true)
      wrapper.unmount()
    })

    it('数字 text 应渲染在 ty-badge__text 内', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 8 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('8')
      wrapper.unmount()
    })

    it('字符串 text 应渲染在 ty-badge__text 内', () => {
      const wrapper = mount(TyBadge, {
        props: { text: '新' }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('新')
      wrapper.unmount()
    })
  })

  // ===== Props - status =====
  describe('Props - status', () => {
    it('默认 status 为 danger，应添加 ty-badge--danger 类', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 1 }
      })
      expect(wrapper.find('.ty-badge').classes()).toContain('ty-badge--danger')
      wrapper.unmount()
    })

    it('status=primary 应添加 ty-badge--primary 类', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 1, status: 'primary' }
      })
      expect(wrapper.find('.ty-badge').classes()).toContain('ty-badge--primary')
      wrapper.unmount()
    })

    it('status=success 应添加 ty-badge--success 类', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 1, status: 'success' }
      })
      expect(wrapper.find('.ty-badge').classes()).toContain('ty-badge--success')
      wrapper.unmount()
    })

    it('status=warning 应添加 ty-badge--warning 类', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 1, status: 'warning' }
      })
      expect(wrapper.find('.ty-badge').classes()).toContain('ty-badge--warning')
      wrapper.unmount()
    })

    it('切换 status 应更新类名', async () => {
      const wrapper = mount(TyBadge, {
        props: { text: 1, status: 'danger' }
      })
      expect(wrapper.find('.ty-badge').classes()).toContain('ty-badge--danger')

      await wrapper.setProps({ status: 'primary' })
      expect(wrapper.find('.ty-badge').classes()).not.toContain('ty-badge--danger')
      expect(wrapper.find('.ty-badge').classes()).toContain('ty-badge--primary')
      wrapper.unmount()
    })
  })

  // ===== Props - dot =====
  describe('Props - dot', () => {
    it('默认 dot 为 false，不添加 is-dot 类', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 5 }
      })
      expect(wrapper.find('.ty-badge').classes()).not.toContain('is-dot')
      wrapper.unmount()
    })

    it('dot=true 时应添加 is-dot 类', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 5, dot: true }
      })
      expect(wrapper.find('.ty-badge').classes()).toContain('is-dot')
      wrapper.unmount()
    })

    it('dot=true 时文本应为空', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 99, dot: true }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('')
      wrapper.unmount()
    })

    it('切换 dot 应更新类名和文本', async () => {
      const wrapper = mount(TyBadge, {
        props: { text: 10, dot: false }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('10')

      await wrapper.setProps({ dot: true })
      expect(wrapper.find('.ty-badge').classes()).toContain('is-dot')
      expect(wrapper.find('.ty-badge__text').text()).toBe('')
      wrapper.unmount()
    })
  })

  // ===== Props - max =====
  describe('Props - max', () => {
    it('默认 max 为 99', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 50 }
      })
      expect(wrapper.props('max')).toBe(99)
      wrapper.unmount()
    })

    it('数字 text < max 时应显示原数字', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 50, max: 99 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('50')
      wrapper.unmount()
    })

    it('数字 text > max 时应显示 max+', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 150, max: 99 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('99+')
      wrapper.unmount()
    })

    it('数字 text = max 时应显示原数字（不显示 +）', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 99, max: 99 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('99')
      wrapper.unmount()
    })

    it('自定义 max 时应按自定义值截断', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 10, max: 5 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('5+')
      wrapper.unmount()
    })

    it('max 不影响字符串 text', () => {
      const wrapper = mount(TyBadge, {
        props: { text: '优化', max: 5 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('优化')
      wrapper.unmount()
    })

    it('text 刚好比 max 大 1 时应显示 max+', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 6, max: 5 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('5+')
      wrapper.unmount()
    })
  })

  // ===== Props - text =====
  describe('Props - text', () => {
    it('text 为 0 时应显示 0', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 0 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('0')
      wrapper.unmount()
    })

    it('text 为空字符串时被 Number("") 转为 0 显示', () => {
      // useBadge 逻辑：!isNaN(Number("")) === !isNaN(0) === true，进入数字分支
      const wrapper = mount(TyBadge, {
        props: { text: '' }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('0')
      wrapper.unmount()
    })

    it('text 为负数时应显示原数字', () => {
      const wrapper = mount(TyBadge, {
        props: { text: -5 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('-5')
      wrapper.unmount()
    })

    it('text 变化时应更新显示', async () => {
      const wrapper = mount(TyBadge, {
        props: { text: 5 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('5')

      await wrapper.setProps({ text: 200 })
      expect(wrapper.find('.ty-badge__text').text()).toBe('99+')

      await wrapper.setProps({ text: '新消息' })
      expect(wrapper.find('.ty-badge__text').text()).toBe('新消息')
      wrapper.unmount()
    })
  })

  // ===== useBadge Hook 逻辑 =====
  describe('useBadge Hook 逻辑', () => {
    it('dot=true 时无论 text 是什么都返回空字符串', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 999, dot: true }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('')
      wrapper.unmount()
    })

    it('字符串数字 text 应按数字处理', () => {
      // text: '50' → Number('50') = 50, 50 <= 99 → '50'
      const wrapper = mount(TyBadge, {
        props: { text: '50' }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('50')
      wrapper.unmount()
    })

    it('字符串数字 text 超过 max 应显示 max+', () => {
      // text: '150' → Number('150') = 150, 150 > 99 → '99+'
      const wrapper = mount(TyBadge, {
        props: { text: '150' }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('99+')
      wrapper.unmount()
    })

    it('非数字字符串 text 应原样返回', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 'ABC' }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('ABC')
      wrapper.unmount()
    })
  })

  // ===== icon 插槽 =====
  describe('icon 插槽', () => {
    it('icon 插槽应替换默认文本', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 5 },
        slots: {
          icon: '<span class="custom-icon">★</span>'
        }
      })
      const textEl = wrapper.find('.ty-badge__text')
      expect(textEl.find('.custom-icon').exists()).toBe(true)
      // text=5 不应显示（被 icon 插槽替换）
      expect(textEl.text()).not.toContain('5')
      wrapper.unmount()
    })

    it('未传 icon 插槽时应显示 text', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 8 }
      })
      expect(wrapper.find('.ty-badge__text').text()).toBe('8')
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('max=0 时任何正数 text 都显示 0+', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 5, max: 0 }
      })
      // 5 > 0 → '0+'
      expect(wrapper.find('.ty-badge__text').text()).toBe('0+')
      wrapper.unmount()
    })

    it('同时设置 dot、status、max', () => {
      const wrapper = mount(TyBadge, {
        props: { text: 200, dot: true, status: 'success', max: 50 }
      })
      const badge = wrapper.find('.ty-badge')
      expect(badge.classes()).toContain('is-dot')
      expect(badge.classes()).toContain('ty-badge--success')
      // dot=true，文本为空
      expect(wrapper.find('.ty-badge__text').text()).toBe('')
      wrapper.unmount()
    })

    it('多个 badge 独立渲染互不影响', () => {
      const wrapper = mount({
        components: { TyBadge },
        template: `
          <div>
            <TyBadge data-test="a" :text="5" status="primary">A</TyBadge>
            <TyBadge data-test="b" :text="200" status="danger">B</TyBadge>
            <TyBadge data-test="c" :dot="true" :text="10">C</TyBadge>
          </div>
        `
      })
      const badges = wrapper.findAll('.ty-badge')
      expect(badges.length).toBe(3)

      const a = wrapper.find('[data-test="a"]')
      const b = wrapper.find('[data-test="b"]')
      const c = wrapper.find('[data-test="c"]')

      expect(a.find('.ty-badge__text').text()).toBe('5')
      expect(b.find('.ty-badge__text').text()).toBe('99+')
      expect(c.find('.ty-badge__text').text()).toBe('')
      expect(c.classes()).toContain('is-dot')
      wrapper.unmount()
    })
  })
})
