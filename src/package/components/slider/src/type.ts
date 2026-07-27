import TySlider from './slider.vue'
import { type Ref } from 'vue'

export type TySliderInstance = InstanceType<typeof TySlider>

export interface UseSliderReturn {
  model: Ref<string | number>
  style: Ref<Record<string, string>>
  bollStyle: Ref<Record<string, string>>
  sliderBox: Ref<HTMLElement | null>
  tyboll: Ref<HTMLElement | null>
  slider: (e: MouseEvent) => void
}
