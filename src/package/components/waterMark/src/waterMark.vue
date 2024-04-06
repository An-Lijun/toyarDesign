<template>
  <div :class="nm.b()" ref="maskContainer">
    <div
      :class="nm.e('mark')"
      ref="mark"
      :style="{
        backgroundImage: `${bgUrl}`
      }"
    ></div>
    <slot></slot>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { waterProps, nm } from './context'
defineOptions({
  name:'TyWaterMark'
})
const props = defineProps(waterProps)
const defaultOptions = {
  fontColor: 'rgba(210,210,230,0.7)',
  fontSize: 30,
  fontFamily: 'Arial',
  zIndex: 999,
  width: 200,
  height: 200,
  rotate: (-30 * Math.PI) / 180,
  offsetX: 0,
  offsetY: 0,
  antiTamper: false
}
const options = Object.assign(defaultOptions, props.options)
const bgUrl = ref('')
const mark = ref()
const maskContainer = ref()
const isImageByReg = (str, type = 'http') => {
  //尾缀是图片
  const PICTURE_EXPRESSION = /\.(png|jpe?g|gif|svg)(\?.*)?$/
  //http
  const URL_REGULAR_EXPRESSION =
    /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
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
      reject(undefined)
    }
    img.onload = () => {
      resolve(img)
    }
  })
}
//--------------
const setUrl = img => {
  bgUrl.value = `url(${img})`
}
const createMark = () => {
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
  if (Array.isArray(props.markInfo)) {
    ctx.fillText(
      props.markInfo[0],
      options.offsetX,
      options.offsetY - options.fontSize / 2
    )
    ctx.fillText(
      props.markInfo[1],
      options.offsetX,
      options.offsetY + options.fontSize / 2
    )
    setUrl(canvas.toDataURL('image/png'))
  } else {
    isImageByDom(props.markInfo)
      .then(img => {
        ctx.drawImage(
          img,
          -options.width / 2,
          -options.height / 2,
          options.width,
          options.height
        )
        setUrl(canvas.toDataURL('image/png'))
      })
      .catch(() => {
        ctx.fillText(
          props.markInfo,
          defaultOptions.offsetX,
          defaultOptions.offsetY
        )
        setUrl(canvas.toDataURL('image/png'))
      })
  }
}
let mutOb = new MutationObserver(records => {
  records.forEach(el => {
    if (el.target === mark.value) {
      mark.value.style.display = 'block'
      mark.value.style.opacity = '1'
    }
    if (el.removedNodes[0] === mark.value) {
      createMark()
    }
  })
})
onMounted(() => {
  if (options.antiTamper) {
    mutOb.observe(maskContainer.value, {
      childList: true,
      attributes: true,
      subtree: true
    })
  }
}),
  createMark()
</script>
<style lang="scss" scoped>
.ty-waterMark {
  position: relative;
  &__mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
