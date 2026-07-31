import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

/**
 * TyWaterMark 组件单元测试
 * 水印组件，使用 Canvas + MutationObserver
 * 依赖 xss、robinson(debounce)
 *
 * Mock 策略：
 * 1. robinson debounce → immediate 模式（首次立即执行，catch rejection 防 worker 崩溃）
 * 2. xss → 透传
 * 3. HTMLCanvasElement.prototype.getContext → 返回 mock 2D context
 * 4. HTMLCanvasElement.prototype.toDataURL → 返回 mock data URL
 * 5. document.createElement('img') → src setter 触发 onerror（让 isImageByDom 立即 reject）
 */

// Mock robinson debounce
vi.mock('robinson', () => ({
  debounce: (fn, delay, immediate) => {
    if (immediate) {
      let called = false
      return (...args) => {
        if (!called) {
          called = true
          const result = fn(...args)
          if (result && typeof result.catch === 'function') {
            result.catch(() => {})
          }
        }
      }
    }
    return fn
  }
}))

// Mock xss 透传
vi.mock('xss', () => ({
  default: (str) => str
}))

// Mock canvas 2D context
// 注意：font 会被赋值多次（初始 fontSize，数组 markInfo 时再赋 fontSizeSed）
// 使用 fontAssignments 记录所有赋值，便于测试验证某个值是否被设置过
const fontAssignments = []
const mockCtx = {
  fillStyle: '',
  _font: '',
  get font() {
    return this._font
  },
  set font(v) {
    this._font = v
    fontAssignments.push(v)
  },
  textAlign: '',
  textBaseline: '',
  translate: vi.fn(),
  rotate: vi.fn(),
  fillText: vi.fn(),
  drawImage: vi.fn()
}

const mockToDataURL = vi.fn(() => 'data:image/png;base64,mockURL')

beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => mockCtx)
  HTMLCanvasElement.prototype.toDataURL = mockToDataURL

  // 重置所有 mockCtx 属性（防止测试间泄漏）
  mockCtx.fillStyle = ''
  mockCtx._font = ''
  mockCtx.textAlign = ''
  mockCtx.textBaseline = ''
  fontAssignments.length = 0
  mockCtx.fillText.mockClear()
  mockCtx.drawImage.mockClear()
  mockCtx.translate.mockClear()
  mockCtx.rotate.mockClear()
  mockToDataURL.mockClear()
})

afterEach(() => {
  // 不调用 vi.restoreAllMocks()，因为它会清除 vi.fn() 的实现
  // beforeEach 中会重新赋值所有 mock
})

const TyWaterMark = (await import('../index.ts')).default

describe('TyWaterMark 组件', () => {
  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-waterMark', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(wrapper.find('.ty-waterMark').exists()).toBe(true)
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('应渲染 ty-waterMark__mark', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(wrapper.find('.ty-waterMark__mark').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染默认插槽', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] },
        slots: { default: '<div class="content">内容</div>' }
      })
      expect(wrapper.find('.content').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== Props - markInfo（数组，同步） =====
  describe('Props - markInfo（数组）', () => {
    it('数组 markInfo 应调用 fillText 两次', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['第一行', '第二行'] }
      })
      expect(mockCtx.fillText).toHaveBeenCalledTimes(2)
      expect(mockCtx.fillText).toHaveBeenCalledWith('第一行', expect.any(Number), expect.any(Number))
      expect(mockCtx.fillText).toHaveBeenCalledWith('第二行', expect.any(Number), expect.any(Number))
      wrapper.unmount()
    })

    it('数组只有一个元素时仍调用 fillText 两次（第二行为空）', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['仅一行'] }
      })
      expect(mockCtx.fillText).toHaveBeenCalledTimes(2)
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('at least two'))
      wrapper.unmount()
      warnSpy.mockRestore()
    })

    it('mark 元素的 backgroundImage 被设置', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      const mark = wrapper.find('.ty-waterMark__mark')
      expect(mark.attributes('style')).toContain('background-image: url(data:image/png;base64,mockURL)')
      wrapper.unmount()
    })
  })

  // ===== Props - markInfo（字符串，异步） =====
  // 字符串 markInfo 会异步尝试加载图片（isImageByDom），jsdom 中无法触发 onload/onerror
  // 该场景需 E2E 测试覆盖，单元测试仅覆盖数组 markInfo（同步路径）

  // ===== Props - options =====
  describe('Props - options', () => {
    it('自定义 options 覆盖默认值', () => {
      const wrapper = mount(TyWaterMark, {
        props: {
          markInfo: ['水印'],
          options: {
            fontSize: 50,
            fontColor: 'red',
            width: 300,
            height: 300
          }
        }
      })
      expect(mockCtx.fillStyle).toBe('red')
      // font 会被赋值两次：初始 fontSize(50px) 和数组 markInfo 的 fontSizeSed(25px)
      expect(fontAssignments).toEqual(
        expect.arrayContaining([expect.stringContaining('50px')])
      )
      wrapper.unmount()
    })

    it('默认 fontColor 为 rgba(210,210,230,0.7)', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(mockCtx.fillStyle).toBe('rgba(210,210,230,0.7)')
      wrapper.unmount()
    })

    it('默认 fontSize 为 30', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      // 初始 font 赋值为 fontSize(30px)，数组 markInfo 后赋值为 fontSizeSed(25px)
      expect(fontAssignments).toEqual(
        expect.arrayContaining([expect.stringContaining('30px')])
      )
      wrapper.unmount()
    })

    it('默认 fontFamily 为 Arial', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(mockCtx.font).toContain('Arial')
      wrapper.unmount()
    })

    it('自定义 rotate', () => {
      const customRotate = Math.PI / 4
      const wrapper = mount(TyWaterMark, {
        props: {
          markInfo: ['水印'],
          options: { rotate: customRotate }
        }
      })
      expect(mockCtx.rotate).toHaveBeenCalledWith(customRotate)
      wrapper.unmount()
    })

    it('默认 rotate 为 -30 度（弧度）', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(mockCtx.rotate).toHaveBeenCalledWith((-30 * Math.PI) / 180)
      wrapper.unmount()
    })

    it('translate 调用 width/2, height/2', () => {
      const wrapper = mount(TyWaterMark, {
        props: {
          markInfo: ['水印'],
          options: { width: 200, height: 200 }
        }
      })
      expect(mockCtx.translate).toHaveBeenCalledWith(100, 100)
      wrapper.unmount()
    })

    it('toDataURL 被调用生成图片 URL', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(mockToDataURL).toHaveBeenCalledWith('image/png')
      wrapper.unmount()
    })
  })

  // ===== Canvas 操作 =====
  describe('Canvas 操作', () => {
    it('textAlign 设置为 center', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(mockCtx.textAlign).toBe('center')
      wrapper.unmount()
    })

    it('textBaseline 设置为 middle', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(mockCtx.textBaseline).toBe('middle')
      wrapper.unmount()
    })
  })

  // ===== MutationObserver（antiTamper） =====
  describe('MutationObserver（antiTamper）', () => {
    it('默认 antiTamper=false 不启动 observer', () => {
      const observeSpy = vi.spyOn(MutationObserver.prototype, 'observe')
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(observeSpy).not.toHaveBeenCalled()
      wrapper.unmount()
      observeSpy.mockRestore()
    })

    it('antiTamper=true 时启动 observer 观察 mark 元素', () => {
      const observeSpy = vi.spyOn(MutationObserver.prototype, 'observe')
      const wrapper = mount(TyWaterMark, {
        props: {
          markInfo: ['水印'],
          options: { antiTamper: true }
        }
      })
      expect(observeSpy).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({
          attributes: true,
          attributeFilter: ['style']
        })
      )
      wrapper.unmount()
      observeSpy.mockRestore()
    })

    it('onBeforeUnmount 时断开 observer', () => {
      const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect')
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      wrapper.unmount()
      expect(disconnectSpy).toHaveBeenCalled()
      disconnectSpy.mockRestore()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('组合 props（数组 + 自定义 options）', () => {
      const wrapper = mount(TyWaterMark, {
        props: {
          markInfo: ['公司名', '部门名'],
          options: {
            fontSize: 40,
            fontSizeSed: 30,
            fontColor: '#ccc',
            width: 300,
            height: 200,
            rotate: 0,
            antiTamper: true
          }
        },
        slots: { default: '<p>受保护内容</p>' }
      })
      expect(mockCtx.fillStyle).toBe('#ccc')
      // 初始 font 为 fontSize(40px)，数组 markInfo 后赋值为 fontSizeSed(30px)
      expect(fontAssignments).toEqual(
        expect.arrayContaining([expect.stringContaining('40px')])
      )
      expect(mockCtx.fillText).toHaveBeenCalledTimes(2)
      expect(mockCtx.rotate).toHaveBeenCalledWith(0)
      expect(wrapper.find('.ty-waterMark__mark').exists()).toBe(true)
      expect(wrapper.find('p').text()).toBe('受保护内容')
      wrapper.unmount()
    })

    it('空插槽时也能正常渲染', () => {
      const wrapper = mount(TyWaterMark, {
        props: { markInfo: ['水印'] }
      })
      expect(wrapper.find('.ty-waterMark').exists()).toBe(true)
      expect(wrapper.find('.ty-waterMark__mark').exists()).toBe(true)
      wrapper.unmount()
    })

    it('多个 WaterMark 独立渲染', () => {
      const wrapper = mount({
        components: { TyWaterMark },
        template: `
          <div>
            <TyWaterMark data-test="a" :mark-info="['A']" />
            <TyWaterMark data-test="b" :mark-info="['B1','B2']" />
          </div>
        `
      })
      const a = wrapper.find('.ty-waterMark[data-test="a"]')
      const b = wrapper.find('.ty-waterMark[data-test="b"]')
      expect(a.exists()).toBe(true)
      expect(b.exists()).toBe(true)
      expect(a.find('.ty-waterMark__mark').exists()).toBe(true)
      expect(b.find('.ty-waterMark__mark').exists()).toBe(true)
      wrapper.unmount()
    })
  })
})
