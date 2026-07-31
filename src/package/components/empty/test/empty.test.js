import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

/**
 * TyEmpty 组件单元测试
 * 空状态组件，展示空图标 + 文本
 * Props: title(默认'暂无数据'), size(默认54)
 * 依赖: toyaricon/TyiInbox2Line
 */

// Mock toyaricon
vi.mock('toyaricon', () => ({
  TyiInbox2Line: {
    name: 'TyiInbox2Line',
    props: ['size'],
    template: '<svg class="mock-inbox-icon" :data-size="size"></svg>'
  }
}))

const TyEmpty = (await import('../index.ts')).default

describe('TyEmpty 组件', () => {
  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-empty', () => {
      const wrapper = mount(TyEmpty)
      expect(wrapper.find('.ty-empty').exists()).toBe(true)
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TyEmpty)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('应渲染 ty-empty__inner 子元素', () => {
      const wrapper = mount(TyEmpty)
      expect(wrapper.find('.ty-empty__inner').exists()).toBe(true)
      wrapper.unmount()
    })

    it('ty-empty__inner 应为 ty-empty 的直接子元素', () => {
      const wrapper = mount(TyEmpty)
      const rootEl = wrapper.find('.ty-empty').element
      const directChildren = Array.from(rootEl.children).map((c) =>
        Array.from(c.classList).join(' ')
      )
      expect(directChildren.some((c) => c.includes('ty-empty__inner'))).toBe(true)
      wrapper.unmount()
    })

    it('默认应渲染 TyiInbox2Line 图标组件', () => {
      const wrapper = mount(TyEmpty)
      expect(wrapper.find('.mock-inbox-icon').exists()).toBe(true)
      wrapper.unmount()
    })

    it('inner 中应包含 span 文本元素', () => {
      const wrapper = mount(TyEmpty)
      const inner = wrapper.find('.ty-empty__inner')
      expect(inner.find('span').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== Props - title =====
  describe('Props - title', () => {
    it('默认 title 为 暂无数据', () => {
      const wrapper = mount(TyEmpty)
      expect(wrapper.find('.ty-empty__inner span').text()).toBe('暂无数据')
      wrapper.unmount()
    })

    it('自定义 title 应正确显示', () => {
      const wrapper = mount(TyEmpty, {
        props: { title: '列表为空' }
      })
      expect(wrapper.find('.ty-empty__inner span').text()).toBe('列表为空')
      wrapper.unmount()
    })

    it('中文长 title 应正确显示', () => {
      const wrapper = mount(TyEmpty, {
        props: { title: '没有找到任何匹配的结果，请尝试其它条件' }
      })
      expect(wrapper.find('.ty-empty__inner span').text()).toBe(
        '没有找到任何匹配的结果，请尝试其它条件'
      )
      wrapper.unmount()
    })

    it('title 为空字符串时显示空文本', () => {
      const wrapper = mount(TyEmpty, {
        props: { title: '' }
      })
      expect(wrapper.find('.ty-empty__inner span').text()).toBe('')
      wrapper.unmount()
    })
  })

  // ===== Props - size =====
  describe('Props - size', () => {
    it('默认 size=54 → 图标 size 属性为 54', () => {
      const wrapper = mount(TyEmpty)
      const icon = wrapper.find('.mock-inbox-icon')
      expect(icon.attributes('data-size')).toBe('54')
      wrapper.unmount()
    })

    it('自定义 size=100 → 图标 size 属性为 100', () => {
      const wrapper = mount(TyEmpty, {
        props: { size: 100 }
      })
      const icon = wrapper.find('.mock-inbox-icon')
      expect(icon.attributes('data-size')).toBe('100')
      wrapper.unmount()
    })

    it('自定义 size=32 → 图标 size 属性为 32', () => {
      const wrapper = mount(TyEmpty, {
        props: { size: 32 }
      })
      const icon = wrapper.find('.mock-inbox-icon')
      expect(icon.attributes('data-size')).toBe('32')
      wrapper.unmount()
    })

    it('size=0 → 图标 size 属性为 0', () => {
      const wrapper = mount(TyEmpty, {
        props: { size: 0 }
      })
      const icon = wrapper.find('.mock-inbox-icon')
      expect(icon.attributes('data-size')).toBe('0')
      wrapper.unmount()
    })
  })

  // ===== 插槽 =====
  describe('插槽', () => {
    it('icon 插槽可替换默认图标', () => {
      const wrapper = mount(TyEmpty, {
        slots: {
          icon: '<div class="custom-icon">自定义图标</div>'
        }
      })
      expect(wrapper.find('.custom-icon').exists()).toBe(true)
      expect(wrapper.find('.mock-inbox-icon').exists()).toBe(false)
      wrapper.unmount()
    })

    it('icon 插槽内容渲染到 inner 内', () => {
      const wrapper = mount(TyEmpty, {
        slots: {
          icon: '<span class="slot-icon">ICON</span>'
        }
      })
      const inner = wrapper.find('.ty-empty__inner')
      expect(inner.find('.slot-icon').exists()).toBe(true)
      expect(inner.find('.slot-icon').text()).toBe('ICON')
      wrapper.unmount()
    })

    it('icon 插槽替换后 title 仍正常显示', () => {
      const wrapper = mount(TyEmpty, {
        props: { title: '自定义空状态' },
        slots: {
          icon: '<div class="my-icon">★</div>'
        }
      })
      expect(wrapper.find('.my-icon').exists()).toBe(true)
      expect(wrapper.find('.ty-empty__inner span').text()).toBe('自定义空状态')
      wrapper.unmount()
    })
  })

  // ===== useEmpty Hook =====
  describe('useEmpty Hook', () => {
    it('useTyEmpty 应暴露 useEmpty', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyEmpty).toBeTruthy()
      expect(mod.useTyEmpty.useEmpty).toBeTypeOf('function')
    })

    it('useEmpty 返回空对象', async () => {
      const mod = await import('../index.ts')
      const result = mod.useTyEmpty.useEmpty({ title: 'x', size: 1 })
      expect(result).toEqual({})
    })

    it('useTyEmpty 应暴露 useProps / nm / staticProps', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyEmpty.useProps).toBeTruthy()
      expect(mod.useTyEmpty.nm).toBeTruthy()
      expect(mod.useTyEmpty.staticProps).toBeTruthy()
    })
  })

  // ===== staticProps 验证 =====
  describe('staticProps 配置', () => {
    it('staticProps 中 title 默认值为 暂无数据', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyEmpty.staticProps.title.default).toBe('暂无数据')
    })

    it('staticProps 中 title 类型为 String', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyEmpty.staticProps.title.type).toBe(String)
    })

    it('staticProps 中 size 默认值为 54', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyEmpty.staticProps.size.default).toBe(54)
    })

    it('staticProps 中 size 类型为 Number', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyEmpty.staticProps.size.type).toBe(Number)
    })
  })

  // ===== 响应式更新 =====
  describe('响应式更新', () => {
    it('title 变化时文本应更新', async () => {
      const wrapper = mount(TyEmpty, {
        props: { title: '初始文本' }
      })
      expect(wrapper.find('.ty-empty__inner span').text()).toBe('初始文本')
      await wrapper.setProps({ title: '更新后的文本' })
      expect(wrapper.find('.ty-empty__inner span').text()).toBe('更新后的文本')
      wrapper.unmount()
    })

    it('size 变化时图标 size 应更新', async () => {
      const wrapper = mount(TyEmpty, {
        props: { size: 30 }
      })
      expect(wrapper.find('.mock-inbox-icon').attributes('data-size')).toBe('30')
      await wrapper.setProps({ size: 80 })
      expect(wrapper.find('.mock-inbox-icon').attributes('data-size')).toBe('80')
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('组合 Props（自定义 title + size）', () => {
      const wrapper = mount(TyEmpty, {
        props: { title: '数据加载失败', size: 72 }
      })
      expect(wrapper.find('.ty-empty').exists()).toBe(true)
      expect(wrapper.find('.ty-empty__inner span').text()).toBe('数据加载失败')
      expect(wrapper.find('.mock-inbox-icon').attributes('data-size')).toBe('72')
      wrapper.unmount()
    })

    it('多个 Empty 组件独立渲染', () => {
      const wrapper = mount({
        components: { TyEmpty },
        template: `
          <div>
            <TyEmpty data-test="a" title="暂无A" :size="40" />
            <TyEmpty data-test="b" title="暂无B" :size="60" />
          </div>
        `
      })
      const a = wrapper.find('[data-test="a"]')
      const b = wrapper.find('[data-test="b"]')
      expect(a.find('.ty-empty__inner span').text()).toBe('暂无A')
      expect(b.find('.ty-empty__inner span').text()).toBe('暂无B')
      expect(a.find('.mock-inbox-icon').attributes('data-size')).toBe('40')
      expect(b.find('.mock-inbox-icon').attributes('data-size')).toBe('60')
      wrapper.unmount()
    })

    it('自定义 icon 插槽 + 自定义 title/size', () => {
      const wrapper = mount(TyEmpty, {
        props: { title: '无搜索结果', size: 100 },
        slots: {
          icon: '<img class="search-empty" src="empty.png" alt="empty" />'
        }
      })
      expect(wrapper.find('.search-empty').exists()).toBe(true)
      expect(wrapper.find('.search-empty').attributes('src')).toBe('empty.png')
      expect(wrapper.find('.ty-empty__inner span').text()).toBe('无搜索结果')
      // 自定义插槽时 size 不再传递给默认图标
      expect(wrapper.find('.mock-inbox-icon').exists()).toBe(false)
      wrapper.unmount()
    })
  })
})
