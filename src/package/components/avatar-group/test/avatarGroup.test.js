import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import TyAvatarGroup from '../index.ts'
import TyAvatar from '../../avatar/index.ts'

/**
 * TyAvatarGroup 组件单元测试
 * 组件通过 useSlots().default() 获取子 VNode，克隆后添加 zIndex/marginLeft 样式
 * 支持 max 属性：超出部分显示 "+N" 头像
 */

describe('TyAvatarGroup 组件', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-avatar-group', () => {
      const wrapper = mount(TyAvatarGroup, {
        slots: {
          default: [TyAvatar, TyAvatar]
        }
      })
      expect(wrapper.find('.ty-avatar-group').exists()).toBe(true)
      wrapper.unmount()
    })

    it('应渲染所有子 avatar', () => {
      const wrapper = mount(TyAvatarGroup, {
        slots: {
          default: [
            { __v_isVNode: true, type: TyAvatar, props: {}, children: 'A' },
            { __v_isVNode: true, type: TyAvatar, props: {}, children: 'B' },
            { __v_isVNode: true, type: TyAvatar, props: {}, children: 'C' }
          ]
        }
      })
      const avatars = wrapper.findAll('.ty-avatar')
      expect(avatars.length).toBe(3)
      wrapper.unmount()
    })

    it('通过模板传入的 avatar 应正常渲染', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup>
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
          </TyAvatarGroup>
        `
      })
      expect(wrapper.findAll('.ty-avatar').length).toBe(2)
      expect(wrapper.text()).toContain('A')
      expect(wrapper.text()).toContain('B')
      wrapper.unmount()
    })
  })

  // ===== Props - offset =====
  describe('Props - offset', () => {
    it('默认 offset 为 8，子 avatar marginLeft 为 -8px', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup>
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
          </TyAvatarGroup>
        `
      })
      const avatars = wrapper.findAll('.ty-avatar')
      const style = avatars[0].attributes('style') || ''
      expect(style).toContain('margin-left: -8px')
      wrapper.unmount()
    })

    it('自定义 offset 应应用到子 avatar 的 marginLeft', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup :offset="20">
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
          </TyAvatarGroup>
        `
      })
      const avatars = wrapper.findAll('.ty-avatar')
      const style = avatars[0].attributes('style') || ''
      expect(style).toContain('margin-left: -20px')
      wrapper.unmount()
    })

    it('offset=0 时 marginLeft 为 -0px', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup :offset="0">
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
          </TyAvatarGroup>
        `
      })
      const avatars = wrapper.findAll('.ty-avatar')
      const style = avatars[0].attributes('style') || ''
      // 模板使用 `-${offset}px`，offset=0 时生成 "-0px"
      expect(style).toContain('margin-left: -0px')
      wrapper.unmount()
    })
  })

  // ===== Props - max =====
  describe('Props - max', () => {
    it('未传 max 时渲染所有子 avatar', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup>
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
            <TyAvatar>C</TyAvatar>
            <TyAvatar>D</TyAvatar>
            <TyAvatar>E</TyAvatar>
          </TyAvatarGroup>
        `
      })
      expect(wrapper.findAll('.ty-avatar').length).toBe(5)
      wrapper.unmount()
    })

    it('max 小于子数量时应截断并显示 +N', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup :max="2">
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
            <TyAvatar>C</TyAvatar>
            <TyAvatar>D</TyAvatar>
            <TyAvatar>E</TyAvatar>
          </TyAvatarGroup>
        `
      })
      const avatars = wrapper.findAll('.ty-avatar')
      // 显示 max(2) + 1 个 "+N" 头像
      expect(avatars.length).toBe(3)
      // 最后一个应显示 "+3"
      expect(avatars[2].text()).toContain('+3')
      wrapper.unmount()
    })

    it('max 等于子数量时应全部渲染，无 +N', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup :max="3">
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
            <TyAvatar>C</TyAvatar>
          </TyAvatarGroup>
        `
      })
      const avatars = wrapper.findAll('.ty-avatar')
      expect(avatars.length).toBe(3)
      // 不应出现 "+"
      expect(avatars[2].text()).not.toContain('+')
      wrapper.unmount()
    })

    it('max 大于子数量时应全部渲染，无 +N', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup :max="10">
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
          </TyAvatarGroup>
        `
      })
      const avatars = wrapper.findAll('.ty-avatar')
      expect(avatars.length).toBe(2)
      expect(wrapper.text()).not.toContain('+')
      wrapper.unmount()
    })

    it('max=1 时只显示 1 个 + N 个', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup :max="1">
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
            <TyAvatar>C</TyAvatar>
          </TyAvatarGroup>
        `
      })
      const avatars = wrapper.findAll('.ty-avatar')
      expect(avatars.length).toBe(2)
      expect(avatars[1].text()).toContain('+2')
      wrapper.unmount()
    })
  })

  // ===== z-index 层级 =====
  describe('z-index 层级', () => {
    it('子 avatar 应按顺序设置递减的 zIndex', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup>
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
            <TyAvatar>C</TyAvatar>
          </TyAvatarGroup>
        `
      })
      const avatars = wrapper.findAll('.ty-avatar')
      // 第一个 zIndex=3，第二个=2，第三个=1
      const style0 = avatars[0].attributes('style') || ''
      const style1 = avatars[1].attributes('style') || ''
      const style2 = avatars[2].attributes('style') || ''
      expect(style0).toContain('z-index: 3')
      expect(style1).toContain('z-index: 2')
      expect(style2).toContain('z-index: 1')
      wrapper.unmount()
    })

    it('max 截断时 +N 头像 zIndex 应为 1', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup :max="2">
            <TyAvatar>A</TyAvatar>
            <TyAvatar>B</TyAvatar>
            <TyAvatar>C</TyAvatar>
            <TyAvatar>D</TyAvatar>
          </TyAvatarGroup>
        `
      })
      const avatars = wrapper.findAll('.ty-avatar')
      // 最后一个是 "+2" 头像，zIndex 应为 1
      const lastStyle = avatars[avatars.length - 1].attributes('style') || ''
      expect(lastStyle).toContain('z-index: 1')
      wrapper.unmount()
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('空子节点时应正常渲染（不报错）', () => {
      const wrapper = mount(TyAvatarGroup, {
        slots: { default: [] }
      })
      expect(wrapper.find('.ty-avatar-group').exists()).toBe(true)
      expect(wrapper.findAll('.ty-avatar').length).toBe(0)
      wrapper.unmount()
    })

    it('单个子 avatar 时也能正常渲染', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup>
            <TyAvatar>Solo</TyAvatar>
          </TyAvatarGroup>
        `
      })
      expect(wrapper.findAll('.ty-avatar').length).toBe(1)
      wrapper.unmount()
    })

    it('子 avatar 的原始 props 应被保留', () => {
      const wrapper = mount({
        components: { TyAvatarGroup, TyAvatar },
        template: `
          <TyAvatarGroup>
            <TyAvatar shape="circle">A</TyAvatar>
            <TyAvatar shape="square">B</TyAvatar>
          </TyAvatarGroup>
        `
      })
      const avatars = wrapper.findAll('.ty-avatar')
      expect(avatars[0].classes()).toContain('is-circle')
      expect(avatars[1].classes()).toContain('is-square')
      wrapper.unmount()
    })
  })
})
