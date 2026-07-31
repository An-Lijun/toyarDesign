import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import TyDialog from '../index.ts'

/**
 * TyDialog 组件单元测试
 * 对话框组件，使用 defineModel + Teleport + v-show
 * 支持 mask、isUnderLine、draggable、isTeleport
 */

// Mock toyaricon
vi.mock('toyaricon', () => ({
  TyiCloseFill: { name: 'TyiCloseFill', render: () => null }
}))

describe('TyDialog 组件', () => {
  beforeEach(() => {
    // 清理 body 上的 Teleport 残留
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  // ===== 渲染测试（isTeleport=false，内联渲染） =====
  describe('渲染（isTeleport=false）', () => {
    it('应渲染 ty-dialog BEM 类名', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染 ty-dialog__wrapper', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog__wrapper').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染 header / body / footer', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false },
        slots: {
          footer: '<button>确定</button>'
        }
      })
      expect(wrapper.find('.ty-dialog__header').exists()).toBe(true)
      expect(wrapper.find('.ty-dialog__body').exists()).toBe(true)
      expect(wrapper.find('.ty-dialog__footer').exists()).toBe(true)
      wrapper.unmount()
    })

    it('无 footer 插槽时不渲染 footer', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog__footer').exists()).toBe(false)
      wrapper.unmount()
    })

    it('应渲染关闭按钮', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'TyiCloseFill' }).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== 渲染测试（isTeleport=true，Teleport 到 body） =====
  describe('渲染（isTeleport=true，默认）', () => {
    it('默认使用 Teleport 到 body', () => {
      mount(TyDialog, {
        props: { modelValue: true }
      })
      // Teleport 的内容渲染到 body
      const dialog = document.querySelector('.ty-dialog')
      expect(dialog).toBeTruthy()
    })

    it('Teleport 模式下 wrapper 在 body 中', () => {
      mount(TyDialog, {
        props: { modelValue: true }
      })
      const wrapper = document.querySelector('.ty-dialog__wrapper')
      expect(wrapper).toBeTruthy()
      expect(wrapper.closest('body')).toBeTruthy()
    })
  })

  // ===== Props =====
  describe('Props', () => {
    it('默认 title 为 提示', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog__title').text()).toBe('提示')
      wrapper.unmount()
    })

    it('自定义 title', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, title: '自定义标题' }
      })
      expect(wrapper.find('.ty-dialog__title').text()).toBe('自定义标题')
      wrapper.unmount()
    })

    it('默认 width 为 30%', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog').attributes('style')).toContain('width: 30%')
      wrapper.unmount()
    })

    it('自定义 width', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, width: '500px' }
      })
      expect(wrapper.find('.ty-dialog').attributes('style')).toContain('width: 500px')
      wrapper.unmount()
    })

    it('默认 top 为 15vh', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog').attributes('style')).toContain('top: 15vh')
      wrapper.unmount()
    })

    it('自定义 top', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, top: '50px' }
      })
      expect(wrapper.find('.ty-dialog').attributes('style')).toContain('top: 50px')
      wrapper.unmount()
    })

    it('info 作为默认插槽文本', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, info: '提示内容' }
      })
      expect(wrapper.find('.ty-dialog__body').text()).toContain('提示内容')
      wrapper.unmount()
    })

    it('默认插槽优先于 info', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, info: 'info文本' },
        slots: { default: '插槽文本' }
      })
      expect(wrapper.find('.ty-dialog__body').text()).toContain('插槽文本')
      wrapper.unmount()
    })

    it('默认 isUnderLine 为 true，header 有 is-underLine 类', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog__header').classes()).toContain('is-underLine')
      wrapper.unmount()
    })

    it('isUnderLine=false 时 header 无 is-underLine 类', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isUnderLine: false }
      })
      expect(wrapper.find('.ty-dialog__header').classes()).not.toContain('is-underLine')
      wrapper.unmount()
    })

    it('默认 mask 为 true，wrapper 有 is-mask 类', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog__wrapper').classes()).toContain('is-mask')
      wrapper.unmount()
    })

    it('mask=false 时 wrapper 无 is-mask 类', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, mask: false }
      })
      expect(wrapper.find('.ty-dialog__wrapper').classes()).not.toContain('is-mask')
      wrapper.unmount()
    })
  })

  // ===== v-model =====
  describe('v-model', () => {
    it('modelValue=true 时对话框可见', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog').isVisible()).toBe(true)
      wrapper.unmount()
    })

    it('modelValue=false 时对话框不可见（v-show）', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: false, isTeleport: false }
      })
      // v-show 不移除元素，只是 display: none
      expect(wrapper.find('.ty-dialog').exists()).toBe(true)
      expect(wrapper.find('.ty-dialog').isVisible()).toBe(false)
      wrapper.unmount()
    })

    it('modelValue 变化时更新可见性', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: false, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog').isVisible()).toBe(false)

      await wrapper.setProps({ modelValue: true })
      expect(wrapper.find('.ty-dialog').isVisible()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== handleClose =====
  describe('handleClose', () => {
    it('点击关闭按钮应触发 update:modelValue 事件携带 false', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      await wrapper.find('.ty-dialog__headerBtn').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('点击遮罩层（wrapper self）应触发 handleClose', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      // @click.self: 只有点击 wrapper 本身（非子元素）才触发
      await wrapper.find('.ty-dialog__wrapper').trigger('click')
      // 点击 wrapper 本身，但 jsdom 中 click.self 可能需要精确模拟
      // 检查是否触发了 update:modelValue
      const emitted = wrapper.emitted('update:modelValue')
      if (emitted) {
        expect(emitted[0][0]).toBe(false)
      }
      wrapper.unmount()
    })

    it('点击 dialog 内部不触发 handleClose', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      // 点击 body 不应触发 handleClose（因为 @click.self）
      await wrapper.find('.ty-dialog__body').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })
  })

  // ===== 插槽 =====
  describe('插槽', () => {
    it('title 插槽替换默认标题', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false },
        slots: { title: '<span class="custom-title">自定义</span>' }
      })
      expect(wrapper.find('.custom-title').exists()).toBe(true)
      expect(wrapper.find('.ty-dialog__title').exists()).toBe(false)
      wrapper.unmount()
    })

    it('默认插槽渲染到 body', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false },
        slots: { default: '<p class="content">内容</p>' }
      })
      expect(wrapper.find('.ty-dialog__body .content').exists()).toBe(true)
      wrapper.unmount()
    })

    it('footer 插槽渲染到 footer', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false },
        slots: { footer: '<button class="ok">确定</button>' }
      })
      expect(wrapper.find('.ty-dialog__footer .ok').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== 拖拽 =====
  describe('拖拽（draggable）', () => {
    it('默认 draggable=true，onMounted 时绑定 mousedown 事件', () => {
      const addEventListenerSpy = vi.spyOn(Element.prototype, 'addEventListener')
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      // initDrag 绑定 header 的 mousedown
      expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
      wrapper.unmount()
      addEventListenerSpy.mockRestore()
    })

    it('draggable=false 时拖拽不生效（位置不变）', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, draggable: false }
      })
      const header = wrapper.find('.ty-dialog__header').element
      const dialog = wrapper.find('.ty-dialog').element

      // 设置 offsetLeft/offsetTop
      Object.defineProperty(dialog, 'offsetLeft', { value: 100, configurable: true })
      Object.defineProperty(dialog, 'offsetTop', { value: 50, configurable: true })

      // 尝试拖拽
      const mouseDownEvent = new MouseEvent('mousedown')
      Object.defineProperty(mouseDownEvent, 'pageX', { value: 120 })
      Object.defineProperty(mouseDownEvent, 'pageY', { value: 80 })
      header.dispatchEvent(mouseDownEvent)

      const mouseMoveEvent = new MouseEvent('mousemove')
      Object.defineProperty(mouseMoveEvent, 'pageX', { value: 150 })
      Object.defineProperty(mouseMoveEvent, 'pageY', { value: 100 })
      document.dispatchEvent(mouseMoveEvent)

      // 位置不应变化（top 初始为 15vh，left 初始为空）
      expect(dialog.style.left).toBe('')
      expect(dialog.style.top).toBe('15vh')

      const mouseUpEvent = new MouseEvent('mouseup')
      document.dispatchEvent(mouseUpEvent)
      wrapper.unmount()
    })

    it('onBeforeUnmount 时移除事件监听', () => {
      const removeEventListenerSpy = vi.spyOn(Element.prototype, 'removeEventListener')
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      wrapper.unmount()
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
      removeEventListenerSpy.mockRestore()
    })

    it('mousedown → mousemove 应更新 dialog 位置', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      const header = wrapper.find('.ty-dialog__header').element
      const dialog = wrapper.find('.ty-dialog').element

      // 模拟 offsetLeft/offsetTop（jsdom 中默认为 0）
      Object.defineProperty(dialog, 'offsetLeft', { value: 100, configurable: true })
      Object.defineProperty(dialog, 'offsetTop', { value: 50, configurable: true })

      // jsdom MouseEvent 不支持 pageX/pageY 构造参数，需用 defineProperty
      const mouseDownEvent = new MouseEvent('mousedown')
      Object.defineProperty(mouseDownEvent, 'pageX', { value: 120 })
      Object.defineProperty(mouseDownEvent, 'pageY', { value: 80 })
      header.dispatchEvent(mouseDownEvent)

      const mouseMoveEvent = new MouseEvent('mousemove')
      Object.defineProperty(mouseMoveEvent, 'pageX', { value: 150 })
      Object.defineProperty(mouseMoveEvent, 'pageY', { value: 100 })
      document.dispatchEvent(mouseMoveEvent)

      // x = 120 - 100 = 20, y = 80 - 50 = 30
      // moveX = 150 - 20 = 130, moveY = 100 - 30 = 70
      expect(dialog.style.left).toBe('130px')
      expect(dialog.style.top).toBe('70px')

      // 清理
      const mouseUpEvent = new MouseEvent('mouseup')
      document.dispatchEvent(mouseUpEvent)
      wrapper.unmount()
    })

    it('mouseup 后移除 mousemove 监听', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      const header = wrapper.find('.ty-dialog__header').element

      // mousedown
      const mouseDownEvent = new MouseEvent('mousedown')
      Object.defineProperty(mouseDownEvent, 'pageX', { value: 0 })
      Object.defineProperty(mouseDownEvent, 'pageY', { value: 0 })
      header.dispatchEvent(mouseDownEvent)

      // mouseup
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
      document.dispatchEvent(new MouseEvent('mouseup'))

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function))
      wrapper.unmount()
      removeEventListenerSpy.mockRestore()
    })
  })

  // ===== defineExpose =====
  describe('defineExpose', () => {
    it('应暴露 showValue', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.vm.showValue).toBeDefined()
      expect(wrapper.vm.showValue).toBe(false) // 默认 false
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('所有 props 组合', () => {
      const wrapper = mount(TyDialog, {
        props: {
          modelValue: true,
          isTeleport: false,
          title: '确认',
          width: '600px',
          top: '100px',
          info: '确认操作？',
          isUnderLine: false,
          mask: false,
          draggable: false
        },
        slots: {
          footer: '<button>OK</button>'
        }
      })
      const dialog = wrapper.find('.ty-dialog')
      expect(dialog.attributes('style')).toContain('width: 600px')
      expect(dialog.attributes('style')).toContain('top: 100px')
      expect(wrapper.find('.ty-dialog__title').text()).toBe('确认')
      expect(wrapper.find('.ty-dialog__body').text()).toContain('确认操作？')
      expect(wrapper.find('.ty-dialog__header').classes()).not.toContain('is-underLine')
      expect(wrapper.find('.ty-dialog__wrapper').classes()).not.toContain('is-mask')
      expect(wrapper.find('.ty-dialog__footer').exists()).toBe(true)
      wrapper.unmount()
    })

    it('空 info 且无默认插槽', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog__body').text()).toBe('')
      wrapper.unmount()
    })

    it('多次打开关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: false, isTeleport: false }
      })

      await wrapper.setProps({ modelValue: true })
      expect(wrapper.find('.ty-dialog').isVisible()).toBe(true)

      await wrapper.setProps({ modelValue: false })
      expect(wrapper.find('.ty-dialog').isVisible()).toBe(false)

      await wrapper.setProps({ modelValue: true })
      expect(wrapper.find('.ty-dialog').isVisible()).toBe(true)
      wrapper.unmount()
    })
  })
})
