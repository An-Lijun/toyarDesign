<template>
  <div :class="nm.b()" ref="maskContainer">
    <div :class="nm.e('mark')" ref="mark" ></div>
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
let url

const options = Object.assign({}, defaultOptions, props.options)
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

const isImageByReg = (str, type = 'http') => {
  if (type === 'http') {
    return PICTURE_EXPRESSION.test(str)
  } else {
    return URL_REGULAR_EXPRESSION.test(str)
  }
}

const isImageByDom = str => {
  let img = document.createElement('img')
  img.src = str
  return new Promise(function (resolve, reject) {
    img.onerror = () => {
      reject('img is not exist')
    }
    img.onload = () => {
      resolve(img)
    }
  })
}
const setUrl = () => {
  mark.value.style.backgroundImage = `url(${url})`
}


const createMark = async () => {
  if(!props.markInfo){
    throw new Error('markInfo is required')
  }

  if (Array.isArray(props.markInfo)) {
    ctx.fillText(
      xss(props.markInfo[0] || ''),
      options.offsetX,
      options.offsetY - options.fontSize / 1.5
    )
    ctx.font = `${options.fontSizeSed}px ${options.fontFamily}`
    ctx.fillText(
      xss(props.markInfo[1] || ''),
      options.offsetX,
      options.offsetY + options.fontSize / 1.5
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
      ctx.fillText(
        xss(props.markInfo),
        options.offsetX,
        options.offsetY
      )
    }

  }
  url =canvas.toDataURL('image/png')
  setUrl()
}

const createMarkDeb = useDebounce(createMark, 1500, true)

let mutOb = new MutationObserver(records => {
  records.forEach(el => {
    if (el.target === mark.value) {
      mark.value.style.display = 'block'
      mark.value.style.opacity = '1'
      setUrl()
    }
    if (el.removedNodes[0] === mark.value) {
      createMarkDeb()
    }
  })
})

onMounted(() => {
  if (options.antiTamper) {
    mutOb.observe(mark.value, {
      childList: false,
      attributes: true,
      subtree: true
    })
  }
  createMarkDeb()
})

onBeforeUnmount(() => {
  mutOb.disconnect();
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
