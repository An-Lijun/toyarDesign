import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import TyCol from '../index.ts'
import { rowContent } from '../../../hooks/symbolNm'

/**
 * TyCol 组件单元测试
 * 栅格列组件，依赖 inject rowContent（来自 TyRow）
 * bem(blockSuffix) 生成 ty-col-{suffix}（块后缀，非修饰符）
 */

describe('TyCol 组件', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-col', () => {
      const wrapper = mount(TyCol)
      expect(wrapper.find('.ty-col').exists()).toBe(true)
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TyCol)
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('应渲染默认插槽内容', () => {
      const wrapper = mount(TyCol, {
        slots: { default: '列内容' }
      })
      expect(wrapper.text()).toContain('列内容')
      wrapper.unmount()
    })

    it('默认 span=24，应有 ty-col-24 类', () => {
      const wrapper = mount(TyCol)
      expect(wrapper.find('.ty-col').classes()).toContain('ty-col-24')
      wrapper.unmount()
    })
  })

  // ===== Props - span =====
  describe('Props - span', () => {
    it('span=12 应有 ty-col-12 类', () => {
      const wrapper = mount(TyCol, {
        props: { span: 12 }
      })
      expect(wrapper.find('.ty-col').classes()).toContain('ty-col-12')
      wrapper.unmount()
    })

    it('span=6 应有 ty-col-6 类', () => {
      const wrapper = mount(TyCol, {
        props: { span: 6 }
      })
      expect(wrapper.find('.ty-col').classes()).toContain('ty-col-6')
      wrapper.unmount()
    })

    it('span=0 应有 ty-col-0 类', () => {
      const wrapper = mount(TyCol, {
        props: { span: 0 }
      })
      expect(wrapper.find('.ty-col').classes()).toContain('ty-col-0')
      wrapper.unmount()
    })

    it('span 为字符串 "8" 应有 ty-col-8 类', () => {
      const wrapper = mount(TyCol, {
        props: { span: '8' }
      })
      expect(wrapper.find('.ty-col').classes()).toContain('ty-col-8')
      wrapper.unmount()
    })

    it('span 为对象（响应式）应生成多个类', () => {
      const wrapper = mount(TyCol, {
        props: {
          span: { md: 12, xs: 24 }
        }
      })
      const classes = wrapper.find('.ty-col').classes()
      expect(classes).toContain('ty-col-md-12')
      expect(classes).toContain('ty-col-xs-24')
      wrapper.unmount()
    })

    it('span 为对象（3个断点）应生成3个类', () => {
      const wrapper = mount(TyCol, {
        props: {
          span: { lg: 8, md: 12, xs: 24 }
        }
      })
      const classes = wrapper.find('.ty-col').classes()
      expect(classes).toContain('ty-col-lg-8')
      expect(classes).toContain('ty-col-md-12')
      expect(classes).toContain('ty-col-xs-24')
      wrapper.unmount()
    })

    it('span 变化时应更新类名', async () => {
      const wrapper = mount(TyCol, {
        props: { span: 12 }
      })
      expect(wrapper.find('.ty-col').classes()).toContain('ty-col-12')

      await wrapper.setProps({ span: 6 })
      expect(wrapper.find('.ty-col').classes()).toContain('ty-col-6')
      expect(wrapper.find('.ty-col').classes()).not.toContain('ty-col-12')
      wrapper.unmount()
    })

    it('从数字 span 切换到对象 span', async () => {
      const wrapper = mount(TyCol, {
        props: { span: 12 }
      })
      expect(wrapper.find('.ty-col').classes()).toContain('ty-col-12')

      await wrapper.setProps({ span: { md: 8, xs: 24 } })
      const classes = wrapper.find('.ty-col').classes()
      expect(classes).not.toContain('ty-col-12')
      expect(classes).toContain('ty-col-md-8')
      expect(classes).toContain('ty-col-xs-24')
      wrapper.unmount()
    })
  })

  // ===== Props - offset =====
  describe('Props - offset', () => {
    it('默认 offset=0，marginLeft 为 0%', () => {
      const wrapper = mount(TyCol)
      const style = wrapper.attributes('style')
      expect(style).toContain('margin-left: 0%')
      wrapper.unmount()
    })

    it('offset=6 → marginLeft = (100/24)*6 = 25%', () => {
      const wrapper = mount(TyCol, {
        props: { offset: 6 }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('margin-left: 25%')
      wrapper.unmount()
    })

    it('offset=12 → marginLeft = 50%', () => {
      const wrapper = mount(TyCol, {
        props: { offset: 12 }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('margin-left: 50%')
      wrapper.unmount()
    })

    it('offset=24 → marginLeft = 100%', () => {
      const wrapper = mount(TyCol, {
        props: { offset: 24 }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('margin-left: 100%')
      wrapper.unmount()
    })

    it('offset 变化时更新 marginLeft', async () => {
      const wrapper = mount(TyCol, {
        props: { offset: 6 }
      })
      expect(wrapper.attributes('style')).toContain('margin-left: 25%')

      await wrapper.setProps({ offset: 12 })
      expect(wrapper.attributes('style')).toContain('margin-left: 50%')
      wrapper.unmount()
    })
  })

  // ===== 注入 - gutter (来自 Row) =====
  describe('注入 - gutter (来自 Row)', () => {
    it('未注入 gutter 时 padding 不渲染（gutter 为 ref(0)，模板自动解包后 .value 为 undefined）', () => {
      const wrapper = mount(TyCol)
      const style = wrapper.attributes('style')
      // gutter=ref(0) → 模板中 gutter 自动解包为 0 → gutter?.value = undefined
      // padding 表达式产生 NaN/undefined，Vue 不渲染无效 CSS
      expect(style).toContain('margin-left: 0%')
      expect(style).not.toContain('padding:')
      wrapper.unmount()
    })

    it('注入 gutter={value:20} → padding: 0 10px 20px', () => {
      const wrapper = mount(TyCol, {
        global: {
          provide: {
            [rowContent]: { value: 20 }
          }
        }
      })
      const style = wrapper.attributes('style')
      // gutter={value:20}（普通对象，非 ref）→ gutter?.value = 20
      // Vue 样式标准化：0 → 0px
      expect(style).toContain('padding: 0px 10px 20px')
      wrapper.unmount()
    })

    it('注入 gutter={value:16} → padding: 0 8px 16px', () => {
      const wrapper = mount(TyCol, {
        global: {
          provide: {
            [rowContent]: { value: 16 }
          }
        }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('padding: 0px 8px 16px')
      wrapper.unmount()
    })

    it('注入 gutter={value:0} → padding: 0 0px 0px', () => {
      const wrapper = mount(TyCol, {
        global: {
          provide: {
            [rowContent]: { value: 0 }
          }
        }
      })
      const style = wrapper.attributes('style')
      expect(style).toContain('padding: 0px 0px 0px')
      wrapper.unmount()
    })
  })

  // ===== useCol Hook 逻辑 =====
  describe('useCol Hook 逻辑', () => {
    it('数字 span 生成 ty-col-{span} 类', () => {
      const wrapper = mount(TyCol, {
        props: { span: 8 }
      })
      // bem('8') = ty-col-8
      expect(wrapper.find('.ty-col').classes()).toContain('ty-col-8')
      wrapper.unmount()
    })

    it('字符串 span 生成 ty-col-{span} 类', () => {
      const wrapper = mount(TyCol, {
        props: { span: '16' }
      })
      expect(wrapper.find('.ty-col').classes()).toContain('ty-col-16')
      wrapper.unmount()
    })

    it('对象 span 生成 ty-col-{key}-{value} 类', () => {
      const wrapper = mount(TyCol, {
        props: {
          span: { sm: 12, lg: 8 }
        }
      })
      const classes = wrapper.find('.ty-col').classes()
      // bem('sm-12') = ty-col-sm-12
      expect(classes).toContain('ty-col-sm-12')
      expect(classes).toContain('ty-col-lg-8')
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('同时设置 span 和 offset', () => {
      const wrapper = mount(TyCol, {
        props: { span: 8, offset: 4 }
      })
      const classes = wrapper.find('.ty-col').classes()
      expect(classes).toContain('ty-col-8')
      expect(wrapper.attributes('style')).toMatch(/margin-left: 16\.666/)
      wrapper.unmount()
    })

    it('对象 span + offset', () => {
      const wrapper = mount(TyCol, {
        props: {
          span: { md: 12, xs: 24 },
          offset: 6
        }
      })
      const classes = wrapper.find('.ty-col').classes()
      expect(classes).toContain('ty-col-md-12')
      expect(classes).toContain('ty-col-xs-24')
      expect(wrapper.attributes('style')).toContain('margin-left: 25%')
      wrapper.unmount()
    })

    it('对象 span + offset + gutter 注入', () => {
      const wrapper = mount(TyCol, {
        props: {
          span: { md: 8 },
          offset: 4
        },
        global: {
          provide: {
            [rowContent]: { value: 24 }
          }
        }
      })
      const classes = wrapper.find('.ty-col').classes()
      expect(classes).toContain('ty-col-md-8')
      expect(wrapper.attributes('style')).toMatch(/margin-left: 16\.666/)
      // gutter={value:24} → padding: 0px 12px 24px
      expect(wrapper.attributes('style')).toContain('padding: 0px 12px 24px')
      wrapper.unmount()
    })

    it('空插槽时也能正常渲染', () => {
      const wrapper = mount(TyCol)
      expect(wrapper.find('.ty-col').exists()).toBe(true)
      expect(wrapper.text()).toBe('')
      wrapper.unmount()
    })

    it('多个 Col 独立渲染', () => {
      const wrapper = mount({
        components: { TyCol },
        template: `
          <div>
            <TyCol data-test="a" :span="8">A</TyCol>
            <TyCol data-test="b" :span="16" :offset="8">B</TyCol>
          </div>
        `
      })
      const a = wrapper.find('.ty-col[data-test="a"]')
      const b = wrapper.find('.ty-col[data-test="b"]')

      expect(a.classes()).toContain('ty-col-8')
      expect(b.classes()).toContain('ty-col-16')

      const aStyle = a.attributes('style')
      const bStyle = b.attributes('style')
      expect(aStyle).toContain('margin-left: 0%')
      expect(bStyle).toMatch(/margin-left: 33\.333/)
      wrapper.unmount()
    })
  })
})
