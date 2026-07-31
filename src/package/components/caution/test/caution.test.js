import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import TyCaution from '../index.ts'

/**
 * TyCaution 组件单元测试
 * 组件依赖 toyaricon 的 3 个图标组件，需 mock
 */

// Mock toyaricon 图标组件，声明 props 以便测试读取
vi.mock('toyaricon', () => ({
  TyiInformationFill: { name: 'TyiInformationFill', props: ['size', 'color'], render: () => null },
  TyiCheckboxCircleFill: { name: 'TyiCheckboxCircleFill', props: ['size', 'color'], render: () => null },
  TyiCloseCircleFill: { name: 'TyiCloseCircleFill', props: ['size', 'color'], render: () => null }
}))

describe('TyCaution 组件', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-caution', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '提示' }
      })
      expect(wrapper.find('.ty-caution').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染内容容器 ty-caution__content', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '提示' }
      })
      expect(wrapper.find('.ty-caution__content').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染标题容器 ty-caution__title', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '提示标题' }
      })
      const titleEl = wrapper.find('.ty-caution__title')
      expect(titleEl.exists()).toBe(true)
      expect(titleEl.text()).toContain('提示标题')
      wrapper.unmount()
    })

    it('应渲染默认插槽到 ty-caution__subTitle', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题' },
        slots: { default: '详细描述内容' }
      })
      const subTitleEl = wrapper.find('.ty-caution__subTitle')
      expect(subTitleEl.exists()).toBe(true)
      expect(subTitleEl.text()).toContain('详细描述内容')
      wrapper.unmount()
    })

    it('未传默认插槽时不渲染 ty-caution__subTitle', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题' }
      })
      expect(wrapper.find('.ty-caution__subTitle').exists()).toBe(false)
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题' }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })
  })

  // ===== Props - type =====
  describe('Props - type', () => {
    it('默认 type 为 info，应有 ty-caution--info 类', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题' }
      })
      expect(wrapper.find('.ty-caution').classes()).toContain('ty-caution--info')
      wrapper.unmount()
    })

    it('type=success 应有 ty-caution--success 类', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', type: 'success' }
      })
      expect(wrapper.find('.ty-caution').classes()).toContain('ty-caution--success')
      wrapper.unmount()
    })

    it('type=warning 应有 ty-caution--warning 类', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', type: 'warning' }
      })
      expect(wrapper.find('.ty-caution').classes()).toContain('ty-caution--warning')
      wrapper.unmount()
    })

    it('type=error 应有 ty-caution--error 类', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', type: 'error' }
      })
      expect(wrapper.find('.ty-caution').classes()).toContain('ty-caution--error')
      wrapper.unmount()
    })

    it('切换 type 应更新类名', async () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', type: 'info' }
      })
      await wrapper.setProps({ type: 'error' })
      expect(wrapper.find('.ty-caution').classes()).not.toContain('ty-caution--info')
      expect(wrapper.find('.ty-caution').classes()).toContain('ty-caution--error')
      wrapper.unmount()
    })
  })

  // ===== Props - title =====
  describe('Props - title', () => {
    it('title 应渲染在 ty-caution__title 内', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '自定义标题' }
      })
      expect(wrapper.find('.ty-caution__title').text()).toContain('自定义标题')
      wrapper.unmount()
    })

    it('title 变化时应更新', async () => {
      const wrapper = mount(TyCaution, {
        props: { title: '旧标题' }
      })
      expect(wrapper.find('.ty-caution__title').text()).toContain('旧标题')

      await wrapper.setProps({ title: '新标题' })
      expect(wrapper.find('.ty-caution__title').text()).toContain('新标题')
      wrapper.unmount()
    })

    it('未传 title 时 ty-caution__title 为空', () => {
      const wrapper = mount(TyCaution)
      const titleEl = wrapper.find('.ty-caution__title')
      expect(titleEl.exists()).toBe(true)
      expect(titleEl.text()).toBe('')
      wrapper.unmount()
    })
  })

  // ===== Props - isShowIcon =====
  describe('Props - isShowIcon', () => {
    it('默认 isShowIcon 为 true，应渲染图标', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题' }
      })
      // 图标通过 component :is 渲染，mock 后 render 返回 null
      // 验证 component 标签存在（v-if 控制）
      const iconComponent = wrapper.findComponent({ name: 'TyiInformationFill' })
      expect(iconComponent.exists()).toBe(true)
      wrapper.unmount()
    })

    it('isShowIcon=false 时不渲染图标', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', isShowIcon: false }
      })
      const iconComponent = wrapper.findComponent({ name: 'TyiInformationFill' })
      expect(iconComponent.exists()).toBe(false)
      wrapper.unmount()
    })

    it('切换 isShowIcon 应显示/隐藏图标', async () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', isShowIcon: true }
      })
      expect(wrapper.findComponent({ name: 'TyiInformationFill' }).exists()).toBe(true)

      await wrapper.setProps({ isShowIcon: false })
      expect(wrapper.findComponent({ name: 'TyiInformationFill' }).exists()).toBe(false)
      wrapper.unmount()
    })

    it('不同 type 显示不同图标', () => {
      // info → TyiInformationFill
      const infoWrapper = mount(TyCaution, {
        props: { title: '标题', type: 'info' }
      })
      expect(infoWrapper.findComponent({ name: 'TyiInformationFill' }).exists()).toBe(true)
      infoWrapper.unmount()

      // success → TyiCheckboxCircleFill
      const successWrapper = mount(TyCaution, {
        props: { title: '标题', type: 'success' }
      })
      expect(successWrapper.findComponent({ name: 'TyiCheckboxCircleFill' }).exists()).toBe(true)
      successWrapper.unmount()

      // warning → TyiInformationFill
      const warningWrapper = mount(TyCaution, {
        props: { title: '标题', type: 'warning' }
      })
      expect(warningWrapper.findComponent({ name: 'TyiInformationFill' }).exists()).toBe(true)
      warningWrapper.unmount()

      // error → TyiCloseCircleFill
      const errorWrapper = mount(TyCaution, {
        props: { title: '标题', type: 'error' }
      })
      expect(errorWrapper.findComponent({ name: 'TyiCloseCircleFill' }).exists()).toBe(true)
      errorWrapper.unmount()
    })
  })

  // ===== Props - size =====
  describe('Props - size', () => {
    it('默认 size 为 24', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题' }
      })
      expect(wrapper.props('size')).toBe(24)
      wrapper.unmount()
    })

    it('自定义数字 size', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', size: 32 }
      })
      expect(wrapper.props('size')).toBe(32)
      wrapper.unmount()
    })

    it('自定义字符串 size', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', size: '20' }
      })
      expect(wrapper.props('size')).toBe('20')
      wrapper.unmount()
    })
  })

  // ===== useCaution Hook 逻辑 =====
  describe('useCaution Hook', () => {
    it('info 类型使用 primary 颜色变量', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', type: 'info' }
      })
      const icon = wrapper.findComponent({ name: 'TyiInformationFill' })
      expect(icon.props('color')).toBe('var(--primary-5)')
      wrapper.unmount()
    })

    it('success 类型使用 success 颜色变量', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', type: 'success' }
      })
      const icon = wrapper.findComponent({ name: 'TyiCheckboxCircleFill' })
      expect(icon.props('color')).toBe('var(--success-5)')
      wrapper.unmount()
    })

    it('warning 类型使用 warning 颜色变量', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', type: 'warning' }
      })
      const icon = wrapper.findComponent({ name: 'TyiInformationFill' })
      expect(icon.props('color')).toBe('var(--warning-5)')
      wrapper.unmount()
    })

    it('error 类型使用 danger 颜色变量', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', type: 'error' }
      })
      const icon = wrapper.findComponent({ name: 'TyiCloseCircleFill' })
      expect(icon.props('color')).toBe('var(--danger-5)')
      wrapper.unmount()
    })

    it('size 应传递给图标组件', () => {
      const wrapper = mount(TyCaution, {
        props: { title: '标题', size: 40 }
      })
      const icon = wrapper.findComponent({ name: 'TyiInformationFill' })
      expect(icon.props('size')).toBe(40)
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('同时设置 type、title、isShowIcon、size', () => {
      const wrapper = mount(TyCaution, {
        props: {
          type: 'success',
          title: '成功提示',
          isShowIcon: true,
          size: 32
        },
        slots: { default: '操作已完成' }
      })
      expect(wrapper.find('.ty-caution').classes()).toContain('ty-caution--success')
      expect(wrapper.find('.ty-caution__title').text()).toContain('成功提示')
      expect(wrapper.find('.ty-caution__subTitle').text()).toContain('操作已完成')
      const icon = wrapper.findComponent({ name: 'TyiCheckboxCircleFill' })
      expect(icon.props('size')).toBe(32)
      expect(icon.props('color')).toBe('var(--success-5)')
      wrapper.unmount()
    })

    it('isShowIcon=false + 无 title + 无 slot', () => {
      const wrapper = mount(TyCaution, {
        props: { isShowIcon: false }
      })
      expect(wrapper.findComponent({ name: 'TyiInformationFill' }).exists()).toBe(false)
      expect(wrapper.find('.ty-caution__title').text()).toBe('')
      expect(wrapper.find('.ty-caution__subTitle').exists()).toBe(false)
      wrapper.unmount()
    })

    it('多个 Caution 独立渲染互不影响', () => {
      const wrapper = mount({
        components: { TyCaution },
        template: `
          <div>
            <TyCaution data-test="a" type="info" title="信息" />
            <TyCaution data-test="b" type="error" title="错误" :isShowIcon="false">错误详情</TyCaution>
            <TyCaution data-test="c" type="success" title="成功">成功详情</TyCaution>
          </div>
        `
      })
      const cautions = wrapper.findAll('.ty-caution')
      expect(cautions.length).toBe(3)

      const a = wrapper.find('.ty-caution[data-test="a"]')
      const b = wrapper.find('.ty-caution[data-test="b"]')
      const c = wrapper.find('.ty-caution[data-test="c"]')

      expect(a.classes()).toContain('ty-caution--info')
      expect(a.find('.ty-caution__title').text()).toContain('信息')
      expect(a.find('.ty-caution__subTitle').exists()).toBe(false)

      expect(b.classes()).toContain('ty-caution--error')
      expect(b.find('.ty-caution__title').text()).toContain('错误')
      expect(b.find('.ty-caution__subTitle').text()).toContain('错误详情')
      expect(b.findComponent({ name: 'TyiCloseCircleFill' }).exists()).toBe(false)

      expect(c.classes()).toContain('ty-caution--success')
      expect(c.find('.ty-caution__title').text()).toContain('成功')
      expect(c.find('.ty-caution__subTitle').text()).toContain('成功详情')
      wrapper.unmount()
    })
  })
})
