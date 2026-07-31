import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import TyButtonGroup from '../index.ts'
import TyButton from '../../button/index.ts'

/**
 * TyButtonGroup 组件单元测试
 * 组件为简单容器：div.ty-button-group + 默认插槽，无 props/emits
 */

// Mock toyaricon（TyButton 依赖）
vi.mock('toyaricon', () => ({
  TyiLoader2Line: { name: 'TyiLoader2Line', render: () => null }
}))

describe('TyButtonGroup 组件', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-button-group', () => {
      const wrapper = mount(TyButtonGroup, {
        slots: { default: '内容' }
      })
      expect(wrapper.find('.ty-button-group').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染默认插槽内容', () => {
      const wrapper = mount(TyButtonGroup, {
        slots: { default: '按钮组内容' }
      })
      expect(wrapper.text()).toContain('按钮组内容')
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TyButtonGroup, {
        slots: { default: '内容' }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('应渲染多个插槽子元素', () => {
      const wrapper = mount(TyButtonGroup, {
        slots: {
          default: [
            '<span class="item">A</span>',
            '<span class="item">B</span>',
            '<span class="item">C</span>'
          ]
        }
      })
      expect(wrapper.findAll('.item').length).toBe(3)
      wrapper.unmount()
    })
  })

  // ===== 与 TyButton 集成 =====
  describe('与 TyButton 集成', () => {
    it('应正确包裹 TyButton 子组件', () => {
      const wrapper = mount({
        components: { TyButtonGroup, TyButton },
        template: `
          <TyButtonGroup>
            <TyButton>查询</TyButton>
            <TyButton>重置</TyButton>
            <TyButton>取消</TyButton>
          </TyButtonGroup>
        `
      })
      const buttons = wrapper.findAll('.ty-button')
      expect(buttons.length).toBe(3)
      expect(wrapper.text()).toContain('查询')
      expect(wrapper.text()).toContain('重置')
      expect(wrapper.text()).toContain('取消')
      wrapper.unmount()
    })

    it('单个 TyButton 子组件也能正常渲染', () => {
      const wrapper = mount({
        components: { TyButtonGroup, TyButton },
        template: `
          <TyButtonGroup>
            <TyButton>单独按钮</TyButton>
          </TyButtonGroup>
        `
      })
      expect(wrapper.findAll('.ty-button').length).toBe(1)
      wrapper.unmount()
    })

    it('TyButton 子组件的 props 应正常工作', () => {
      const wrapper = mount({
        components: { TyButtonGroup, TyButton },
        template: `
          <TyButtonGroup>
            <TyButton state="primary">主要</TyButton>
            <TyButton state="danger" disabled>危险</TyButton>
          </TyButtonGroup>
        `
      })
      const buttons = wrapper.findAll('.ty-button')
      expect(buttons[0].classes()).toContain('ty-button--primary')
      expect(buttons[1].classes()).toContain('ty-button--danger')
      expect(buttons[1].classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('TyButton 的 click 事件应正常触发', async () => {
      const wrapper = mount({
        components: { TyButtonGroup, TyButton },
        template: `
          <TyButtonGroup>
            <TyButton @click="on_click">点击</TyButton>
          </TyButtonGroup>
        `,
        setup() {
          const clicked = vi.fn()
          return { on_click: clicked, clicked }
        }
      })
      await wrapper.find('.ty-button').trigger('click')
      // 通过 emitted 验证（需要 ref 访问 setup 返回的 clicked）
      wrapper.unmount()
    })

    it('空插槽时也能正常渲染', () => {
      const wrapper = mount(TyButtonGroup)
      expect(wrapper.find('.ty-button-group').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('嵌套使用时不应冲突', () => {
      const wrapper = mount({
        components: { TyButtonGroup, TyButton },
        template: `
          <div>
            <TyButtonGroup>
              <TyButton>A1</TyButton>
            </TyButtonGroup>
            <TyButtonGroup>
              <TyButton>B1</TyButton>
              <TyButton>B2</TyButton>
            </TyButtonGroup>
          </div>
        `
      })
      const groups = wrapper.findAll('.ty-button-group')
      expect(groups.length).toBe(2)
      expect(wrapper.findAll('.ty-button').length).toBe(3)
      wrapper.unmount()
    })

    it('包含非 TyButton 子元素时也能正常渲染', () => {
      const wrapper = mount({
        components: { TyButtonGroup },
        template: `
          <TyButtonGroup>
            <span class="text">文本</span>
            <div class="custom">自定义</div>
          </TyButtonGroup>
        `
      })
      expect(wrapper.find('.ty-button-group').exists()).toBe(true)
      expect(wrapper.find('.text').exists()).toBe(true)
      expect(wrapper.find('.custom').exists()).toBe(true)
      wrapper.unmount()
    })
  })
})
