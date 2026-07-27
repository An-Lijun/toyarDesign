import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm } = createComponentContext({
  name: 'waterMark',
  props: {
    /** 水印信息 */
    markInfo: {
      type: [String, Array],
      required: true
    },
    /** 水印配置选项 */
    options: {
      type: Object
    }
  }
})

export const defaultOptions = {
  fontColor: 'rgba(210,210,230,0.7)',
  fontSize: 30,
  fontSizeSed: 25,
  fontFamily: 'Arial',
  zIndex: 999,
  width: 200,
  height: 200,
  rotate: (-30 * Math.PI) / 180,
  offsetX: 0,
  offsetY: 0,
  antiTamper: false
}
