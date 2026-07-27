import { watch, onMounted, onBeforeUnmount } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import generate from '../../../color/index.js'

/**
 * ConfigProvider 组件的核心逻辑 Hook
 * 处理主题切换、设计令牌应用和主色调整
 * @param props - 组件属性
 */
export default function useConfigProvider(
  props: ExtractPropTypes<typeof useProps>
): void {
  const html = document.querySelector('html')
  let nowColor = html?.getAttribute('toyar-theme')

  const changeParmary = (newVal = props.options.resetPrimary) => {
    const value = newVal
    const theme = html?.getAttribute('toyar-theme')
    const arr = generate(value, { list: true, dark: theme === 'dark' ? true : false })
    const len = arr.length
    for (let index = 0; index < len; index++) {
      html?.style.setProperty(`--primary-${index + 1}`, arr[index])
    }
  }

  const applyTokens = (tokens: Record<string, unknown>) => {
    if (!tokens || typeof tokens !== 'object') return

    if (tokens.radius) {
      for (const [name, value] of Object.entries(tokens.radius as Record<string, string>)) {
        html?.style.setProperty(`--border-radius-${name}`, value)
      }
    }

    if (tokens.fontSize) {
      for (const [name, value] of Object.entries(tokens.fontSize as Record<string, string>)) {
        html?.style.setProperty(`--font-${name}`, value)
      }
    }

    if (tokens.fontWeight) {
      for (const [name, value] of Object.entries(tokens.fontWeight as Record<string, number>)) {
        html?.style.setProperty(`--font-weight-${name}`, `${value}00`)
      }
    }

    if (tokens.sizes) {
      for (const [name, value] of Object.entries(tokens.sizes as Record<string, string>)) {
        html?.style.setProperty(`--size-${name}`, value)
      }
    }

    if (tokens.zIndex) {
      for (const [name, value] of Object.entries(tokens.zIndex as Record<string, string | number>)) {
        html?.style.setProperty(`--zindex-${name}`, String(value))
      }
    }

    if (tokens.borderWidth) {
      for (const [name, value] of Object.entries(tokens.borderWidth as Record<string, string>)) {
        html?.style.setProperty(`--border-${name}`, value)
      }
    }

    if (tokens.colors) {
      for (const [colorName, colorList] of Object.entries(tokens.colors as Record<string, string[]>)) {
        if (Array.isArray(colorList)) {
          for (let i = 0; i < colorList.length; i++) {
            html?.style.setProperty(`--toyar-${colorName}-${i + 1}`, colorList[i])
          }
        }
      }
    }

    if (tokens.themeColorMap) {
      for (const [name, value] of Object.entries(tokens.themeColorMap as Record<string, string>)) {
        if (typeof value === 'string') {
          for (let i = 1; i <= 7; i++) {
            html?.style.setProperty(`--${name}-${i}`, `var(--toyar-${value}-${i})`)
          }
        }
      }
    }

    if (tokens.shadow) {
      for (const [level, value] of Object.entries(tokens.shadow as Record<string, string>)) {
        html?.style.setProperty(`--shadow-${level}`, value)
      }
    }

    if (tokens.bg) {
      for (let i = 0; i < (tokens.bg as string[]).length; i++) {
        html?.style.setProperty(`--bg-${i + 1}`, (tokens.bg as string[])[i])
      }
    }

    if (tokens.textLevels) {
      for (const [level, value] of Object.entries(tokens.textLevels as Record<string, number>)) {
        html?.style.setProperty(`--text-${level}`, `var(--toyar-gray-${value})`)
      }
    }

    if (tokens.borderLevels) {
      for (const [level, value] of Object.entries(tokens.borderLevels as Record<string, number>)) {
        html?.style.setProperty(`--border-color-${level}`, `var(--toyar-gray-${value})`)
      }
    }
  }

  const observer = new MutationObserver(() => {
    const currentTheme = html?.getAttribute('toyar-theme')
    if (nowColor !== currentTheme) {
      nowColor = currentTheme
      changeParmary()
      applyTokens(props.tokens)
    }
  })

  observer.observe(html!, {
    childList: false,
    subtree: false,
    attributes: true
  })

  watch(
    () => props.options.resetPrimary,
    () => {
      changeParmary()
    }
  )

  watch(
    () => props.tokens,
    (newTokens) => {
      applyTokens(newTokens)
    },
    { deep: true }
  )

  onMounted(() => {
    applyTokens(props.tokens)
  })

  onBeforeUnmount(() => {
    observer.disconnect()
  })
}
