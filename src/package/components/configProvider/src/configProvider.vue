<template>
  <div :class="nm.b()">
    <slot />
  </div>
</template>
<script setup>
import { configProps, nm } from './context'
// import light from './light.module.scss'
// import dark from './dark.module.scss'
import generate from '../../../color/index.js'
import { ref, watch, onMounted } from 'vue'
defineOptions({
  name: 'TyConfigProvider'
})
const props = defineProps(configProps)
// let defaultColor = {
//   light,
//   dark
// }
let html = document.querySelector('html')
let nowColor = html.getAttribute('toyar-theme')


const changeParmary = (newVal = props.options.resetPrimary) => {
  let value = newVal
  let theme = html.getAttribute('toyar-theme')
  let arr = generate(value, { list: true, dark: theme === 'dark' ? true : false })
  let len = arr.length;
  for (let index = 0; index < len; index++) {
    html.style.setProperty(`--primary-${index + 1}`, arr[index])
  }
}

const applyTokens = (tokens) => {
  if (!tokens || typeof tokens !== 'object') return

  if (tokens.radius) {
    for (const [name, value] of Object.entries(tokens.radius)) {
      html.style.setProperty(`--border-radius-${name}`, value)
    }
  }

  if (tokens.fontSize) {
    for (const [name, value] of Object.entries(tokens.fontSize)) {
      html.style.setProperty(`--font-${name}`, value)
    }
  }

  if (tokens.fontWeight) {
    for (const [name, value] of Object.entries(tokens.fontWeight)) {
      html.style.setProperty(`--font-weight-${name}`, `${value}00`)
    }
  }

  if (tokens.sizes) {
    for (const [name, value] of Object.entries(tokens.sizes)) {
      html.style.setProperty(`--size-${name}`, value)
    }
  }

  if (tokens.zIndex) {
    for (const [name, value] of Object.entries(tokens.zIndex)) {
      html.style.setProperty(`--zindex-${name}`, value)
    }
  }

  if (tokens.borderWidth) {
    for (const [name, value] of Object.entries(tokens.borderWidth)) {
      html.style.setProperty(`--border-${name}`, value)
    }
  }

  if (tokens.colors) {
    for (const [colorName, colorList] of Object.entries(tokens.colors)) {
      if (Array.isArray(colorList)) {
        for (let i = 0; i < colorList.length; i++) {
          html.style.setProperty(`--toyar-${colorName}-${i + 1}`, colorList[i])
        }
      }
    }
  }

  if (tokens.themeColorMap) {
    for (const [name, value] of Object.entries(tokens.themeColorMap)) {
      if (typeof value === 'string') {
        for (let i = 1; i <= 7; i++) {
          html.style.setProperty(`--${name}-${i}`, `var(--toyar-${value}-${i})`)
        }
      }
    }
  }

  if (tokens.shadow) {
    for (const [level, value] of Object.entries(tokens.shadow)) {
      html.style.setProperty(`--shadow-${level}`, value)
    }
  }

  if (tokens.bg) {
    for (let i = 0; i < tokens.bg.length; i++) {
      html.style.setProperty(`--bg-${i + 1}`, tokens.bg[i])
    }
  }

  if (tokens.textLevels) {
    for (const [level, value] of Object.entries(tokens.textLevels)) {
      html.style.setProperty(`--text-${level}`, `var(--toyar-gray-${value})`)
    }
  }

  if (tokens.borderLevels) {
    for (const [level, value] of Object.entries(tokens.borderLevels)) {
      html.style.setProperty(`--border-color-${level}`, `var(--toyar-gray-${value})`)
    }
  }
}

const observer = new MutationObserver(mutations => {
  if (nowColor !== html.getAttribute('toyar-theme')) {
    nowColor = html.getAttribute('toyar-theme')
    changeParmary()
    applyTokens(props.tokens)
  }
});
observer.observe(html, {
  childList: false, // 监视元素 第一级直接子节点 的变动
  subtree: false, // 监视元素 所有后代节点 的变动（前提要求 childList = true）
  attributes: true, // 监视元素 属性 的变动
});

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
</script>
<style lang="less" scoped></style>