import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TyImage from '../index.ts'

/**
 * TyImage 组件单元测试
 * 图片组件，支持 shape(square/circle)、size、fit(none/fill/contain/cover/scale-down)
 */

const MOCK_SRC = 'https://example.com/test.jpg'
const MOCK_ALT = '测试图片'

describe('TyImage 组件', () => {
  // ===== 渲染测试 =====
  describe('渲染', () => {
    it('应渲染基础 BEM 类名 ty-image', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC }
      })
      expect(wrapper.find('.ty-image').exists()).toBe(true)
      wrapper.unmount()
    })

    it('根元素应为 div', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC }
      })
      expect(wrapper.element.tagName.toLowerCase()).toBe('div')
      wrapper.unmount()
    })

    it('内部应渲染 img 元素', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC }
      })
      expect(wrapper.find('img').exists()).toBe(true)
      wrapper.unmount()
    })

    it('img 元素应为 div 的直接子元素', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC }
      })
      const rootEl = wrapper.find('.ty-image').element
      const directChildren = Array.from(rootEl.children).map((c) => c.tagName.toLowerCase())
      expect(directChildren).toContain('img')
      wrapper.unmount()
    })
  })

  // ===== Props - src =====
  describe('Props - src', () => {
    it('应将 src 传递给 img 元素', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC }
      })
      expect(wrapper.find('img').attributes('src')).toBe(MOCK_SRC)
      wrapper.unmount()
    })

    it('本地路径 src 能正常传递', () => {
      const wrapper = mount(TyImage, {
        props: { src: './assets/img.png' }
      })
      expect(wrapper.find('img').attributes('src')).toBe('./assets/img.png')
      wrapper.unmount()
    })
  })

  // ===== Props - alt =====
  describe('Props - alt', () => {
    it('传入 alt 时 img 有对应 alt 属性', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, alt: MOCK_ALT }
      })
      expect(wrapper.find('img').attributes('alt')).toBe(MOCK_ALT)
      wrapper.unmount()
    })

    it('未传 alt 时 img 无 alt 属性（或为空）', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC }
      })
      const alt = wrapper.find('img').attributes('alt')
      expect(alt === undefined || alt === '').toBe(true)
      wrapper.unmount()
    })
  })

  // ===== Props - size =====
  describe('Props - size', () => {
    it('默认 size 为 100 → width: 100px, height: 100px', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC }
      })
      const style = wrapper.find('img').attributes('style')
      expect(style).toContain('width: 100px')
      expect(style).toContain('height: 100px')
      wrapper.unmount()
    })

    it('自定义 size=200 → width/height: 200px', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, size: '200' }
      })
      const style = wrapper.find('img').attributes('style')
      expect(style).toContain('width: 200px')
      expect(style).toContain('height: 200px')
      wrapper.unmount()
    })

    it('自定义 size=50 → width/height: 50px', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, size: '50' }
      })
      const style = wrapper.find('img').attributes('style')
      expect(style).toContain('width: 50px')
      expect(style).toContain('height: 50px')
      wrapper.unmount()
    })

    it('size=0 → width/height: 0px', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, size: '0' }
      })
      const style = wrapper.find('img').attributes('style')
      expect(style).toContain('width: 0px')
      expect(style).toContain('height: 0px')
      wrapper.unmount()
    })
  })

  // ===== Props - shape =====
  describe('Props - shape', () => {
    it('默认 shape=square → 有 ty-image--square 类', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC }
      })
      expect(wrapper.find('.ty-image').classes()).toContain('ty-image--square')
      wrapper.unmount()
    })

    it('shape=square → 有 ty-image--square 类', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, shape: 'square' }
      })
      expect(wrapper.find('.ty-image').classes()).toContain('ty-image--square')
      wrapper.unmount()
    })

    it('shape=circle → 有 ty-image--circle 类', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, shape: 'circle' }
      })
      expect(wrapper.find('.ty-image').classes()).toContain('ty-image--circle')
      wrapper.unmount()
    })

    it('shape=circle 不应有 ty-image--square 类', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, shape: 'circle' }
      })
      expect(wrapper.find('.ty-image').classes()).not.toContain('ty-image--square')
      wrapper.unmount()
    })

    it('shape=square 不应有 ty-image--circle 类', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, shape: 'square' }
      })
      expect(wrapper.find('.ty-image').classes()).not.toContain('ty-image--circle')
      wrapper.unmount()
    })
  })

  // ===== Props - fit =====
  describe('Props - fit', () => {
    it('默认 fit=none → object-fit: none', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC }
      })
      expect(wrapper.find('img').attributes('style')).toContain('object-fit: none')
      wrapper.unmount()
    })

    it('fit=fill → object-fit: fill', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, fit: 'fill' }
      })
      expect(wrapper.find('img').attributes('style')).toContain('object-fit: fill')
      wrapper.unmount()
    })

    it('fit=contain → object-fit: contain', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, fit: 'contain' }
      })
      expect(wrapper.find('img').attributes('style')).toContain('object-fit: contain')
      wrapper.unmount()
    })

    it('fit=cover → object-fit: cover', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, fit: 'cover' }
      })
      expect(wrapper.find('img').attributes('style')).toContain('object-fit: cover')
      wrapper.unmount()
    })

    it('fit=scale-down → object-fit: scale-down', () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, fit: 'scale-down' }
      })
      expect(wrapper.find('img').attributes('style')).toContain('object-fit: scale-down')
      wrapper.unmount()
    })
  })

  // ===== useImage Hook =====
  describe('useImage Hook', () => {
    it('useTyImage 应暴露 useImage', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyImage).toBeTruthy()
      expect(mod.useTyImage.useImage).toBeTypeOf('function')
    })

    it('useImage 返回空对象', async () => {
      const mod = await import('../index.ts')
      const result = mod.useTyImage.useImage()
      expect(result).toEqual({})
    })

    it('useTyImage 应暴露 useProps / nm / staticProps', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyImage.useProps).toBeTruthy()
      expect(mod.useTyImage.nm).toBeTruthy()
      expect(mod.useTyImage.staticProps).toBeTruthy()
    })
  })

  // ===== staticProps 验证 =====
  describe('staticProps 配置', () => {
    it('staticProps 中 src 为 required', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyImage.staticProps.src.required).toBe(true)
    })

    it('staticProps 中 size 默认值为 100', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyImage.staticProps.size.default).toBe('100')
    })

    it('staticProps 中 shape 默认值为 square', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyImage.staticProps.shape.default).toBe('square')
    })

    it('staticProps 中 shape values 为 square/circle', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyImage.staticProps.shape.values).toEqual(['square', 'circle'])
    })

    it('staticProps 中 fit 默认值为 none', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyImage.staticProps.fit.default).toBe('none')
    })

    it('staticProps 中 fit values 包含 5 个枚举值', async () => {
      const mod = await import('../index.ts')
      expect(mod.useTyImage.staticProps.fit.values).toEqual(
        ['none', 'fill', 'contain', 'cover', 'scale-down']
      )
    })
  })

  // ===== 边界情况 =====
  describe('边界情况', () => {
    it('组合 Props（所有自定义值）', () => {
      const wrapper = mount(TyImage, {
        props: {
          src: MOCK_SRC,
          alt: MOCK_ALT,
          size: '150',
          shape: 'circle',
          fit: 'cover'
        }
      })
      const root = wrapper.find('.ty-image')
      const img = wrapper.find('img')
      expect(root.classes()).toContain('ty-image--circle')
      expect(root.classes()).not.toContain('ty-image--square')
      expect(img.attributes('src')).toBe(MOCK_SRC)
      expect(img.attributes('alt')).toBe(MOCK_ALT)
      expect(img.attributes('style')).toContain('width: 150px')
      expect(img.attributes('style')).toContain('height: 150px')
      expect(img.attributes('style')).toContain('object-fit: cover')
      wrapper.unmount()
    })

    it('多个 Image 组件独立渲染', () => {
      const wrapper = mount({
        components: { TyImage },
        template: `
          <div>
            <TyImage data-test="a" src="${MOCK_SRC}" shape="circle" size="50" />
            <TyImage data-test="b" src="${MOCK_SRC}" shape="square" fit="cover" />
          </div>
        `
      })
      const a = wrapper.find('[data-test="a"]')
      const b = wrapper.find('[data-test="b"]')
      expect(a.classes()).toContain('ty-image--circle')
      expect(b.classes()).toContain('ty-image--square')
      expect(a.find('img').attributes('style')).toContain('width: 50px')
      expect(b.find('img').attributes('style')).toContain('object-fit: cover')
      wrapper.unmount()
    })

    it('src 变化时 img 的 src 属性应更新', async () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC }
      })
      expect(wrapper.find('img').attributes('src')).toBe(MOCK_SRC)
      const NEW_SRC = 'https://example.com/other.png'
      await wrapper.setProps({ src: NEW_SRC })
      expect(wrapper.find('img').attributes('src')).toBe(NEW_SRC)
      wrapper.unmount()
    })

    it('size 变化时 style 应更新', async () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, size: '100' }
      })
      expect(wrapper.find('img').attributes('style')).toContain('width: 100px')
      await wrapper.setProps({ size: '200' })
      expect(wrapper.find('img').attributes('style')).toContain('width: 200px')
      expect(wrapper.find('img').attributes('style')).toContain('height: 200px')
      wrapper.unmount()
    })

    it('shape 变化时类名应更新', async () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, shape: 'square' }
      })
      expect(wrapper.find('.ty-image').classes()).toContain('ty-image--square')
      await wrapper.setProps({ shape: 'circle' })
      expect(wrapper.find('.ty-image').classes()).toContain('ty-image--circle')
      expect(wrapper.find('.ty-image').classes()).not.toContain('ty-image--square')
      wrapper.unmount()
    })

    it('fit 变化时 object-fit 应更新', async () => {
      const wrapper = mount(TyImage, {
        props: { src: MOCK_SRC, fit: 'none' }
      })
      expect(wrapper.find('img').attributes('style')).toContain('object-fit: none')
      await wrapper.setProps({ fit: 'contain' })
      expect(wrapper.find('img').attributes('style')).toContain('object-fit: contain')
      wrapper.unmount()
    })
  })
})
