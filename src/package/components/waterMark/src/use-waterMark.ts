import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps, defaultOptions } from './context'
import xss from 'xss'
import { debounce } from 'robinson'
import { URL_REGULAR_EXPRESSION, PICTURE_EXPRESSION } from '../../../utils/regular'
import { type UseWaterMarkReturn } from './type'

/**
 * WaterMark 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @returns {UseWaterMarkReturn} 返回水印相关引用
 */
export default function useWaterMark(
  props: ExtractPropTypes<typeof useProps>
): UseWaterMarkReturn {
  const OFFSET_MULTIPLIER = 1.5
  const DEBOUNCE_DELAY = 1500
  let url: string
  let mutOb: MutationObserver | null = null

  const options = Object.assign({}, defaultOptions, props.options)
  if (!options.width || !options.height) {
    throw new Error('Width and height must be provided in options')
  }

  const canvas = document.createElement('canvas')
  canvas.width = options.width
  canvas.height = options.height
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = options.fontColor
  ctx.font = `${options.fontSize}px ${options.fontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.translate(options.width / 2, options.height / 2)
  ctx.rotate(options.rotate)

  const mark = ref<HTMLElement | null>(null)
  const maskContainer = ref<HTMLElement | null>(null)

  const isImageByReg = (str: string, type = 'http') => {
    if (type === 'http') {
      return PICTURE_EXPRESSION.test(str)
    } else {
      return URL_REGULAR_EXPRESSION.test(str)
    }
  }

  const isImageByDom = (str: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = document.createElement('img')
      img.onerror = () => reject(new Error('Image does not exist'))
      img.onload = () => resolve(img)
      img.src = str
    })
  }

  const setUrl = () => {
    if (mark.value) {
      mark.value.style.backgroundImage = `url(${url})`
    }
  }

  const createMark = async () => {
    if (!props.markInfo) {
      throw new Error('markInfo is required')
    }

    if (Array.isArray(props.markInfo)) {
      if (props.markInfo.length < 2) {
        console.warn('markInfo array should have at least two elements')
      }
      ctx.fillText(
        xss(props.markInfo[0] || '', { whiteList: {} }),
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
        console.error('Failed to load image:', (error as Error).message)
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

  const createMarkDeb = debounce(createMark, DEBOUNCE_DELAY, true)

  mutOb = new MutationObserver((records) => {
    for (const record of records) {
      if (record.target === mark.value) {
        if (record.attributeName === 'style') {
          mark.value!.style.display = 'block'
          mark.value!.style.opacity = '1'
          setUrl()
        }
      } else if (record.removedNodes && record.removedNodes[0] === mark.value) {
        createMarkDeb()
      }
    }
  })

  onMounted(() => {
    if (options.antiTamper && mark.value) {
      mutOb!.observe(mark.value, {
        childList: false,
        attributes: true,
        attributeFilter: ['style'],
        subtree: true
      })
    }
    createMarkDeb()
  })

  onBeforeUnmount(() => {
    if (mutOb) {
      mutOb.disconnect()
    }
  })

  return {
    mark,
    maskContainer
  }
}
