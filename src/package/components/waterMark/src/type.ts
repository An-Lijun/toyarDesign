import TyWaterMark from './waterMark.vue'
import { type Ref } from 'vue'

export type TyWaterMarkInstance = InstanceType<typeof TyWaterMark>

export interface UseWaterMarkReturn {
  mark: Ref<HTMLElement | null>
  maskContainer: Ref<HTMLElement | null>
}
