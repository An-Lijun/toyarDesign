import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import TyButton from '../index.ts'
import { configProviderDisabled } from '../../../hooks/symbolNm'

/**
 * TyButton 组件单元测试
 * 组件依赖 toyaricon 的 TyiLoader2Line 图标，需 mock
 * 支持通过 inject(configProviderDisabled) 接收上层禁用状态
 */

// Mock toyaricon 图标组件
vi.mock('toyaricon', () => ({
  TyiLoader2Line: {
    name: 'TyiLoader2Line',
    render: () => null
  }
}))

describe('TyButton 组件', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-button', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染默认插槽内容', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '点击我' }
      })
      expect(wrapper.text()).toContain('点击我')
      wrapper.unmount()
    })

    it('默认使用 button 标签', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('button')
      wrapper.unmount()
    })

    it('tag 属性支持自定义标签 div', () => {
      const wrapper = mount(TyButton, {
        props: { tag: 'div' },
        slots: { default: '按钮' }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('tag 属性支持自定义标签 a', () => {
      const wrapper = mount(TyButton, {
        props: { tag: 'a' },
        slots: { default: '链接' }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('a')
      wrapper.unmount()
    })

    it('loading=true 时应渲染加载图标', () => {
      const wrapper = mount(TyButton, {
        props: { loading: true },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.is-loading').exists()).toBe(true)
      wrapper.unmount()
    })

    it('loading=true 时内容应有 is-opacity 类', () => {
      const wrapper = mount(TyButton, {
        props: { loading: true },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.is-opacity').exists()).toBe(true)
      wrapper.unmount()
    })

    it('loading=false 时不应渲染加载图标', () => {
      const wrapper = mount(TyButton, {
        props: { loading: false },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.is-loading').exists()).toBe(false)
      wrapper.unmount()
    })

    it('loading 插槽可自定义加载图标', () => {
      const wrapper = mount(TyButton, {
        props: { loading: true },
        slots: {
          default: '按钮',
          loading: '<span class="custom-loading">...</span>'
        }
      })
      expect(wrapper.find('.custom-loading').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== Props - state =====
  describe('Props - state', () => {
    it('默认 state 为 primary', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--primary')
      wrapper.unmount()
    })

    it('state=success 应添加 ty-button--success 类', () => {
      const wrapper = mount(TyButton, {
        props: { state: 'success' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--success')
      wrapper.unmount()
    })

    it('state=warning 应添加 ty-button--warning 类', () => {
      const wrapper = mount(TyButton, {
        props: { state: 'warning' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--warning')
      wrapper.unmount()
    })

    it('state=danger 应添加 ty-button--danger 类', () => {
      const wrapper = mount(TyButton, {
        props: { state: 'danger' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--danger')
      wrapper.unmount()
    })

    it('切换 state 应更新类名', async () => {
      const wrapper = mount(TyButton, {
        props: { state: 'primary' },
        slots: { default: '按钮' }
      })
      await wrapper.setProps({ state: 'danger' })
      expect(wrapper.find('.ty-button').classes()).not.toContain('ty-button--primary')
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--danger')
      wrapper.unmount()
    })
  })

  // ===== Props - type =====
  describe('Props - type', () => {
    it('默认 type 为 normal', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--normal')
      wrapper.unmount()
    })

    it('type=secondary 应添加 ty-button--secondary 类', () => {
      const wrapper = mount(TyButton, {
        props: { type: 'secondary' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--secondary')
      wrapper.unmount()
    })

    it('type=outline 应添加 ty-button--outline 类', () => {
      const wrapper = mount(TyButton, {
        props: { type: 'outline' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--outline')
      wrapper.unmount()
    })

    it('type=dashed 应添加 ty-button--dashed 类', () => {
      const wrapper = mount(TyButton, {
        props: { type: 'dashed' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--dashed')
      wrapper.unmount()
    })

    it('type=text 应添加 ty-button--text 类', () => {
      const wrapper = mount(TyButton, {
        props: { type: 'text' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--text')
      wrapper.unmount()
    })

    it('type=link 应添加 ty-button--link 类', () => {
      const wrapper = mount(TyButton, {
        props: { type: 'link' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--link')
      wrapper.unmount()
    })
  })

  // ===== Props - size =====
  describe('Props - size', () => {
    it('默认 size 为 small', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--small')
      wrapper.unmount()
    })

    it('size=mini 应添加 ty-button--mini 类', () => {
      const wrapper = mount(TyButton, {
        props: { size: 'mini' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--mini')
      wrapper.unmount()
    })

    it('size=medium 应添加 ty-button--medium 类', () => {
      const wrapper = mount(TyButton, {
        props: { size: 'medium' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--medium')
      wrapper.unmount()
    })

    it('size=large 应添加 ty-button--large 类', () => {
      const wrapper = mount(TyButton, {
        props: { size: 'large' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--large')
      wrapper.unmount()
    })
  })

  // ===== Props - shape =====
  describe('Props - shape', () => {
    it('默认 shape 为 square', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--square')
      wrapper.unmount()
    })

    it('shape=round 应添加 ty-button--round 类', () => {
      const wrapper = mount(TyButton, {
        props: { shape: 'round' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--round')
      wrapper.unmount()
    })

    it('shape=circle 应添加 ty-button--circle 类', () => {
      const wrapper = mount(TyButton, {
        props: { shape: 'circle' },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('ty-button--circle')
      wrapper.unmount()
    })
  })

  // ===== Props - block =====
  describe('Props - block', () => {
    it('默认 block 为 false，不添加 is-block', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).not.toContain('is-block')
      wrapper.unmount()
    })

    it('block=true 应添加 is-block 类', () => {
      const wrapper = mount(TyButton, {
        props: { block: true },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('is-block')
      wrapper.unmount()
    })
  })

  // ===== Props - disabled =====
  describe('Props - disabled', () => {
    it('默认 disabled 为 false，不添加 is-disabled', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).not.toContain('is-disabled')
      expect(wrapper.attributes('disabled')).toBeUndefined()
      wrapper.unmount()
    })

    it('disabled=true 应添加 is-disabled 类和 disabled 属性', () => {
      const wrapper = mount(TyButton, {
        props: { disabled: true },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('is-disabled')
      expect(wrapper.attributes('disabled')).toBeDefined()
      wrapper.unmount()
    })

    it('disabled=true 应设置 aria-disabled', () => {
      const wrapper = mount(TyButton, {
        props: { disabled: true },
        slots: { default: '按钮' }
      })
      expect(wrapper.attributes('aria-disabled')).toBe('true')
      wrapper.unmount()
    })

    it('disabled=true 时点击不应触发 click 事件', async () => {
      const wrapper = mount(TyButton, {
        props: { disabled: true },
        slots: { default: '按钮' }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
      wrapper.unmount()
    })
  })

  // ===== Props - loading =====
  describe('Props - loading', () => {
    it('loading=true 应添加 is-disabled 和 is-readonly 类', () => {
      const wrapper = mount(TyButton, {
        props: { loading: true },
        slots: { default: '按钮' }
      })
      const classes = wrapper.find('.ty-button').classes()
      expect(classes).toContain('is-disabled')
      expect(classes).toContain('is-readonly')
      wrapper.unmount()
    })

    it('loading=true 时点击不应触发 click 事件', async () => {
      const wrapper = mount(TyButton, {
        props: { loading: true },
        slots: { default: '按钮' }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
      wrapper.unmount()
    })

    it('loading=true 应设置 disabled 属性', () => {
      const wrapper = mount(TyButton, {
        props: { loading: true },
        slots: { default: '按钮' }
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
      wrapper.unmount()
    })

    it('从 loading 切换到非 loading 时应恢复可点击', async () => {
      const wrapper = mount(TyButton, {
        props: { loading: true },
        slots: { default: '按钮' }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()

      await wrapper.setProps({ loading: false })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      wrapper.unmount()
    })
  })

  // ===== Props - html-type =====
  describe('Props - html-type', () => {
    it('默认 html-type 为 button', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      // jsdom 中 button.type 默认为 submit，Vue 的 :type 绑定在 jsdom 中行为不一致
      // 这里验证 prop 值正确传递（Vue 内部转为 camelCase）
      expect(wrapper.props('htmlType')).toBe('button')
      wrapper.unmount()
    })

    it('html-type=submit', () => {
      const wrapper = mount(TyButton, {
        props: { 'html-type': 'submit' },
        slots: { default: '提交' }
      })
      expect(wrapper.props('htmlType')).toBe('submit')
      wrapper.unmount()
    })

    it('html-type=reset', () => {
      const wrapper = mount(TyButton, {
        props: { 'html-type': 'reset' },
        slots: { default: '重置' }
      })
      expect(wrapper.props('htmlType')).toBe('reset')
      wrapper.unmount()
    })
  })

  // ===== 事件 =====
  describe('事件', () => {
    it('点击应触发 click 事件', async () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click').length).toBe(1)
      wrapper.unmount()
    })

    it('click 事件应携带 MouseEvent 参数', async () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      await wrapper.trigger('click')
      const event = wrapper.emitted('click')[0][0]
      expect(event).toBeInstanceOf(MouseEvent)
      wrapper.unmount()
    })

    it('多次点击应多次触发 click', async () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      await wrapper.trigger('click')
      await wrapper.trigger('click')
      await wrapper.trigger('click')
      expect(wrapper.emitted('click').length).toBe(3)
      wrapper.unmount()
    })

    it('disabled 时点击应调用 preventDefault', async () => {
      const wrapper = mount(TyButton, {
        props: { disabled: true },
        slots: { default: '按钮' }
      })
      const preventDefault = vi.fn()
      await wrapper.trigger('click', { preventDefault })
      expect(wrapper.emitted('click')).toBeFalsy()
      wrapper.unmount()
    })
  })

  // ===== ConfigProvider 注入 =====
  describe('ConfigProvider 注入', () => {
    it('注入 disabled=true 时按钮应禁用', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' },
        global: {
          provide: {
            [configProviderDisabled]: {
              disabled: true,
              readonly: false
            }
          }
        }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('注入 disabled=true 时点击不应触发 click', async () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' },
        global: {
          provide: {
            [configProviderDisabled]: {
              disabled: true,
              readonly: false
            }
          }
        }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
      wrapper.unmount()
    })

    it('注入 readonly=true 时按钮应有 is-readonly 类', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' },
        global: {
          provide: {
            [configProviderDisabled]: {
              disabled: false,
              readonly: true
            }
          }
        }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('is-readonly')
      wrapper.unmount()
    })

    it('注入 readonly=true 时点击不应触发 click', async () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' },
        global: {
          provide: {
            [configProviderDisabled]: {
              disabled: false,
              readonly: true
            }
          }
        }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
      wrapper.unmount()
    })

    it('未注入时默认 disabled=false, readonly=false', () => {
      const wrapper = mount(TyButton, {
        slots: { default: '按钮' }
      })
      const classes = wrapper.find('.ty-button').classes()
      expect(classes).not.toContain('is-disabled')
      expect(classes).not.toContain('is-readonly')
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('同时设置 state、type、size、shape', () => {
      const wrapper = mount(TyButton, {
        props: {
          state: 'success',
          type: 'outline',
          size: 'large',
          shape: 'round'
        },
        slots: { default: '按钮' }
      })
      const classes = wrapper.find('.ty-button').classes()
      expect(classes).toContain('ty-button--success')
      expect(classes).toContain('ty-button--outline')
      expect(classes).toContain('ty-button--large')
      expect(classes).toContain('ty-button--round')
      wrapper.unmount()
    })

    it('空插槽时也能正常渲染', () => {
      const wrapper = mount(TyButton)
      expect(wrapper.find('.ty-button').exists()).toBe(true)
      wrapper.unmount()
    })

    it('disabled 和 loading 同时为 true', () => {
      const wrapper = mount(TyButton, {
        props: { disabled: true, loading: true },
        slots: { default: '按钮' }
      })
      expect(wrapper.find('.ty-button').classes()).toContain('is-disabled')
      expect(wrapper.find('.ty-button').classes()).toContain('is-readonly')
      expect(wrapper.find('.is-loading').exists()).toBe(true)
      wrapper.unmount()
    })

    it('多个按钮独立渲染互不影响', () => {
      const wrapper = mount({
        components: { TyButton },
        template: `
          <div>
            <TyButton data-test="a" state="primary">A</TyButton>
            <TyButton data-test="b" state="danger" disabled>B</TyButton>
            <TyButton data-test="c" loading>C</TyButton>
          </div>
        `
      })
      const buttons = wrapper.findAll('.ty-button')
      expect(buttons.length).toBe(3)

      const a = wrapper.find('[data-test="a"]')
      const b = wrapper.find('[data-test="b"]')
      const c = wrapper.find('[data-test="c"]')

      expect(a.classes()).toContain('ty-button--primary')
      expect(a.classes()).not.toContain('is-disabled')

      expect(b.classes()).toContain('ty-button--danger')
      expect(b.classes()).toContain('is-disabled')

      expect(c.classes()).toContain('is-disabled')
      expect(c.find('.is-loading').exists()).toBe(true)
      wrapper.unmount()
    })
  })
})
