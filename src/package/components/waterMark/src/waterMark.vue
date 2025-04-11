<template>
  <div :class="nm.b()" ref="maskContainer">
    <div :class="nm.e('mark')" ref="mark"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { waterProps, nm, defaultOptions } from './context'
import xss from 'xss'
import useDebounce from '../../../hooks/useDebounce'
import { URL_REGULAR_EXPRESSION, PICTURE_EXPRESSION } from '../../../utils/regular'

defineOptions({
  name: 'TyWaterMark'
})

const props = defineProps(waterProps)
// 提取常量
const OFFSET_MULTIPLIER = 1.5
const DEBOUNCE_DELAY = 1500
let url,mutOb

// 合并默认选项和用户选项，并进行校验
const options = Object.assign({}, defaultOptions, props.options)
if (!options.width || !options.height) {
  throw new Error('Width and height must be provided in options')
}
// 创建 Canvas 和上下文
const canvas = document.createElement('canvas')
canvas.width = options.width
canvas.height = options.height
const ctx = canvas.getContext('2d')
ctx.fillStyle = options.fontColor
ctx.font = `${options.fontSize}px ${options.fontFamily}`
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.translate(options.width / 2, options.height / 2)
ctx.rotate(options.rotate)

const mark = ref()
const maskContainer = ref()

// 定义正则匹配函数
const isImageByReg = (str, type = 'http') => {
  if (type === 'http') {
    return PICTURE_EXPRESSION.test(str)
  } else {
    return URL_REGULAR_EXPRESSION.test(str)
  }
}

const isImageByDom = str => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onerror = () => reject(new Error('Image does not exist'))
    img.onload = () => resolve(img)
    img.src = str
  })
}
// 设置背景图片
const setUrl = () => {
  mark.value.style.backgroundImage = `url(${url})`
}

// 创建水印
const createMark = async () => {
  if (!props.markInfo) {
    throw new Error('markInfo is required')
  }

  if (Array.isArray(props.markInfo)) {
    if (props.markInfo.length < 2) {
      console.warn('markInfo array should have at least two elements')
    }
    ctx.fillText(
      xss(props.markInfo[0] || '', { whiteList: {} }), // 确保 xss 配置严格
      options.offsetX,
      options.offsetY - options.fontSize / OFFSET_MULTIPLIER
    )
    ctx.font = `${options.fontSizeSed}px ${options.fontFamily}`
    ctx.fillText(
      xss(props.markInfo[1] || '', { whiteList: {} }),
      options.offsetX,
      options.offsetY + options.fontSize / OFFSET_MULTIPLIER
    )
  } else {
    try {
      const img = await isImageByDom(props.markInfo)
      ctx.drawImage(
        img,
        -options.width / 2,
        -options.height / 2,
        options.width,
        options.height
      )
    } catch (error) {
      console.error('Failed to load image:', error.message)
      ctx.fillText(
        xss(props.markInfo, { whiteList: {} }),
        options.offsetX,
        options.offsetY
      )
    }

  }
  url = canvas.toDataURL('image/png')
  setUrl()
}

// 防抖处理
const createMarkDeb = useDebounce(createMark, DEBOUNCE_DELAY, true)

// MutationObserver 监听
 mutOb = new MutationObserver(records => {
  for (const record of records) {
    if (record.target === mark.value) {
      if (record.attributeName === 'style') {
        mark.value.style.display = 'block'
        mark.value.style.opacity = '1'
        setUrl()
      }
    } else if (record.removedNodes && record.removedNodes[0] === mark.value) {
      createMarkDeb()
    }
  }
})

onMounted(() => {
  if (options.antiTamper) {
    mutOb.observe(mark.value, {
      childList: false,
      attributes: true,
      attributeFilter: ['style'], // 仅监听 style 属性变化
      subtree: true
    })
  }
  createMarkDeb()
})

onBeforeUnmount(() => {
  if(mutOb){
    mutOb.disconnect()
  }
})
</script>
<style lang="scss" scoped>
.ty-waterMark {
  position: relative;
  height: 100%;

  &__mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
  }
}
</style>
