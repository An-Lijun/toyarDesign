import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { TyCheckBox, TyCheckBoxGroup } from '../index.ts'
import { formContent, formItemContent, checkBoxGroup } from '../../../hooks/symbolNm'

/**
 * TyCheckBox / TyCheckBoxGroup 组件单元测试
 * 组件使用 defineModel（Vue 3.4+），依赖 toyaricon 图标
 * 支持 inject form/formItem/checkBoxGroup
 *
 * 注意事项：
 * 1. v-model 监听 change 事件，jsdom 的 trigger('click') 不自动触发 change
 *    → 需手动 set checked + trigger('change')
 * 2. nm.m(size) 生成 ty-check-box--small（块修饰符），非 ty-check-box__out--small
 * 3. Group 内的 CheckBox 若无自身 v-model，modelValue 为 undefined
 *    → checked 状态不同步，但点击会调用 group.emitChange
 */

// Mock toyaricon 图标组件
vi.mock('toyaricon', () => ({
  TyiCheckLine: { name: 'TyiCheckLine', render: () => null },
  TyiSubtractLine: { name: 'TyiSubtractLine', render: () => null }
}))

describe('TyCheckBox 组件', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-check-box', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-check-box').exists()).toBe(true)
      wrapper.unmount()
    })

    it('根元素应为 label', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('label')
      wrapper.unmount()
    })

    it('应渲染隐藏的 checkbox input', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.exists()).toBe(true)
      expect(input.attributes('hidden')).toBeDefined()
      wrapper.unmount()
    })

    it('应渲染 ty-check-box__out', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-check-box__out').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染 ty-check-box__input', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-check-box__input').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染 ty-check-box__container 并包含默认插槽', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false },
        slots: { default: '选项文字' }
      })
      const container = wrapper.find('.ty-check-box__container')
      expect(container.exists()).toBe(true)
      expect(container.text()).toContain('选项文字')
      wrapper.unmount()
    })

    it('默认渲染 TyiCheckLine 图标', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      expect(wrapper.findComponent({ name: 'TyiCheckLine' }).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== Props - disabled =====
  describe('Props - disabled', () => {
    it('默认 disabled 为 false，无 is-disabled 类', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-check-box').classes()).not.toContain('is-disabled')
      wrapper.unmount()
    })

    it('disabled=true 应添加 is-disabled 类', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false, disabled: true }
      })
      expect(wrapper.find('.ty-check-box').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('disabled=true 时 input 应有 disabled 属性', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false, disabled: true }
      })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
      wrapper.unmount()
    })
  })

  // ===== Props - canHarf =====
  describe('Props - canHarf', () => {
    it('默认 canHarf 为 false，无 is-harf 类', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-check-box').classes()).not.toContain('is-harf')
      wrapper.unmount()
    })

    it('canHarf=true 应添加 is-harf 类', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false, canHarf: true }
      })
      expect(wrapper.find('.ty-check-box').classes()).toContain('is-harf')
      wrapper.unmount()
    })

    it('canHarf=true 时渲染 TyiSubtractLine 图标', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false, canHarf: true }
      })
      expect(wrapper.findComponent({ name: 'TyiSubtractLine' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'TyiCheckLine' }).exists()).toBe(false)
      wrapper.unmount()
    })

    it('canHarf=false 时渲染 TyiCheckLine 图标', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false, canHarf: false }
      })
      expect(wrapper.findComponent({ name: 'TyiCheckLine' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'TyiSubtractLine' }).exists()).toBe(false)
      wrapper.unmount()
    })
  })

  // ===== Props - size =====
  describe('Props - size', () => {
    it('默认 size 为 small，__out 上有 ty-check-box--small', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      // nm.m(size) = ty-check-box--small（块修饰符，应用在 __out div 上）
      expect(wrapper.find('.ty-check-box__out').classes()).toContain('ty-check-box--small')
      wrapper.unmount()
    })

    it('size=mini', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false, size: 'mini' }
      })
      expect(wrapper.find('.ty-check-box__out').classes()).toContain('ty-check-box--mini')
      wrapper.unmount()
    })

    it('size=medium', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false, size: 'medium' }
      })
      expect(wrapper.find('.ty-check-box__out').classes()).toContain('ty-check-box--medium')
      wrapper.unmount()
    })

    it('size=large', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false, size: 'large' }
      })
      expect(wrapper.find('.ty-check-box__out').classes()).toContain('ty-check-box--large')
      wrapper.unmount()
    })
  })

  // ===== v-model (Boolean) =====
  describe('v-model (Boolean)', () => {
    it('modelValue=false 时 input 未选中', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      expect(wrapper.find('input').element.checked).toBe(false)
      wrapper.unmount()
    })

    it('modelValue=true 时 input 选中', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: true }
      })
      expect(wrapper.find('input').element.checked).toBe(true)
      wrapper.unmount()
    })

    it('点击应触发 update:modelValue', async () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      // v-model 监听 change 事件，需手动设 checked + trigger change
      const input = wrapper.find('input')
      input.element.checked = true
      await input.trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      wrapper.unmount()
    })

    it('点击 false→true 应发出 update:modelValue 事件携带 true', async () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      const input = wrapper.find('input')
      input.element.checked = true
      await input.trigger('change')
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true)
      wrapper.unmount()
    })

    it('点击 true→false 应发出 update:modelValue 事件携带 false', async () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: true }
      })
      const input = wrapper.find('input')
      input.element.checked = false
      await input.trigger('change')
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('点击应触发 change 事件（setTimeout 异步）', async () => {
      vi.useFakeTimers()
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false }
      })
      await wrapper.find('input').trigger('click')
      vi.runAllTimers()
      expect(wrapper.emitted('change')).toBeTruthy()
      wrapper.unmount()
      vi.useRealTimers()
    })
  })

  // ===== v-model (Array) =====
  describe('v-model (Array)', () => {
    it('value 在数组中时 input 选中', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: ['apple', 'banana'], value: 'apple' }
      })
      expect(wrapper.find('input').element.checked).toBe(true)
      wrapper.unmount()
    })

    it('value 不在数组中时 input 未选中', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: ['apple', 'banana'], value: 'cherry' }
      })
      expect(wrapper.find('input').element.checked).toBe(false)
      wrapper.unmount()
    })

    it('点击未选中项应将其添加到数组', async () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: ['apple'], value: 'banana' }
      })
      const input = wrapper.find('input')
      input.element.checked = true
      await input.trigger('change')
      const emitted = wrapper.emitted('update:modelValue')[0][0]
      expect(emitted).toContain('apple')
      expect(emitted).toContain('banana')
      wrapper.unmount()
    })

    it('点击已选中项应将其从数组移除', async () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: ['apple', 'banana'], value: 'apple' }
      })
      const input = wrapper.find('input')
      input.element.checked = false
      await input.trigger('change')
      const emitted = wrapper.emitted('update:modelValue')[0][0]
      expect(emitted).not.toContain('apple')
      expect(emitted).toContain('banana')
      wrapper.unmount()
    })
  })

  // ===== 注入 - Form disabled =====
  describe('注入 - Form disabled', () => {
    it('注入 form disabled=true 时应禁用', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false },
        global: {
          provide: {
            [formContent]: { disabled: true, size: 'small' }
          }
        }
      })
      expect(wrapper.find('.ty-check-box').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('注入 formItem disabled=true 时应禁用', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false },
        global: {
          provide: {
            [formItemContent]: { disabled: true, size: 'small' }
          }
        }
      })
      expect(wrapper.find('.ty-check-box').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('注入 form size 应覆盖默认 size', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false },
        global: {
          provide: {
            [formContent]: { disabled: false, size: 'large' }
          }
        }
      })
      expect(wrapper.find('.ty-check-box__out').classes()).toContain('ty-check-box--large')
      wrapper.unmount()
    })

    it('props size 优先级高于注入的 form size', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false, size: 'mini' },
        global: {
          provide: {
            [formContent]: { disabled: false, size: 'large' }
          }
        }
      })
      expect(wrapper.find('.ty-check-box__out').classes()).toContain('ty-check-box--mini')
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('同时设置 disabled、canHarf、size', () => {
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: false, disabled: true, canHarf: true, size: 'large' },
        slots: { default: '半选禁用' }
      })
      const cb = wrapper.find('.ty-check-box')
      expect(cb.classes()).toContain('is-disabled')
      expect(cb.classes()).toContain('is-harf')
      expect(wrapper.find('.ty-check-box__out').classes()).toContain('ty-check-box--large')
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
      wrapper.unmount()
    })

    it('多个 CheckBox 独立渲染', () => {
      const wrapper = mount({
        components: { TyCheckBox },
        template: `
          <div>
            <TyCheckBox data-test="a" :model-value="true">A</TyCheckBox>
            <TyCheckBox data-test="b" :model-value="false" disabled>B</TyCheckBox>
          </div>
        `
      })
      const a = wrapper.find('.ty-check-box[data-test="a"]')
      const b = wrapper.find('.ty-check-box[data-test="b"]')
      expect(a.classes()).not.toContain('is-disabled')
      expect(b.classes()).toContain('is-disabled')
      wrapper.unmount()
    })
  })
})

// ===== TyCheckBoxGroup 组件测试 =====
describe('TyCheckBoxGroup 组件', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-check-box-group', () => {
      const wrapper = mount(TyCheckBoxGroup, {
        props: { modelValue: [] }
      })
      expect(wrapper.find('.ty-check-box-group').exists()).toBe(true)
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TyCheckBoxGroup, {
        props: { modelValue: [] }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('应渲染默认插槽内容', () => {
      const wrapper = mount(TyCheckBoxGroup, {
        props: { modelValue: [] },
        slots: { default: '<div class="child">内容</div>' }
      })
      expect(wrapper.find('.child').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== 与 TyCheckBox 集成 =====
  describe('与 TyCheckBox 集成', () => {
    it('点击子 CheckBox 应更新 Group 的 modelValue', async () => {
      vi.useFakeTimers()
      const wrapper = mount({
        components: { TyCheckBoxGroup, TyCheckBox },
        data() {
          return { value: ['apple'] }
        },
        template: `
          <TyCheckBoxGroup v-model="value">
            <TyCheckBox value="apple">苹果</TyCheckBox>
            <TyCheckBox value="banana">香蕉</TyCheckBox>
          </TyCheckBoxGroup>
        `
      })
      // 点击未选中的 banana → handleChange → group.emitChange('banana')
      const bananaInput = wrapper.findAll('input[type="checkbox"]')[1]
      await bananaInput.trigger('click')
      vi.runAllTimers()
      await nextTick()

      // emitChange 将 'banana' 添加到数组
      expect(wrapper.vm.value).toContain('banana')
      expect(wrapper.vm.value).toContain('apple')
      wrapper.unmount()
      vi.useRealTimers()
    })

    it('点击已选中项应从 modelValue 移除', async () => {
      vi.useFakeTimers()
      const wrapper = mount({
        components: { TyCheckBoxGroup, TyCheckBox },
        data() {
          return { value: ['apple', 'banana'] }
        },
        template: `
          <TyCheckBoxGroup v-model="value">
            <TyCheckBox value="apple">苹果</TyCheckBox>
            <TyCheckBox value="banana">香蕉</TyCheckBox>
          </TyCheckBoxGroup>
        `
      })
      const appleInput = wrapper.findAll('input[type="checkbox"]')[0]
      await appleInput.trigger('click')
      vi.runAllTimers()
      await nextTick()

      expect(wrapper.vm.value).not.toContain('apple')
      expect(wrapper.vm.value).toContain('banana')
      wrapper.unmount()
      vi.useRealTimers()
    })

    it('Group disabled=true 应禁用子 CheckBox', () => {
      const wrapper = mount({
        components: { TyCheckBoxGroup, TyCheckBox },
        data() {
          return { value: [] }
        },
        template: `
          <TyCheckBoxGroup v-model="value" disabled>
            <TyCheckBox value="apple">苹果</TyCheckBox>
          </TyCheckBoxGroup>
        `
      })
      const cb = wrapper.find('.ty-check-box')
      expect(cb.classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('Group size 应传递给子 CheckBox', () => {
      const wrapper = mount({
        components: { TyCheckBoxGroup, TyCheckBox },
        data() {
          return { value: [] }
        },
        template: `
          <TyCheckBoxGroup v-model="value" size="large">
            <TyCheckBox value="apple">苹果</TyCheckBox>
          </TyCheckBoxGroup>
        `
      })
      expect(wrapper.find('.ty-check-box__out').classes()).toContain('ty-check-box--large')
      wrapper.unmount()
    })

    it('子 CheckBox 自身 size 优先于 Group size', () => {
      const wrapper = mount({
        components: { TyCheckBoxGroup, TyCheckBox },
        data() {
          return { value: [] }
        },
        template: `
          <TyCheckBoxGroup v-model="value" size="large">
            <TyCheckBox value="apple" size="mini">苹果</TyCheckBox>
          </TyCheckBoxGroup>
        `
      })
      expect(wrapper.find('.ty-check-box__out').classes()).toContain('ty-check-box--mini')
      wrapper.unmount()
    })
  })

  // ===== Props - max =====
  describe('Props - max', () => {
    it('max 限制达到后未选中项应禁用', () => {
      // 直接 provide checkBoxGroup 上下文，隔离测试 max 逻辑
      // disabled 计算依赖 model.value（props.modelValue）+ tyCheckBoxGroup.max
      const wrapper = mount(TyCheckBox, {
        props: { modelValue: ['a', 'b'], value: 'c' },
        global: {
          provide: {
            [checkBoxGroup]: {
              groupValue: ['a', 'b'],
              size: 'small',
              disabled: false,
              max: 2,
              emitChange: () => {}
            }
          }
        }
      })
      // model.value = ['a','b'], max=2, 2<=2, !['a','b'].includes('c') → disabled
      expect(wrapper.find('.ty-check-box').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('max 未达到时所有项可选', () => {
      const wrapper = mount({
        components: { TyCheckBoxGroup, TyCheckBox },
        data() {
          return { value: ['a'] }
        },
        template: `
          <TyCheckBoxGroup v-model="value" :max="3">
            <TyCheckBox value="a">A</TyCheckBox>
            <TyCheckBox value="b">B</TyCheckBox>
            <TyCheckBox value="c">C</TyCheckBox>
          </TyCheckBoxGroup>
        `
      })
      const checkboxes = wrapper.findAll('.ty-check-box')
      checkboxes.forEach(cb => {
        expect(cb.classes()).not.toContain('is-disabled')
      })
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('空 modelValue 时也能正常渲染', () => {
      const wrapper = mount({
        components: { TyCheckBoxGroup, TyCheckBox },
        data() {
          return { value: [] }
        },
        template: `
          <TyCheckBoxGroup v-model="value">
            <TyCheckBox value="a">A</TyCheckBox>
          </TyCheckBoxGroup>
        `
      })
      expect(wrapper.find('.ty-check-box-group').exists()).toBe(true)
      wrapper.unmount()
    })

    it('多个 Group 独立渲染互不影响', async () => {
      vi.useFakeTimers()
      const wrapper = mount({
        components: { TyCheckBoxGroup, TyCheckBox },
        data() {
          return {
            group1: ['a'],
            group2: ['x', 'y']
          }
        },
        template: `
          <div>
            <TyCheckBoxGroup data-test="g1" v-model="group1">
              <TyCheckBox value="a">A</TyCheckBox>
              <TyCheckBox value="b">B</TyCheckBox>
            </TyCheckBoxGroup>
            <TyCheckBoxGroup data-test="g2" v-model="group2">
              <TyCheckBox value="x">X</TyCheckBox>
              <TyCheckBox value="y">Y</TyCheckBox>
            </TyCheckBoxGroup>
          </div>
        `
      })
      const groups = wrapper.findAll('.ty-check-box-group')
      expect(groups.length).toBe(2)

      // 点击 g1 的 B → group1 添加 'b'
      const g1Inputs = groups[0].findAll('input')
      await g1Inputs[1].trigger('click')
      vi.runAllTimers()
      await nextTick()

      expect(wrapper.vm.group1).toContain('b')
      // g2 不受影响
      expect(wrapper.vm.group2).toEqual(['x', 'y'])
      wrapper.unmount()
      vi.useRealTimers()
    })
  })
})
