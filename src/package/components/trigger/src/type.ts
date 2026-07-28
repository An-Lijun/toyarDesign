import TyTrigger from './trigger.vue'
import { type Ref } from 'vue'

export type TyTriggerInstance = InstanceType<typeof TyTrigger>

export interface UseTriggerReturn {
  defaultSlot: Ref<any>
  eventMaps: Ref<Record<string, any>>
  isShowConfirm: Ref<boolean>
  style: Ref<any>
}
