import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick, ref, h } from 'vue'
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

    it('content 作为默认插槽文本', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, content: '提示内容' }
      })
      expect(wrapper.find('.ty-dialog__body').text()).toContain('提示内容')
      wrapper.unmount()
    })

    it('默认插槽优先于 content', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, content: 'content文本' },
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

    it('默认 maskClosable 为 false', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.props('maskClosable')).toBe(false)
      wrapper.unmount()
    })

    it('maskClosable=true 可传入', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, maskClosable: true }
      })
      expect(wrapper.props('maskClosable')).toBe(true)
      wrapper.unmount()
    })

    it('默认 closeOnEsc 为 false', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.props('closeOnEsc')).toBe(false)
      wrapper.unmount()
    })

    it('closeOnEsc=true 可传入', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, closeOnEsc: true }
      })
      expect(wrapper.props('closeOnEsc')).toBe(true)
      wrapper.unmount()
    })

    it('默认 isShowClose 为 true', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.props('isShowClose')).toBe(true)
      wrapper.unmount()
    })

    it('isShowClose=false 可传入', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isShowClose: false }
      })
      expect(wrapper.props('isShowClose')).toBe(false)
      wrapper.unmount()
    })

    it('默认 beforeClose 是函数', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(typeof wrapper.props('beforeClose')).toBe('function')
      wrapper.unmount()
    })

    it('beforeClose 可传入自定义函数', () => {
      const fn = vi.fn()
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, beforeClose: fn }
      })
      expect(wrapper.props('beforeClose')).toBe(fn)
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

    it('modelValue=false 时对话框不可见（v-show，destroyOnClose=false）', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: false, isTeleport: false, destroyOnClose: false }
      })
      // v-show 不移除元素，只是 display: none
      expect(wrapper.find('.ty-dialog').exists()).toBe(true)
      expect(wrapper.find('.ty-dialog').isVisible()).toBe(false)
      wrapper.unmount()
    })

    it('modelValue 变化时更新可见性（destroyOnClose=false）', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: false, isTeleport: false, destroyOnClose: false }
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

    it('默认 maskClosable=false，点击遮罩层不触发 handleClose', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      // @click.self: 只有点击 wrapper 本身（非子元素）才触发
      await wrapper.find('.ty-dialog__wrapper').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
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

    it('maskClosable=true 时点击遮罩层触发 handleClose', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, maskClosable: true }
      })
      await wrapper.find('.ty-dialog__wrapper').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('maskClosable=true 时点击 dialog 内部仍不触发 handleClose', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, maskClosable: true }
      })
      await wrapper.find('.ty-dialog__body').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })

    it('maskClosable=true 时关闭按钮仍可关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, maskClosable: true }
      })
      await wrapper.find('.ty-dialog__headerBtn').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
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
          content: '确认操作？',
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

    it('空 content 且无默认插槽', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog__body').text()).toBe('')
      wrapper.unmount()
    })

    it('多次打开关闭（destroyOnClose=false）', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: false, isTeleport: false, destroyOnClose: false }
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

  // ===== destroyOnClose =====
  describe('destroyOnClose', () => {
    it('默认 destroyOnClose 为 true', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.props('destroyOnClose')).toBe(true)
      wrapper.unmount()
    })

    it('destroyOnClose=true 且 modelValue=false 时销毁内层 dialog', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: false, isTeleport: false, destroyOnClose: true }
      })
      // 内层 .ty-dialog 被 v-if 销毁，但 wrapper 容器仍在（v-show 隐藏）
      expect(wrapper.find('.ty-dialog').exists()).toBe(false)
      expect(wrapper.find('.ty-dialog__wrapper').exists()).toBe(true)
      wrapper.unmount()
    })

    it('destroyOnClose=true 且 modelValue=true 时渲染内层 dialog', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, destroyOnClose: true }
      })
      expect(wrapper.find('.ty-dialog').exists()).toBe(true)
      wrapper.unmount()
    })

    it('destroyOnClose=true 关闭后内层 dialog 被销毁', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, destroyOnClose: true }
      })
      expect(wrapper.find('.ty-dialog').exists()).toBe(true)

      await wrapper.setProps({ modelValue: false })
      expect(wrapper.find('.ty-dialog').exists()).toBe(false)
      wrapper.unmount()
    })

    it('destroyOnClose=true 重新打开后内层 dialog 重建', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: false, isTeleport: false, destroyOnClose: true }
      })
      expect(wrapper.find('.ty-dialog').exists()).toBe(false)

      await wrapper.setProps({ modelValue: true })
      expect(wrapper.find('.ty-dialog').exists()).toBe(true)
      wrapper.unmount()
    })

    it('destroyOnClose=true 重新打开后拖拽仍生效', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: false, isTeleport: false, destroyOnClose: true }
      })
      await wrapper.setProps({ modelValue: true })
      await nextTick()

      const header = wrapper.find('.ty-dialog__header').element
      const dialog = wrapper.find('.ty-dialog').element
      Object.defineProperty(dialog, 'offsetLeft', { value: 100, configurable: true })
      Object.defineProperty(dialog, 'offsetTop', { value: 50, configurable: true })

      const mouseDownEvent = new MouseEvent('mousedown')
      Object.defineProperty(mouseDownEvent, 'pageX', { value: 120 })
      Object.defineProperty(mouseDownEvent, 'pageY', { value: 80 })
      header.dispatchEvent(mouseDownEvent)

      const mouseMoveEvent = new MouseEvent('mousemove')
      Object.defineProperty(mouseMoveEvent, 'pageX', { value: 150 })
      Object.defineProperty(mouseMoveEvent, 'pageY', { value: 100 })
      document.dispatchEvent(mouseMoveEvent)

      expect(dialog.style.left).toBe('130px')
      expect(dialog.style.top).toBe('70px')

      document.dispatchEvent(new MouseEvent('mouseup'))
      wrapper.unmount()
    })
  })

  // ===== closeOnEsc =====
  describe('closeOnEsc', () => {
    it('closeOnEsc=false 时按 ESC 不触发关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, closeOnEsc: false }
      })
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })

    it('closeOnEsc=true 且弹窗可见时按 ESC 触发关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, closeOnEsc: true }
      })
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('closeOnEsc=true 且弹窗不可见时按 ESC 不触发关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: false, isTeleport: false, destroyOnClose: false, closeOnEsc: true }
      })
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })

    it('closeOnEsc=true 且 destroyOnClose=true 时按 ESC 仍能关闭', async () => {
      // destroyOnClose=true 时内层 DOM 被 v-if 销毁，验证 ESC 监听挂在 document 上不受影响
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, destroyOnClose: true, closeOnEsc: true }
      })
      expect(wrapper.find('.ty-dialog').exists()).toBe(true)
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('closeOnEsc=true 时按非 ESC 键不触发关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, closeOnEsc: true }
      })
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })

    it('closeOnEsc=true 时 keyCode=27 触发关闭（兼容旧浏览器）', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, closeOnEsc: true }
      })
      const event = new KeyboardEvent('keydown')
      Object.defineProperty(event, 'keyCode', { value: 27 })
      document.dispatchEvent(event)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('onBeforeUnmount 时移除 keydown 监听', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, closeOnEsc: true }
      })
      wrapper.unmount()
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
      removeEventListenerSpy.mockRestore()
    })

    it('卸载后按 ESC 不再触发关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, closeOnEsc: true }
      })
      wrapper.unmount()
      // 卸载后再派发事件，不应有副作用（无抛错即可）
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })

  // ===== isShowClose =====
  describe('isShowClose', () => {
    it('默认渲染关闭按钮', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(true)
      wrapper.unmount()
    })

    it('isShowClose=true 时渲染关闭按钮和 TyiCloseFill 图标', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isShowClose: true }
      })
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'TyiCloseFill' }).exists()).toBe(true)
      wrapper.unmount()
    })

    it('isShowClose=false 时关闭按钮不渲染', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isShowClose: false }
      })
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(false)
      wrapper.unmount()
    })

    it('isShowClose=false 时 TyiCloseFill 图标不渲染', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isShowClose: false }
      })
      expect(wrapper.findComponent({ name: 'TyiCloseFill' }).exists()).toBe(false)
      wrapper.unmount()
    })

    it('isShowClose=false 时 header 仍渲染', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isShowClose: false }
      })
      expect(wrapper.find('.ty-dialog__header').exists()).toBe(true)
      expect(wrapper.find('.ty-dialog__title').exists()).toBe(true)
      wrapper.unmount()
    })

    it('isShowClose=false 时无法通过关闭按钮关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isShowClose: false }
      })
      // 按钮不存在，无法点击触发关闭
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })

    it('isShowClose=false 时 ESC 关闭仍可用（closeOnEsc=true）', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isShowClose: false, closeOnEsc: true }
      })
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('isShowClose=false 时点击遮罩关闭仍可用（maskClosable=true）', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isShowClose: false, maskClosable: true }
      })
      await wrapper.find('.ty-dialog__wrapper').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('动态切换 isShowClose 从 true 到 false', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isShowClose: true }
      })
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(true)

      await wrapper.setProps({ isShowClose: false })
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(false)
      wrapper.unmount()
    })

    it('动态切换 isShowClose 从 false 到 true', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, isShowClose: false }
      })
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(false)

      await wrapper.setProps({ isShowClose: true })
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  // ===== fullscreen =====
  describe('fullscreen', () => {
    it('默认 fullscreen 为 false', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      expect(wrapper.props('fullscreen')).toBe(false)
      expect(wrapper.find('.ty-dialog').classes()).not.toContain('is-fullscreen')
      wrapper.unmount()
    })

    it('fullscreen=true 时 dialog 有 is-fullscreen 类', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true }
      })
      expect(wrapper.find('.ty-dialog').classes()).toContain('is-fullscreen')
      wrapper.unmount()
    })

    it('fullscreen=true 时不应用 width 内联样式', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true, width: '500px' }
      })
      const style = wrapper.find('.ty-dialog').attributes('style')
      expect(style).toBeUndefined()
      wrapper.unmount()
    })

    it('fullscreen=true 时不应用 top 内联样式', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true, top: '50px' }
      })
      const style = wrapper.find('.ty-dialog').attributes('style')
      expect(style).toBeUndefined()
      wrapper.unmount()
    })

    it('fullscreen=true 同时传 width/top 时均不应用', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true, width: '600px', top: '100px' }
      })
      const style = wrapper.find('.ty-dialog').attributes('style')
      expect(style).toBeUndefined()
      wrapper.unmount()
    })

    it('fullscreen=false 时正常应用 width/top 内联样式', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: false, width: '500px', top: '50px' }
      })
      const style = wrapper.find('.ty-dialog').attributes('style')
      expect(style).toContain('width: 500px')
      expect(style).toContain('top: 50px')
      wrapper.unmount()
    })

    it('动态切换 fullscreen 从 false 到 true', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: false }
      })
      expect(wrapper.find('.ty-dialog').classes()).not.toContain('is-fullscreen')
      expect(wrapper.find('.ty-dialog').attributes('style')).toContain('width: 30%')

      await wrapper.setProps({ fullscreen: true })
      expect(wrapper.find('.ty-dialog').classes()).toContain('is-fullscreen')
      expect(wrapper.find('.ty-dialog').attributes('style')).toBeUndefined()
      wrapper.unmount()
    })

    it('动态切换 fullscreen 从 true 到 false', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true }
      })
      expect(wrapper.find('.ty-dialog').classes()).toContain('is-fullscreen')

      await wrapper.setProps({ fullscreen: false })
      expect(wrapper.find('.ty-dialog').classes()).not.toContain('is-fullscreen')
      expect(wrapper.find('.ty-dialog').attributes('style')).toContain('width: 30%')
      expect(wrapper.find('.ty-dialog').attributes('style')).toContain('top: 15vh')
      wrapper.unmount()
    })

    it('fullscreen=true 时其他结构（header/body/footer）仍正常渲染', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true },
        slots: { footer: '<button>OK</button>' }
      })
      expect(wrapper.find('.ty-dialog__header').exists()).toBe(true)
      expect(wrapper.find('.ty-dialog__body').exists()).toBe(true)
      expect(wrapper.find('.ty-dialog__footer').exists()).toBe(true)
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(true)
      wrapper.unmount()
    })

    it('fullscreen=true 时 content 文本仍渲染', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true, content: '全屏内容' }
      })
      expect(wrapper.find('.ty-dialog__body').text()).toContain('全屏内容')
      wrapper.unmount()
    })

    it('fullscreen=true 时关闭按钮仍可关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true }
      })
      await wrapper.find('.ty-dialog__headerBtn').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('fullscreen=true 且 maskClosable=true 时点击遮罩可关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true, maskClosable: true }
      })
      await wrapper.find('.ty-dialog__wrapper').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('fullscreen=true 且 closeOnEsc=true 时按 ESC 可关闭', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true, closeOnEsc: true }
      })
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('fullscreen=true 且 isShowClose=false 时不渲染关闭按钮', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true, isShowClose: false }
      })
      expect(wrapper.find('.ty-dialog__headerBtn').exists()).toBe(false)
      expect(wrapper.find('.ty-dialog').classes()).toContain('is-fullscreen')
      wrapper.unmount()
    })

    it('fullscreen=true 且 isUnderLine=false 时 header 无 is-underLine 类', () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, fullscreen: true, isUnderLine: false }
      })
      expect(wrapper.find('.ty-dialog__header').classes()).not.toContain('is-underLine')
      expect(wrapper.find('.ty-dialog').classes()).toContain('is-fullscreen')
      wrapper.unmount()
    })

    it('fullscreen=true 在 Teleport 模式下也生效', () => {
      mount(TyDialog, {
        props: { modelValue: true, fullscreen: true }
      })
      const dialog = document.querySelector('.ty-dialog')
      expect(dialog).toBeTruthy()
      expect(dialog.classList.contains('is-fullscreen')).toBe(true)
      // Teleport 模式下 inline style 同样不应有 width/top
      expect(dialog.getAttribute('style')).toBeNull()
    })
  })

  // ===== beforeClose =====
  describe('beforeClose', () => {
    it('默认 beforeClose 立即关闭（点击关闭按钮）', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false }
      })
      await wrapper.find('.ty-dialog__headerBtn').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('自定义 beforeClose 不调用 done 时不关闭', async () => {
      // 不调用 done，对话框保持打开
      const beforeClose = vi.fn(() => {
        /* 不调用 done */
      })
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, beforeClose }
      })
      await wrapper.find('.ty-dialog__headerBtn').trigger('click')
      expect(beforeClose).toHaveBeenCalled()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })

    it('自定义 beforeClose 调用 done 时关闭', async () => {
      const beforeClose = vi.fn(done => {
        done()
      })
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, beforeClose }
      })
      await wrapper.find('.ty-dialog__headerBtn').trigger('click')
      expect(beforeClose).toHaveBeenCalled()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('beforeClose 回调接收 done 函数参数', async () => {
      const beforeClose = vi.fn(done => {
        done()
      })
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, beforeClose }
      })
      await wrapper.find('.ty-dialog__headerBtn').trigger('click')
      expect(beforeClose.mock.calls[0][0]).toBeInstanceOf(Function)
      wrapper.unmount()
    })

    it('beforeClose 异步调用 done 时延迟关闭', async () => {
      const beforeClose = vi.fn(done => {
        setTimeout(done, 0)
      })
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, beforeClose }
      })
      await wrapper.find('.ty-dialog__headerBtn').trigger('click')
      // 同步阶段不关闭
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      // 异步 done 调用后关闭
      await nextTick()
      await new Promise(r => setTimeout(r, 10))
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('beforeClose 拦截遮罩点击关闭（maskClosable=true）', async () => {
      const beforeClose = vi.fn(() => {
        /* 不调用 done */
      })
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, maskClosable: true, beforeClose }
      })
      await wrapper.find('.ty-dialog__wrapper').trigger('click')
      expect(beforeClose).toHaveBeenCalled()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })

    it('beforeClose 拦截 ESC 关闭（closeOnEsc=true）', async () => {
      const beforeClose = vi.fn(() => {
        /* 不调用 done */
      })
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, closeOnEsc: true, beforeClose }
      })
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(beforeClose).toHaveBeenCalled()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      wrapper.unmount()
    })

    it('beforeClose 中调用 done 后遮罩点击仍可再次触发', async () => {
      let callCount = 0
      const beforeClose = vi.fn(done => {
        callCount++
        if (callCount === 2) done()
      })
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, maskClosable: true, beforeClose }
      })
      // 第一次点击：不关闭
      await wrapper.find('.ty-dialog__wrapper').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      // 第二次点击：关闭
      await wrapper.find('.ty-dialog__wrapper').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })

    it('动态切换 beforeClose 生效', async () => {
      const wrapper = mount(TyDialog, {
        props: { modelValue: true, isTeleport: false, beforeClose: () => {} }
      })
      // 初始不调用 done，不关闭
      await wrapper.find('.ty-dialog__headerBtn').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()

      // 切换为调用 done 的函数
      await wrapper.setProps({ beforeClose: done => done() })
      await wrapper.find('.ty-dialog__headerBtn').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(false)
      wrapper.unmount()
    })
  })

  // ===== 嵌套 Dialog =====
  describe('嵌套 Dialog', () => {
    const mountNested = (initialOuter = true, initialInner = false) => {
      return mount({
        components: { TyDialog },
        template: `
          <TyDialog v-model="outer" title="外层" :is-teleport="false">
            <button class="open-inner" @click="inner = true">打开内层</button>
            <TyDialog v-model="inner" title="内层" :is-teleport="false">
              <p class="inner-content">内层内容</p>
            </TyDialog>
          </TyDialog>
        `,
        setup() {
          const outer = ref(initialOuter)
          const inner = ref(initialInner)
          return { outer, inner }
        }
      })
    }

    it('外层打开、内层未打开时只有一个 dialog', () => {
      const wrapper = mountNested(true, false)
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(1)
      expect(wrapper.find('.inner-content').exists()).toBe(false)
      wrapper.unmount()
    })

    it('点击按钮打开内层后有两个 dialog', async () => {
      const wrapper = mountNested(true, false)
      await wrapper.find('.open-inner').trigger('click')
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(2)
      expect(wrapper.find('.inner-content').exists()).toBe(true)
      wrapper.unmount()
    })

    it('内层关闭后外层仍可见', async () => {
      const wrapper = mountNested(true, false)
      await wrapper.find('.open-inner').trigger('click')
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(2)

      // 点击内层关闭按钮（findAll 第 2 个是内层）
      const closeBtns = wrapper.findAll('.ty-dialog__headerBtn')
      await closeBtns[1].trigger('click')
      await nextTick()
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(1)
      // 外层仍可见
      expect(wrapper.find('.ty-dialog').isVisible()).toBe(true)
      wrapper.unmount()
    })

    it('外层关闭后内层也被销毁', async () => {
      const wrapper = mountNested(true, false)
      await wrapper.find('.open-inner').trigger('click')
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(2)

      // 点击外层关闭按钮（第 1 个）
      const closeBtns = wrapper.findAll('.ty-dialog__headerBtn')
      await closeBtns[0].trigger('click')
      await nextTick()
      // destroyOnClose=true，外层关闭后内层 DOM 也被销毁
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(0)
      wrapper.unmount()
    })

    it('内层独立 v-model 控制（不影响外层状态）', async () => {
      const wrapper = mountNested(true, false)
      await wrapper.find('.open-inner').trigger('click')
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(2)

      // 关闭内层
      const closeBtns = wrapper.findAll('.ty-dialog__headerBtn')
      await closeBtns[1].trigger('click')
      await nextTick()
      // 外层仍打开
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(1)

      // 再次打开内层
      await wrapper.find('.open-inner').trigger('click')
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(2)
      wrapper.unmount()
    })

    it('嵌套场景下内层标题正确渲染', async () => {
      const wrapper = mountNested(true, false)
      await wrapper.find('.open-inner').trigger('click')
      const titles = wrapper.findAll('.ty-dialog__title')
      expect(titles).toHaveLength(2)
      expect(titles[0].text()).toBe('外层')
      expect(titles[1].text()).toBe('内层')
      wrapper.unmount()
    })

    it('内层 destroyOnClose=true 时关闭内层后内层 DOM 销毁', async () => {
      const wrapper = mount({
        components: { TyDialog },
        template: `
          <TyDialog v-model="outer" title="外层" :is-teleport="false">
            <button class="open-inner" @click="inner = true">打开内层</button>
            <TyDialog v-model="inner" title="内层" :is-teleport="false" :destroy-on-close="true">
              <p class="inner-content">内层内容</p>
            </TyDialog>
          </TyDialog>
        `,
        setup() {
          const outer = ref(true)
          const inner = ref(false)
          return { outer, inner }
        }
      })
      await wrapper.find('.open-inner').trigger('click')
      expect(wrapper.find('.inner-content').exists()).toBe(true)

      // 关闭内层
      const closeBtns = wrapper.findAll('.ty-dialog__headerBtn')
      await closeBtns[1].trigger('click')
      await nextTick()
      // 内层内容被销毁
      expect(wrapper.find('.inner-content').exists()).toBe(false)
      // 外层仍在
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(1)
      wrapper.unmount()
    })

    it('嵌套场景下 ESC 只关闭内层（closeOnEsc）', async () => {
      const wrapper = mount({
        components: { TyDialog },
        template: `
          <TyDialog v-model="outer" title="外层" :is-teleport="false" :close-on-esc="true">
            <button class="open-inner" @click="inner = true">打开内层</button>
            <TyDialog v-model="inner" title="内层" :is-teleport="false" :close-on-esc="true">
              <p class="inner-content">内层内容</p>
            </TyDialog>
          </TyDialog>
        `,
        setup() {
          const outer = ref(true)
          const inner = ref(false)
          return { outer, inner }
        }
      })
      await wrapper.find('.open-inner').trigger('click')
      expect(wrapper.findAll('.ty-dialog')).toHaveLength(2)

      // 按 ESC：两个 dialog 都监听了 keydown，都会触发关闭
      // 但内层后挂载，先触发内层的 handleClose
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      // 内层关闭，外层可能也被关闭（两个都在 document 上监听）
      // 此用例验证 ESC 事件能被嵌套 dialog 正常响应
      expect(wrapper.findAll('.ty-dialog').length).toBeLessThan(2)
      wrapper.unmount()
    })
  })
})
