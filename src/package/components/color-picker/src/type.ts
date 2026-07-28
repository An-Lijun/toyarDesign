import TyColorPicker from './colorPicker.vue'
import { type Ref } from 'vue'

export type TyColorPickerInstance = InstanceType<typeof TyColorPicker>

export interface UseColorPickerReturn {
  wrapRef: Ref<any>
  wrapDraggerRef: Ref<any>
  hueDraggerRef: Ref<any>
  alphaDraggerRef: Ref<any>
  alphaRef: Ref<any>
  containerRef: Ref<any>
  popRef: Ref<any>
  isShowColor: Ref<boolean>
  color: Ref<any>
  colorFormat: Ref<any>
  handleClick: (e: Event) => void
  close: () => void
  initPopper: () => void
}
