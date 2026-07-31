import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

/**
 * TyConfigProvider 组件单元测试
 * 主题/令牌配置组件，操作 document.documentElement 的 CSS 变量
 * 依赖 generate（颜色生成器）和 MutationObserver
 */

// Mock generate 颜色生成器
const mockGenerate = vi.fn(() => [
  '#e6f0ff', '#b3d1ff', '#80b3ff', '#4d94ff',
  '#1a75ff', '#0052cc', '#003d99', '#002966',
  '#001433', '#000a1a'
])
vi.mock('../../../color/index.js', () => ({
  default: mockGenerate
}))

// 延迟导入，确保 mock 已注册
const TyConfigProvider = (await import('../index.ts')).default

describe('TyConfigProvider 组件', () => {
  let html

  beforeEach(() => {
    vi.clearAllMocks()
    mockGenerate.mockReturnValue([
      '#e6f0ff', '#b3d1ff', '#80b3ff', '#4d94ff',
      '#1a75ff', '#0052cc', '#003d99', '#002966',
      '#001433', '#000a1a'
    ])
    html = document.documentElement
    // 清理 html 上的样式和属性
    html.removeAttribute('toyar-theme')
    html.style.cssText = ''
  })

  afterEach(() => {
    html.removeAttribute('toyar-theme')
    html.style.cssText = ''
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-configProvider', () => {
      const wrapper = mount(TyConfigProvider)
      expect(wrapper.find('.ty-configProvider').exists()).toBe(true)
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TyConfigProvider)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('应渲染默认插槽内容', () => {
      const wrapper = mount(TyConfigProvider, {
        slots: { default: '<div class="child">内容</div>' }
      })
      expect(wrapper.find('.child').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== Props 默认值 =====
  describe('Props 默认值', () => {
    it('默认 theme 为 light', () => {
      const wrapper = mount(TyConfigProvider)
      expect(wrapper.props('theme')).toBe('light')
      wrapper.unmount()
    })

    it('默认 options 为空对象', () => {
      const wrapper = mount(TyConfigProvider)
      expect(wrapper.props('options')).toEqual({})
      wrapper.unmount()
    })

    it('默认 tokens 为空对象', () => {
      const wrapper = mount(TyConfigProvider)
      expect(wrapper.props('tokens')).toEqual({})
      wrapper.unmount()
    })
  })

  // ===== applyTokens - radius =====
  describe('applyTokens - radius', () => {
    it('应设置 --border-radius-{name} 变量', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { radius: { sm: '4px', md: '8px' } }
        }
      })
      expect(html.style.getPropertyValue('--border-radius-sm')).toBe('4px')
      expect(html.style.getPropertyValue('--border-radius-md')).toBe('8px')
      wrapper.unmount()
    })
  })

  // ===== applyTokens - fontSize =====
  describe('applyTokens - fontSize', () => {
    it('应设置 --font-{name} 变量', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { fontSize: { base: '14px', lg: '16px' } }
        }
      })
      expect(html.style.getPropertyValue('--font-base')).toBe('14px')
      expect(html.style.getPropertyValue('--font-lg')).toBe('16px')
      wrapper.unmount()
    })
  })

  // ===== applyTokens - fontWeight =====
  describe('applyTokens - fontWeight', () => {
    it('应设置 --font-weight-{name} 变量（值 × 100）', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { fontWeight: { normal: 4, bold: 7 } }
        }
      })
      expect(html.style.getPropertyValue('--font-weight-normal')).toBe('400')
      expect(html.style.getPropertyValue('--font-weight-bold')).toBe('700')
      wrapper.unmount()
    })
  })

  // ===== applyTokens - sizes =====
  describe('applyTokens - sizes', () => {
    it('应设置 --size-{name} 变量', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { sizes: { sm: '16px', lg: '24px' } }
        }
      })
      expect(html.style.getPropertyValue('--size-sm')).toBe('16px')
      expect(html.style.getPropertyValue('--size-lg')).toBe('24px')
      wrapper.unmount()
    })
  })

  // ===== applyTokens - zIndex =====
  describe('applyTokens - zIndex', () => {
    it('应设置 --zindex-{name} 变量', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { zIndex: { modal: 1000, popover: 1100 } }
        }
      })
      expect(html.style.getPropertyValue('--zindex-modal')).toBe('1000')
      expect(html.style.getPropertyValue('--zindex-popover')).toBe('1100')
      wrapper.unmount()
    })
  })

  // ===== applyTokens - borderWidth =====
  describe('applyTokens - borderWidth', () => {
    it('应设置 --border-{name} 变量', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { borderWidth: { sm: '1px', md: '2px' } }
        }
      })
      expect(html.style.getPropertyValue('--border-sm')).toBe('1px')
      expect(html.style.getPropertyValue('--border-md')).toBe('2px')
      wrapper.unmount()
    })
  })

  // ===== applyTokens - colors =====
  describe('applyTokens - colors', () => {
    it('应设置 --toyar-{colorName}-{i} 变量', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { colors: { blue: ['#bbdefb', '#90caf9', '#64b5f6'] } }
        }
      })
      expect(html.style.getPropertyValue('--toyar-blue-1')).toBe('#bbdefb')
      expect(html.style.getPropertyValue('--toyar-blue-2')).toBe('#90caf9')
      expect(html.style.getPropertyValue('--toyar-blue-3')).toBe('#64b5f6')
      wrapper.unmount()
    })
  })

  // ===== applyTokens - themeColorMap =====
  describe('applyTokens - themeColorMap', () => {
    it('应设置 --{name}-{i} 为 var(--toyar-{value}-{i})', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { themeColorMap: { primary: 'blue' } }
        }
      })
      for (let i = 1; i <= 7; i++) {
        expect(html.style.getPropertyValue(`--primary-${i}`)).toBe(
          `var(--toyar-blue-${i})`
        )
      }
      wrapper.unmount()
    })
  })

  // ===== applyTokens - shadow =====
  describe('applyTokens - shadow', () => {
    it('应设置 --shadow-{level} 变量', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { shadow: { sm: '0 2px 4px rgba(0,0,0,.1)', lg: '0 8px 16px rgba(0,0,0,.2)' } }
        }
      })
      expect(html.style.getPropertyValue('--shadow-sm')).toBe('0 2px 4px rgba(0,0,0,.1)')
      expect(html.style.getPropertyValue('--shadow-lg')).toBe('0 8px 16px rgba(0,0,0,.2)')
      wrapper.unmount()
    })
  })

  // ===== applyTokens - bg =====
  describe('applyTokens - bg', () => {
    it('应设置 --bg-{i} 变量', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { bg: ['#fff', '#f5f5f5', '#e8e8e8'] }
        }
      })
      expect(html.style.getPropertyValue('--bg-1')).toBe('#fff')
      expect(html.style.getPropertyValue('--bg-2')).toBe('#f5f5f5')
      expect(html.style.getPropertyValue('--bg-3')).toBe('#e8e8e8')
      wrapper.unmount()
    })
  })

  // ===== applyTokens - textLevels =====
  describe('applyTokens - textLevels', () => {
    it('应设置 --text-{level} 为 var(--toyar-gray-{value})', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { textLevels: { 1: 9, 2: 7, 3: 5 } }
        }
      })
      expect(html.style.getPropertyValue('--text-1')).toBe('var(--toyar-gray-9)')
      expect(html.style.getPropertyValue('--text-2')).toBe('var(--toyar-gray-7)')
      expect(html.style.getPropertyValue('--text-3')).toBe('var(--toyar-gray-5)')
      wrapper.unmount()
    })
  })

  // ===== applyTokens - borderLevels =====
  describe('applyTokens - borderLevels', () => {
    it('应设置 --border-color-{level} 为 var(--toyar-gray-{value})', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { borderLevels: { 1: 3, 2: 5 } }
        }
      })
      expect(html.style.getPropertyValue('--border-color-1')).toBe('var(--toyar-gray-3)')
      expect(html.style.getPropertyValue('--border-color-2')).toBe('var(--toyar-gray-5)')
      wrapper.unmount()
    })
  })

  // ===== changeParmary - options.resetPrimary =====
  describe('changeParmary - options.resetPrimary', () => {
    it('options.resetPrimary 变化时调用 generate', async () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          options: { resetPrimary: '#ff0000' }
        }
      })
      // watch 会在 resetPrimary 变化时调用 changeParmary → generate
      mockGenerate.mockClear()
      await wrapper.setProps({
        options: { resetPrimary: '#00ff00' }
      })
      expect(mockGenerate).toHaveBeenCalledWith(
        '#00ff00',
        expect.objectContaining({ list: true })
      )
      wrapper.unmount()
    })

    it('changeParmary 设置 --primary-{1..10} 变量', async () => {
      mockGenerate.mockReturnValue([
        '#c1', '#c2', '#c3', '#c4', '#c5',
        '#c6', '#c7', '#c8', '#c9', '#c10'
      ])
      const wrapper = mount(TyConfigProvider, {
        props: {
          options: { resetPrimary: '#1890ff' }
        }
      })
      // watch 仅在 resetPrimary 值变化时触发，需改为不同值
      await wrapper.setProps({
        options: { resetPrimary: '#0066ff' }
      })
      expect(html.style.getPropertyValue('--primary-1')).toBe('#c1')
      expect(html.style.getPropertyValue('--primary-5')).toBe('#c5')
      expect(html.style.getPropertyValue('--primary-10')).toBe('#c10')
      wrapper.unmount()
    })

    it('dark 主题时 generate 传入 dark: true', async () => {
      html.setAttribute('toyar-theme', 'dark')
      const wrapper = mount(TyConfigProvider, {
        props: {
          options: { resetPrimary: '#1890ff' }
        }
      })
      mockGenerate.mockClear()
      await wrapper.setProps({
        options: { resetPrimary: '#0066ff' }
      })
      expect(mockGenerate).toHaveBeenCalledWith(
        '#0066ff',
        expect.objectContaining({ dark: true })
      )
      wrapper.unmount()
    })
  })

  // ===== 生命周期 =====
  describe('生命周期', () => {
    it('onMounted 时调用 applyTokens', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { radius: { base: '6px' } }
        }
      })
      // onMounted 应已设置 CSS 变量
      expect(html.style.getPropertyValue('--border-radius-base')).toBe('6px')
      wrapper.unmount()
    })

    it('onBeforeUnmount 时断开 MutationObserver', () => {
      const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect')
      const wrapper = mount(TyConfigProvider)
      wrapper.unmount()
      expect(disconnectSpy).toHaveBeenCalled()
      disconnectSpy.mockRestore()
    })

    it('tokens 变化时重新应用（deep watch）', async () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { radius: { sm: '4px' } }
        }
      })
      expect(html.style.getPropertyValue('--border-radius-sm')).toBe('4px')

      await wrapper.setProps({
        tokens: { radius: { sm: '8px' } }
      })
      expect(html.style.getPropertyValue('--border-radius-sm')).toBe('8px')
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('空 tokens 不设置任何 CSS 变量', () => {
      const wrapper = mount(TyConfigProvider)
      expect(html.style.cssText).toBe('')
      wrapper.unmount()
    })

    it('tokens 部分类别为空对象时正常渲染', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { radius: {}, fontSize: { base: '14px' } }
        }
      })
      expect(html.style.getPropertyValue('--font-base')).toBe('14px')
      wrapper.unmount()
    })

    it('colors 中非数组的值被跳过', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: { colors: { invalid: 'not-an-array' } }
        }
      })
      expect(html.style.getPropertyValue('--toyar-invalid-1')).toBe('')
      wrapper.unmount()
    })

    it('多 token 类别组合', () => {
      const wrapper = mount(TyConfigProvider, {
        props: {
          tokens: {
            radius: { sm: '4px' },
            fontSize: { base: '14px' },
            shadow: { sm: '0 2px 4px' },
            bg: ['#fff', '#f0f0f0'],
            zIndex: { modal: 1000 }
          }
        }
      })
      expect(html.style.getPropertyValue('--border-radius-sm')).toBe('4px')
      expect(html.style.getPropertyValue('--font-base')).toBe('14px')
      expect(html.style.getPropertyValue('--shadow-sm')).toBe('0 2px 4px')
      expect(html.style.getPropertyValue('--bg-1')).toBe('#fff')
      expect(html.style.getPropertyValue('--bg-2')).toBe('#f0f0f0')
      expect(html.style.getPropertyValue('--zindex-modal')).toBe('1000')
      wrapper.unmount()
    })
  })
})
