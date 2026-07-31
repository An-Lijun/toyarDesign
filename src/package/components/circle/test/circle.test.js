import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import TyCircle from '../index.ts'

/**
 * TyCircle 组件单元测试
 * 纯展示型 SVG 环形进度条组件，无事件
 */

describe('TyCircle 组件', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-circle', () => {
      const wrapper = mount(TyCircle)
      expect(wrapper.find('.ty-circle').exists()).toBe(true)
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TyCircle)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('应渲染 SVG 元素，viewBox 为 0 0 100 100', () => {
      const wrapper = mount(TyCircle)
      const svg = wrapper.find('svg')
      expect(svg.exists()).toBe(true)
      expect(svg.attributes('viewBox')).toBe('0 0 100 100')
      wrapper.unmount()
    })

    it('应渲染两个 path 元素（轨道 + 进度）', () => {
      const wrapper = mount(TyCircle)
      const paths = wrapper.findAll('path')
      expect(paths.length).toBe(2)
      wrapper.unmount()
    })

    it('第一个 path 为轨道（trailColor + trailWidth）', () => {
      const wrapper = mount(TyCircle)
      const paths = wrapper.findAll('path')
      expect(paths[0].attributes('stroke')).toBe('#F7F7F7')
      expect(paths[0].attributes('stroke-width')).toBe('5')
      expect(paths[0].attributes('fill-opacity')).toBe('0')
      wrapper.unmount()
    })

    it('第二个 path 为进度条（strokeColor + strokeWidth）', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 50 }
      })
      const paths = wrapper.findAll('path')
      expect(paths[1].attributes('stroke')).toBe('#298DFF')
      expect(paths[1].attributes('stroke-width')).toBe('6')
      expect(paths[1].attributes('fill-opacity')).toBe('0')
      wrapper.unmount()
    })

    it('应渲染 ty-circle__inner 并包含默认插槽', () => {
      const wrapper = mount(TyCircle, {
        slots: { default: '50%' }
      })
      const inner = wrapper.find('.ty-circle__inner')
      expect(inner.exists()).toBe(true)
      expect(inner.text()).toContain('50%')
      wrapper.unmount()
    })
  })

  // ===== Props - size =====
  describe('Props - size', () => {
    it('默认 size 为 120，设置 width/height', () => {
      const wrapper = mount(TyCircle)
      const style = wrapper.attributes('style')
      expect(style).toContain('width: 120px')
      expect(style).toContain('height: 120px')
      wrapper.unmount()
    })

    it('自定义 size', () => {
      const wrapper = mount(TyCircle, {
        props: { size: 200 }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('width: 200px')
      expect(style).toContain('height: 200px')
      wrapper.unmount()
    })

    it('size 变化时更新样式', async () => {
      const wrapper = mount(TyCircle, {
        props: { size: 100 }
      })
      await wrapper.setProps({ size: 300 })
      const style = wrapper.attributes('style')
      expect(style).toContain('width: 300px')
      expect(style).toContain('height: 300px')
      wrapper.unmount()
    })
  })

  // ===== Props - percent =====
  describe('Props - percent', () => {
    it('默认 percent 为 0，进度条颜色为 trailColor', () => {
      const wrapper = mount(TyCircle)
      const paths = wrapper.findAll('path')
      // percent=0 时 colors = trailColor
      expect(paths[1].attributes('stroke')).toBe('#F7F7F7')
      wrapper.unmount()
    })

    it('percent > 0 时进度条颜色为 strokeColor', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 50 }
      })
      const paths = wrapper.findAll('path')
      expect(paths[1].attributes('stroke')).toBe('#298DFF')
      wrapper.unmount()
    })

    it('percent 变化时颜色更新', async () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 0 }
      })
      expect(wrapper.findAll('path')[1].attributes('stroke')).toBe('#F7F7F7')

      await wrapper.setProps({ percent: 50 })
      expect(wrapper.findAll('path')[1].attributes('stroke')).toBe('#298DFF')

      await wrapper.setProps({ percent: 0 })
      expect(wrapper.findAll('path')[1].attributes('stroke')).toBe('#F7F7F7')
      wrapper.unmount()
    })

    it('percent=100 时进度条颜色为 strokeColor', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 100 }
      })
      expect(wrapper.findAll('path')[1].attributes('stroke')).toBe('#298DFF')
      wrapper.unmount()
    })

    it('percent 影响 strokeDashoffset', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 50, strokeWidth: 6 }
      })
      const progressPath = wrapper.findAll('path')[1]
      const style = progressPath.attributes('style')
      // radius = 50 - 6/2 = 47
      // circumference = 2 * PI * 47
      // offset = ((100 - 50) / 100) * 2 * PI * 47 = 0.5 * 2 * PI * 47
      const expectedOffset = ((100 - 50) / 100) * Math.PI * 2 * 47
      expect(style).toContain(`stroke-dashoffset: ${expectedOffset}px`)
      wrapper.unmount()
    })

    it('percent=100 时 strokeDashoffset 为 0', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 100, strokeWidth: 6 }
      })
      const progressPath = wrapper.findAll('path')[1]
      const style = progressPath.attributes('style')
      const expectedOffset = ((100 - 100) / 100) * Math.PI * 2 * 47
      expect(style).toContain(`stroke-dashoffset: ${expectedOffset}px`)
      wrapper.unmount()
    })

    it('percent=0 时 strokeDashoffset 为完整周长', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 0, strokeWidth: 6 }
      })
      const progressPath = wrapper.findAll('path')[1]
      const style = progressPath.attributes('style')
      const expectedOffset = ((100 - 0) / 100) * Math.PI * 2 * 47
      expect(style).toContain(`stroke-dashoffset: ${expectedOffset}px`)
      wrapper.unmount()
    })
  })

  // ===== Props - strokeWidth =====
  describe('Props - strokeWidth', () => {
    it('默认 strokeWidth 为 6', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 50 }
      })
      const paths = wrapper.findAll('path')
      expect(paths[1].attributes('stroke-width')).toBe('6')
      wrapper.unmount()
    })

    it('自定义 strokeWidth', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 50, strokeWidth: 10 }
      })
      const paths = wrapper.findAll('path')
      expect(paths[1].attributes('stroke-width')).toBe('10')
      wrapper.unmount()
    })

    it('strokeWidth 影响 radius 计算', () => {
      const wrapper = mount(TyCircle, {
        props: { strokeWidth: 10 }
      })
      // radius = 50 - 10/2 = 45
      // pathString 包含 radius
      const path = wrapper.findAll('path')[0]
      expect(path.attributes('d')).toContain('45')
      wrapper.unmount()
    })
  })

  // ===== Props - strokeColor =====
  describe('Props - strokeColor', () => {
    it('默认 strokeColor 为 #298DFF', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 50 }
      })
      expect(wrapper.findAll('path')[1].attributes('stroke')).toBe('#298DFF')
      wrapper.unmount()
    })

    it('自定义 strokeColor', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 50, strokeColor: '#ff0000' }
      })
      expect(wrapper.findAll('path')[1].attributes('stroke')).toBe('#ff0000')
      wrapper.unmount()
    })
  })

  // ===== Props - trailColor =====
  describe('Props - trailColor', () => {
    it('默认 trailColor 为 #F7F7F7', () => {
      const wrapper = mount(TyCircle)
      expect(wrapper.findAll('path')[0].attributes('stroke')).toBe('#F7F7F7')
      wrapper.unmount()
    })

    it('自定义 trailColor', () => {
      const wrapper = mount(TyCircle, {
        props: { trailColor: '#eeeeee' }
      })
      expect(wrapper.findAll('path')[0].attributes('stroke')).toBe('#eeeeee')
      wrapper.unmount()
    })

    it('percent=0 时进度条使用 trailColor', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 0, trailColor: '#ccc', strokeColor: '#fff' }
      })
      expect(wrapper.findAll('path')[1].attributes('stroke')).toBe('#ccc')
      wrapper.unmount()
    })
  })

  // ===== Props - trailWidth =====
  describe('Props - trailWidth', () => {
    it('默认 trailWidth 为 5', () => {
      const wrapper = mount(TyCircle)
      expect(wrapper.findAll('path')[0].attributes('stroke-width')).toBe('5')
      wrapper.unmount()
    })

    it('自定义 trailWidth', () => {
      const wrapper = mount(TyCircle, {
        props: { trailWidth: 8 }
      })
      expect(wrapper.findAll('path')[0].attributes('stroke-width')).toBe('8')
      wrapper.unmount()
    })
  })

  // ===== Props - strokeLinecap =====
  describe('Props - strokeLinecap', () => {
    it('默认 strokeLinecap 为 round', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 50 }
      })
      expect(wrapper.findAll('path')[1].attributes('stroke-linecap')).toBe('round')
      wrapper.unmount()
    })

    it('strokeLinecap=square', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 50, strokeLinecap: 'square' }
      })
      expect(wrapper.findAll('path')[1].attributes('stroke-linecap')).toBe('square')
      wrapper.unmount()
    })
  })

  // ===== useCircle Hook 逻辑 =====
  describe('useCircle Hook 逻辑', () => {
    it('pathString 应为有效的 SVG 圆形路径', () => {
      const wrapper = mount(TyCircle, {
        props: { strokeWidth: 6 }
      })
      // radius = 50 - 6/2 = 47
      const path = wrapper.findAll('path')[0]
      const d = path.attributes('d')
      expect(d).toContain('M 50,50')
      expect(d).toContain('47')
      wrapper.unmount()
    })

    it('strokeDasharray 应为完整周长', () => {
      const wrapper = mount(TyCircle, {
        props: { strokeWidth: 6 }
      })
      const progressPath = wrapper.findAll('path')[1]
      const style = progressPath.attributes('style')
      // circumference = 2 * PI * 47
      const expectedCircumference = Math.PI * 2 * 47
      expect(style).toContain(`stroke-dasharray: ${expectedCircumference}px`)
      wrapper.unmount()
    })

    it('进度条有过渡动画样式', () => {
      const wrapper = mount(TyCircle, {
        props: { percent: 50 }
      })
      const progressPath = wrapper.findAll('path')[1]
      const style = progressPath.attributes('style')
      expect(style).toContain('transition')
      expect(style).toContain('stroke-dashoffset')
      expect(style).toContain('stroke')
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('同时设置所有 props', () => {
      const wrapper = mount(TyCircle, {
        props: {
          percent: 75,
          size: 200,
          strokeWidth: 8,
          strokeColor: '#1890ff',
          strokeLinecap: 'square',
          trailWidth: 6,
          trailColor: '#f0f0f0'
        },
        slots: { default: '75%' }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('width: 200px')
      expect(style).toContain('height: 200px')

      const paths = wrapper.findAll('path')
      expect(paths[0].attributes('stroke')).toBe('#f0f0f0')
      expect(paths[0].attributes('stroke-width')).toBe('6')
      expect(paths[1].attributes('stroke')).toBe('#1890ff')
      expect(paths[1].attributes('stroke-width')).toBe('8')
      expect(paths[1].attributes('stroke-linecap')).toBe('square')

      expect(wrapper.find('.ty-circle__inner').text()).toContain('75%')
      wrapper.unmount()
    })

    it('空插槽时也能正常渲染', () => {
      const wrapper = mount(TyCircle)
      expect(wrapper.find('.ty-circle__inner').exists()).toBe(true)
      expect(wrapper.find('.ty-circle__inner').text()).toBe('')
      wrapper.unmount()
    })

    it('多个 Circle 独立渲染', () => {
      const wrapper = mount({
        components: { TyCircle },
        template: `
          <div>
            <TyCircle data-test="a" :percent="0" />
            <TyCircle data-test="b" :percent="100" stroke-color="#ff0000" />
          </div>
        `
      })
      const a = wrapper.find('.ty-circle[data-test="a"]')
      const b = wrapper.find('.ty-circle[data-test="b"]')

      // a: percent=0 → colors = trailColor (#F7F7F7)
      expect(a.findAll('path')[1].attributes('stroke')).toBe('#F7F7F7')
      // b: percent=100 → colors = strokeColor (#ff0000)
      expect(b.findAll('path')[1].attributes('stroke')).toBe('#ff0000')
      wrapper.unmount()
    })
  })
})
