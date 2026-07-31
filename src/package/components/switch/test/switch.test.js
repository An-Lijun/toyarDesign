import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick, ref, provide } from 'vue'
import {
  formContent,
  formItemContent
} from '@/package/hooks/symbolNm'

/**
 * TySwitch 组件单元测试
 * 开关组件，defineModel + useSwitch Hook
 * Props: size(mini/small/medium/large), uncheckedText, checkedText,
 *        openValue(true), closeValue(false), disabled, type(round/tube/inline)
 * Emits: update:modelValue, change
 * Inject: formContent(disabled), formItemContent(disabled)
 */

const TySwitch = (await import('../index.ts')).default

/** 公共挂载配置 helper */
function mountSwitch(props = {}, options = {}) {
  return mount(
    {
      components: { TySwitch },
      template: `<TySwitch v-model="val" v-bind="props" />`,
      data() {
        return { val: props.modelValue ?? false, props }
      },
      ...options
    },
    options.mountOptions || {}
  )
}

describe('TySwitch 组件', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-switch', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-switch').exists()).toBe(true)
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('应渲染 ty-switch__boll 小球', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-switch__boll').exists()).toBe(true)
      wrapper.unmount()
    })

    it('boll 应为 div 元素', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-switch__boll').element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })
  })

  // ===== v-model & 点击切换 =====
  describe('v-model & 点击切换', () => {
    it('modelValue=false 时无 is-open 类', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-switch').classes()).not.toContain('is-open')
      wrapper.unmount()
    })

    it('modelValue=true 时有 is-open 类', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: true }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('is-open')
      wrapper.unmount()
    })

    it('点击从 false 切换为 true，应触发 update:modelValue 与 change', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      await wrapper.find('.ty-switch').trigger('click')
      const updateEvents = wrapper.emitted('update:modelValue')
      const changeEvents = wrapper.emitted('change')
      expect(updateEvents).toBeTruthy()
      expect(updateEvents[0][0]).toBe(true)
      expect(changeEvents).toBeTruthy()
      expect(changeEvents[0][0]).toBe(true)
      wrapper.unmount()
    })

    it('点击从 true 切换为 false', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: true }
      })
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      expect(wrapper.emitted('change')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('自定义 openValue/closeValue（string）切换', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: 'closed', openValue: 'opened', closeValue: 'closed' }
      })
      // 初始值 'closed' 不等于 openValue 'opened' → 未开启
      expect(wrapper.find('.ty-switch').classes()).not.toContain('is-open')
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe('opened')
      expect(wrapper.emitted('change')[0][0]).toBe('opened')
      wrapper.unmount()
    })

    it('openValue=string, 初始值匹配 → isOpen=true', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: 'YES', openValue: 'YES', closeValue: 'NO' }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('is-open')
      wrapper.unmount()
    })
  })

  // ===== Props - disabled =====
  describe('Props - disabled', () => {
    it('disabled=true 时有 is-disabled 类', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, disabled: true }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('disabled=false 时无 is-disabled 类', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, disabled: false }
      })
      expect(wrapper.find('.ty-switch').classes()).not.toContain('is-disabled')
      wrapper.unmount()
    })

    it('disabled=true 点击不触发切换', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, disabled: true }
      })
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      expect(wrapper.emitted('change')).toBeFalsy()
      wrapper.unmount()
    })

    it('disabled=true 从 true 点击也不变', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: true, disabled: true }
      })
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })
  })

  // ===== Inject - form / formItem disabled =====
  describe('Inject 注入禁用（form / formItem）', () => {
    it('formContent.disabled=true 时禁用', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false },
        global: {
          provide: {
            [formContent]: { disabled: true }
          }
        }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('formItemContent.disabled=true 时禁用', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false },
        global: {
          provide: {
            [formItemContent]: { disabled: true }
          }
        }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('is-disabled')
      wrapper.unmount()
    })

    it('formItem disabled 样式禁用（仍可点击切换，因为 click 只判断 props.disabled）', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false },
        global: {
          provide: {
            [formItemContent]: { disabled: true }
          }
        }
      })
      // 类名显示禁用
      expect(wrapper.find('.ty-switch').classes()).toContain('is-disabled')
      // 但是 use-switch click 只判断 props.disabled，不判断 computed disabled
      // 所以点击依然会触发事件（这是组件当前实现）
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      wrapper.unmount()
    })

    it('form / formItem 均不提供时可正常点击', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      wrapper.unmount()
    })
  })

  // ===== Props - size =====
  describe('Props - size', () => {
    it('默认 size=small → ty-switch--small', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('ty-switch--small')
      wrapper.unmount()
    })

    it('size=mini → ty-switch--mini', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, size: 'mini' }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('ty-switch--mini')
      wrapper.unmount()
    })

    it('size=medium → ty-switch--medium', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, size: 'medium' }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('ty-switch--medium')
      wrapper.unmount()
    })

    it('size=large → ty-switch--large', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, size: 'large' }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('ty-switch--large')
      wrapper.unmount()
    })
  })

  // ===== Props - type =====
  describe('Props - type', () => {
    it('默认 type=round → ty-switch--round', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('ty-switch--round')
      wrapper.unmount()
    })

    it('type=tube → ty-switch--tube', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, type: 'tube' }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('ty-switch--tube')
      wrapper.unmount()
    })

    it('type=inline → ty-switch--inline', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, type: 'inline' }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('ty-switch--inline')
      wrapper.unmount()
    })
  })

  // ===== Props - checkedText / uncheckedText =====
  describe('Props - checkedText / uncheckedText', () => {
    it('未选中+有uncheckedText → 显示 uncheckedText，不显示 checkedText', () => {
      const wrapper = mount(TySwitch, {
        props: {
          modelValue: false,
          uncheckedText: 'OFF',
          checkedText: 'ON'
        }
      })
      expect(wrapper.find('.uncheckedText').exists()).toBe(true)
      expect(wrapper.find('.uncheckedText').text()).toBe('OFF')
      expect(wrapper.find('.checkedText').exists()).toBe(false)
      wrapper.unmount()
    })

    it('已选中+有checkedText → 显示 checkedText，不显示 uncheckedText', () => {
      const wrapper = mount(TySwitch, {
        props: {
          modelValue: true,
          uncheckedText: 'OFF',
          checkedText: 'ON'
        }
      })
      expect(wrapper.find('.checkedText').exists()).toBe(true)
      expect(wrapper.find('.checkedText').text()).toBe('ON')
      expect(wrapper.find('.uncheckedText').exists()).toBe(false)
      wrapper.unmount()
    })

    it('uncheckedText 为空不渲染 span.uncheckedText', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, uncheckedText: '', checkedText: '' }
      })
      expect(wrapper.find('.uncheckedText').exists()).toBe(false)
      expect(wrapper.find('.checkedText').exists()).toBe(false)
      wrapper.unmount()
    })

    it('checkedText 为空即使选中也不渲染', () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: true, checkedText: '' }
      })
      expect(wrapper.find('.checkedText').exists()).toBe(false)
      wrapper.unmount()
    })

    it('中文文字也能正常显示', () => {
      const wrapper = mount(TySwitch, {
        props: {
          modelValue: false,
          uncheckedText: '关',
          checkedText: '开'
        }
      })
      expect(wrapper.find('.uncheckedText').text()).toBe('关')
      wrapper.unmount()
    })
  })

  // ===== useSwitch Hook =====
  describe('useSwitch Hook & useTySwitch 导出', () => {
    it('useTySwitch 暴露 useProps / nm / useEmits / useSwitch / staticProps', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTySwitch.useProps).toBeTruthy()
      expect(mod.useTySwitch.nm).toBeTruthy()
      expect(mod.useTySwitch.useEmits).toBeTruthy()
      expect(mod.useTySwitch.useSwitch).toBeTypeOf('function')
      expect(mod.useTySwitch.staticProps).toBeTruthy()
    })

    it('useSwitch 返回 isOpen / disabled / click', async () => {
      const mod = await import('../index.ts')
      const props = { openValue: true, closeValue: false, disabled: false }
      const emit = vi.fn()
      const model = { value: false }
      const result = mod.useTySwitch.useSwitch(props, emit, model)
      expect(result.isOpen.value).toBe(false)
      expect(result.disabled.value).toBe(false)
      expect(result.click).toBeTypeOf('function')
    })

    it('useSwitch click 切换 model 并 emit change', async () => {
      const mod = await import('../index.ts')
      const props = { openValue: true, closeValue: false, disabled: false }
      const emit = vi.fn()
      const model = { value: false }
      const result = mod.useTySwitch.useSwitch(props, emit, model)
      result.click()
      expect(model.value).toBe(true)
      expect(emit).toHaveBeenCalledWith('change', true)
    })

    it('useSwitch disabled 时 click 不切换', async () => {
      const mod = await import('../index.ts')
      const props = { openValue: true, closeValue: false, disabled: true }
      const emit = vi.fn()
      const model = { value: false }
      const result = mod.useTySwitch.useSwitch(props, emit, model)
      expect(result.disabled.value).toBe(true)
      result.click()
      expect(model.value).toBe(false)
      expect(emit).not.toHaveBeenCalled()
    })

    it('useSwitch isOpen 支持自定义 openValue', async () => {
      const mod = await import('../index.ts')
      const emit = vi.fn()
      // model=ON === openValue → isOpen=true
      const result1 = mod.useTySwitch.useSwitch(
        { openValue: 'ON', closeValue: 'OFF', disabled: false },
        emit,
        { value: 'ON' }
      )
      expect(result1.isOpen.value).toBe(true)
      // model=OFF !== openValue → isOpen=false
      const result2 = mod.useTySwitch.useSwitch(
        { openValue: 'ON', closeValue: 'OFF', disabled: false },
        emit,
        { value: 'OFF' }
      )
      expect(result2.isOpen.value).toBe(false)
      // model 为 boolean true → isOpen=true
      const result3 = mod.useTySwitch.useSwitch(
        { openValue: true, closeValue: false, disabled: false },
        emit,
        { value: true }
      )
      expect(result3.isOpen.value).toBe(true)
      // model 为 boolean false → isOpen=false
      const result4 = mod.useTySwitch.useSwitch(
        { openValue: true, closeValue: false, disabled: false },
        emit,
        { value: false }
      )
      expect(result4.isOpen.value).toBe(false)
    })
  })

  // ===== staticProps 验证 =====
  describe('staticProps 配置', () => {
    it('size 默认 small, values 为 TY_SIZE(4项)', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTySwitch.staticProps.size.default).toBe('small')
      expect(mod.useTySwitch.staticProps.size.values).toEqual(
        ['mini', 'small', 'medium', 'large']
      )
    })

    it('uncheckedText / checkedText 默认空字符串', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTySwitch.staticProps.uncheckedText.default).toBe('')
      expect(mod.useTySwitch.staticProps.checkedText.default).toBe('')
    })

    it('openValue 默认 true, closeValue 默认 false', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTySwitch.staticProps.openValue.default).toBe(true)
      expect(mod.useTySwitch.staticProps.closeValue.default).toBe(false)
    })

    it('disabled 默认 false', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTySwitch.staticProps.disabled.default).toBe(false)
    })

    it('type 默认 round, values 为 round/tube/inline', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTySwitch.staticProps.type.default).toBe('round')
      expect(mod.useTySwitch.staticProps.type.values).toEqual(['round', 'tube', 'inline'])
    })
  })

  // ===== 响应式更新 =====
  describe('响应式更新', () => {
    it('外部更新 modelValue → isOpen 类变化', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      expect(wrapper.find('.ty-switch').classes()).not.toContain('is-open')
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.find('.ty-switch').classes()).toContain('is-open')
      wrapper.unmount()
    })

    it('disabled 动态更新 → 类名变化 + 点击行为变化', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, disabled: false }
      })
      expect(wrapper.find('.ty-switch').classes()).not.toContain('is-disabled')
      await wrapper.setProps({ disabled: true })
      expect(wrapper.find('.ty-switch').classes()).toContain('is-disabled')
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })

    it('size 动态更新', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false, size: 'mini' }
      })
      expect(wrapper.find('.ty-switch').classes()).toContain('ty-switch--mini')
      await wrapper.setProps({ size: 'large' })
      expect(wrapper.find('.ty-switch').classes()).toContain('ty-switch--large')
      expect(wrapper.find('.ty-switch').classes()).not.toContain('ty-switch--mini')
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('组合 Props（size/type/disabled/text 全部自定义）', () => {
      const wrapper = mount(TySwitch, {
        props: {
          modelValue: true,
          size: 'medium',
          type: 'tube',
          disabled: false,
          checkedText: '已启用',
          uncheckedText: '已停用',
          openValue: true,
          closeValue: false
        }
      })
      const cls = wrapper.find('.ty-switch').classes()
      expect(cls).toContain('ty-switch--medium')
      expect(cls).toContain('ty-switch--tube')
      expect(cls).toContain('is-open')
      expect(cls).not.toContain('is-disabled')
      expect(wrapper.find('.checkedText').text()).toBe('已启用')
      wrapper.unmount()
    })

    it('多个 Switch 独立状态', async () => {
      const wrapper = mount({
        components: { TySwitch },
        template: `
          <div>
            <TySwitch data-test="a" v-model="a" checked-text="开A" unchecked-text="关A" />
            <TySwitch data-test="b" v-model="b" open-value="ON" close-value="OFF" />
          </div>
        `,
        data() {
          return { a: false, b: 'OFF' }
        }
      })
      const a = wrapper.find('[data-test="a"]')
      const b = wrapper.find('[data-test="b"]')
      expect(a.classes()).not.toContain('is-open')
      expect(b.classes()).not.toContain('is-open')
      await a.trigger('click')
      expect(a.classes()).toContain('is-open')
      expect(b.classes()).not.toContain('is-open')
      await b.trigger('click')
      expect(b.classes()).toContain('is-open')
      wrapper.unmount()
    })

    it('连续点击正确切换（false→true→false）', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: false }
      })
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true)
      await wrapper.setProps({ modelValue: true })
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')[1][0]).toBe(false)
      wrapper.unmount()
    })

    it('自定义 openValue/closeValue 连续切换', async () => {
      const wrapper = mount(TySwitch, {
        props: { modelValue: 'A', openValue: 'B', closeValue: 'A' }
      })
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe('B')
      expect(wrapper.emitted('change')[0][0]).toBe('B')
      await wrapper.setProps({ modelValue: 'B' })
      await wrapper.find('.ty-switch').trigger('click')
      expect(wrapper.emitted('update:modelValue')[1][0]).toBe('A')
      wrapper.unmount()
    })
  })
})
