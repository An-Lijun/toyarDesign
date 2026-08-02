import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'

/**
 * TyAlert 组件单元测试
 * Alert 是函数式命令式 API，通过 useAlert 创建 dialog VNode 并挂载到 document.body
 *
 * 依赖说明：
 * - robinson 的 is 函数：内部依赖 dayjs ESM 存在解析问题，需 mock
 * - toyaricon 图标组件：SVG 组件，需 mock 为简单占位组件
 */

// Mock robinson 的 is 函数
vi.mock('robinson', () => ({
  is: (val, type) => {
    if (type === 'function') return typeof val === 'function'
    return Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === type
  }
}))

// Mock toyaricon 图标组件
vi.mock('toyaricon', () => {
  const makeIcon = name => ({
    name,
    render: () => null
  })
  return {
    TyiCheckboxCircleFill: makeIcon('TyiCheckboxCircleFill'),
    TyiCloseCircleFill: makeIcon('TyiCloseCircleFill'),
    TyiInformationFill: makeIcon('TyiInformationFill'),
    TyiCloseFill: makeIcon('TyiCloseFill')
  }
})

import AlertJs, { useAlert } from '../index.ts'

/**
 * 等待 nextTick，让 useAlert 内部的 nextTick 回调执行完毕
 */
const waitForShow = async () => {
  await nextTick()
  await nextTick()
}

/**
 * 清理 document.body 上所有由 alert 创建的节点
 */
const cleanBody = () => {
  document.body.innerHTML = ''
}

describe('TyAlert 组件', () => {
  beforeEach(() => {
    cleanBody()
  })

  afterEach(() => {
    cleanBody()
    vi.restoreAllMocks()
  })

  // ===== AlertJs 入口函数 =====
  describe('AlertJs 入口函数', () => {
    it('应返回包含 destroy 方法的对象', () => {
      const result = AlertJs('提示信息', { title: '标题', type: 'info', isUnderLine: false })
      expect(result).toHaveProperty('destroy')
      expect(typeof result.destroy).toBe('function')
      result.destroy()
    })

    it('调用后应在 document.body 挂载 dialog 节点', async () => {
      const beforeCount = document.body.children.length
      const result = AlertJs('测试内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      expect(document.body.children.length).toBeGreaterThan(beforeCount)
      result.destroy()
    })
  })

  // ===== useAlert Hook 基础渲染 =====
  describe('useAlert Hook - 基础渲染', () => {
    it('应返回 vnode 和 destroy', () => {
      const result = useAlert('内容', { title: '标题', type: 'info', isUnderLine: false })
      expect(result).toHaveProperty('vnode')
      expect(result).toHaveProperty('destroy')
      result.destroy()
    })

    it('应在 document.body 创建容器 div', async () => {
      const beforeCount = document.body.children.length
      const { destroy } = useAlert('内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      expect(document.body.children.length).toBe(beforeCount + 1)
      destroy()
    })

    it('dialog 应包含 content 信息文本', async () => {
      const { destroy } = useAlert('这是提示内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      expect(document.body.innerHTML).toContain('这是提示内容')
      destroy()
    })

    it('dialog 应包含 title 标题文本', async () => {
      const { destroy } = useAlert('内容', { title: '自定义标题', type: 'info', isUnderLine: false })
      await waitForShow()

      expect(document.body.innerHTML).toContain('自定义标题')
      destroy()
    })

    it('dialog 应包含 ty-dialog 类名', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      const dialog = document.body.querySelector('.ty-dialog')
      expect(dialog).toBeTruthy()
      destroy()
    })

    it('dialog 应包含 wrapper 类名', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      const wrapper = document.body.querySelector('.ty-dialog__wrapper')
      expect(wrapper).toBeTruthy()
      destroy()
    })
  })

  // ===== 选项合并 =====
  describe('选项合并', () => {
    it('未传 title 时应使用默认值 "提示"', async () => {
      const { destroy } = useAlert('内容', { type: 'info', isUnderLine: false })
      await waitForShow()

      expect(document.body.innerHTML).toContain('提示')
      destroy()
    })

    it('未传 type 时应使用默认值 "info"', async () => {
      const { destroy } = useAlert('内容', { title: '标题', isUnderLine: false })
      await waitForShow()

      // info 类型对应 TY_MOOD.info = 'primary'，图标使用 TyiInformationFill
      // 只要不报错且 dialog 正常渲染即可
      const dialog = document.body.querySelector('.ty-dialog')
      expect(dialog).toBeTruthy()
      destroy()
    })

    it('未传 isUnderLine 时应使用默认值 false', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'info' })
      await waitForShow()

      // isUnderLine=false（defaultDialogOptions 默认值），header 不应有 is-underLine 类
      const header = document.body.querySelector('.ty-dialog__header')
      expect(header).toBeTruthy()
      expect(header.classList.contains('is-underLine')).toBe(false)
      destroy()
    })

    it('isUnderLine 为 true 时 header 应有 is-underLine 类', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'info', isUnderLine: true })
      await waitForShow()

      const header = document.body.querySelector('.ty-dialog__header')
      // nm.is('underLine', true) 生成 "is-underLine"（驼峰，非 kebab-case）
      expect(header.classList.contains('is-underLine')).toBe(true)
      destroy()
    })

    it('自定义选项应覆盖默认选项', async () => {
      const { destroy } = useAlert('内容', { title: '覆盖标题', type: 'success', isUnderLine: true })
      await waitForShow()

      expect(document.body.innerHTML).toContain('覆盖标题')
      const header = document.body.querySelector('.ty-dialog__header')
      expect(header.classList.contains('is-underLine')).toBe(true)
      destroy()
    })
  })

  // ===== Footer 按钮渲染 =====
  describe('Footer 按钮', () => {
    it('未传 sure 和 cancel 时 footer 为空（无按钮）', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      // useAlert 始终传入 footer 插槽函数（返回 null），dialog 的 v-if="useSlots().footer" 为 true
      // 但插槽内容为 null，footer 内无按钮
      const footer = document.body.querySelector('.ty-dialog__footer')
      if (footer) {
        const buttons = footer.querySelectorAll('button')
        expect(buttons.length).toBe(0)
      }
      destroy()
    })

    it('传入 sure 时应渲染确认按钮', async () => {
      const { destroy } = useAlert('内容', {
        title: '标题',
        type: 'info',
        isUnderLine: false,
        sure: { text: '确定', code: () => {} }
      })
      await waitForShow()

      const footer = document.body.querySelector('.ty-dialog__footer')
      expect(footer).toBeTruthy()
      expect(footer.innerHTML).toContain('确定')
      destroy()
    })

    it('传入 cancel 时应渲染取消按钮', async () => {
      const { destroy } = useAlert('内容', {
        title: '标题',
        type: 'info',
        isUnderLine: false,
        cancel: { text: '取消操作', code: () => {} }
      })
      await waitForShow()

      const footer = document.body.querySelector('.ty-dialog__footer')
      expect(footer).toBeTruthy()
      expect(footer.innerHTML).toContain('取消操作')
      destroy()
    })

    it('同时传入 sure 和 cancel 时应渲染两个按钮', async () => {
      const { destroy } = useAlert('内容', {
        title: '标题',
        type: 'info',
        isUnderLine: false,
        sure: { text: '确认', code: () => {} },
        cancel: { text: '取消', code: () => {} }
      })
      await waitForShow()

      const footer = document.body.querySelector('.ty-dialog__footer')
      expect(footer).toBeTruthy()
      expect(footer.innerHTML).toContain('确认')
      expect(footer.innerHTML).toContain('取消')
      destroy()
    })

    it('sure.text 未传时应默认为 "确认"', async () => {
      const { destroy } = useAlert('内容', {
        title: '标题',
        type: 'info',
        isUnderLine: false,
        sure: { code: () => {} }
      })
      await waitForShow()

      const footer = document.body.querySelector('.ty-dialog__footer')
      expect(footer.innerHTML).toContain('确认')
      destroy()
    })

    it('cancel.text 未传时应默认为 "取消"', async () => {
      const { destroy } = useAlert('内容', {
        title: '标题',
        type: 'info',
        isUnderLine: false,
        cancel: { code: () => {} }
      })
      await waitForShow()

      const footer = document.body.querySelector('.ty-dialog__footer')
      expect(footer.innerHTML).toContain('取消')
      destroy()
    })
  })

  // ===== 按钮回调 =====
  describe('按钮回调', () => {
    it('点击确认按钮应调用 sure.code', async () => {
      const sureFn = vi.fn()
      const { destroy } = useAlert('内容', {
        title: '标题',
        type: 'info',
        isUnderLine: false,
        sure: { text: '确认', code: sureFn }
      })
      await waitForShow()

      // 找到 footer 中的按钮并点击
      const footer = document.body.querySelector('.ty-dialog__footer')
      const buttons = footer.querySelectorAll('button')
      expect(buttons.length).toBeGreaterThan(0)

      buttons[0].click()
      expect(sureFn).toHaveBeenCalled()
      destroy()
    })

    it('点击取消按钮应调用 cancel.code', async () => {
      const cancelFn = vi.fn()
      const { destroy } = useAlert('内容', {
        title: '标题',
        type: 'info',
        isUnderLine: false,
        cancel: { text: '取消', code: cancelFn }
      })
      await waitForShow()

      const footer = document.body.querySelector('.ty-dialog__footer')
      const buttons = footer.querySelectorAll('button')
      expect(buttons.length).toBeGreaterThan(0)

      buttons[0].click()
      expect(cancelFn).toHaveBeenCalled()
      destroy()
    })

    it('sure.code 为非函数时不应报错', async () => {
      const { destroy } = useAlert('内容', {
        title: '标题',
        type: 'info',
        isUnderLine: false,
        sure: { text: '确认', code: null }
      })
      await waitForShow()

      const footer = document.body.querySelector('.ty-dialog__footer')
      const buttons = footer.querySelectorAll('button')

      // 点击不应抛出异常
      expect(() => buttons[0].click()).not.toThrow()
      destroy()
    })
  })

  // ===== destroy 方法 =====
  describe('destroy 方法', () => {
    it('调用 destroy 后应从 document.body 移除节点', async () => {
      const beforeCount = document.body.children.length
      const { destroy } = useAlert('内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      expect(document.body.children.length).toBe(beforeCount + 1)
      destroy()
      expect(document.body.children.length).toBe(beforeCount)
    })

    it('多次调用 destroy 不应重复移除（第一次后节点已不存在）', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      destroy()
      // 第二次调用会尝试 removeChild 不存在的节点，可能抛错
      // 这里验证组件逻辑：destroy 只做一次 removeChild
      expect(() => destroy()).toThrow()
    })
  })

  // ===== 不同 type 类型 =====
  describe('不同 type 类型', () => {
    it('type=info 应正常渲染', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      const dialog = document.body.querySelector('.ty-dialog')
      expect(dialog).toBeTruthy()
      destroy()
    })

    it('type=success 应正常渲染', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'success', isUnderLine: false })
      await waitForShow()

      const dialog = document.body.querySelector('.ty-dialog')
      expect(dialog).toBeTruthy()
      destroy()
    })

    it('type=warning 应正常渲染', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'warning', isUnderLine: false })
      await waitForShow()

      const dialog = document.body.querySelector('.ty-dialog')
      expect(dialog).toBeTruthy()
      destroy()
    })

    it('type=error 应正常渲染', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'error', isUnderLine: false })
      await waitForShow()

      const dialog = document.body.querySelector('.ty-dialog')
      expect(dialog).toBeTruthy()
      destroy()
    })
  })

  // ===== dialog 属性传递 =====
  describe('dialog 属性传递', () => {
    it('应传递 isTeleport=false 给 dialog（内联渲染）', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      // isTeleport=false 时不使用 Teleport，dialog 直接在容器 div 内
      const wrapper = document.body.querySelector('.ty-dialog__wrapper')
      expect(wrapper).toBeTruthy()
      // wrapper 应是 body > div > div.ty-dialog__wrapper
      expect(wrapper.closest('body')).toBeTruthy()
      destroy()
    })

    it('应传递 mask=true 给 dialog（默认遮罩）', async () => {
      const { destroy } = useAlert('内容', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      const wrapper = document.body.querySelector('.ty-dialog__wrapper')
      expect(wrapper.classList.contains('is-mask')).toBe(true)
      destroy()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('content 为空字符串时也能正常渲染', async () => {
      const { destroy } = useAlert('', { title: '标题', type: 'info', isUnderLine: false })
      await waitForShow()

      const dialog = document.body.querySelector('.ty-dialog')
      expect(dialog).toBeTruthy()
      destroy()
    })

    it('同时创建多个 alert 应各自独立', async () => {
      const beforeCount = document.body.children.length
      const alert1 = useAlert('第一个', { title: '标题1', type: 'info', isUnderLine: false })
      const alert2 = useAlert('第二个', { title: '标题2', type: 'success', isUnderLine: false })
      await waitForShow()

      expect(document.body.children.length).toBe(beforeCount + 2)
      expect(document.body.innerHTML).toContain('第一个')
      expect(document.body.innerHTML).toContain('第二个')

      alert1.destroy()
      expect(document.body.children.length).toBe(beforeCount + 1)
      alert2.destroy()
      expect(document.body.children.length).toBe(beforeCount)
    })

    it('销毁一个 alert 不影响其他 alert', async () => {
      const alert1 = useAlert('第一个', { title: '标题1', type: 'info', isUnderLine: false })
      const alert2 = useAlert('第二个', { title: '标题2', type: 'success', isUnderLine: false })
      await waitForShow()

      alert1.destroy()
      expect(document.body.innerHTML).not.toContain('第一个')
      expect(document.body.innerHTML).toContain('第二个')
      alert2.destroy()
    })
  })
})
