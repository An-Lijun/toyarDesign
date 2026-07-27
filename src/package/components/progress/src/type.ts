import TyProgress from './progress.vue'
import { type Ref } from 'vue'

export type TyProgressInstance = InstanceType<typeof TyProgress>

export interface UseProgressReturn {
  model: Ref<string | number>
  style: Ref<Record<string, string>>
}
