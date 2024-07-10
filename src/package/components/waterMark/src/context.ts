import { buildProps } from '@/package/utils/buildProps';
import useNmSpace from '../../../hooks/useBem';
export const waterProps =buildProps({
  markInfo: {
    type: [String,Array],
    required: true
  },
  options: {
    type: Object
  }
})
export const nm =useNmSpace('waterMark')

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
Object.defineProperty
