import TySwitch from './switch.vue'
import { type ComputedRef } from 'vue'

export type TySwitchInstance = InstanceType<typeof TySwitch>

export interface UseSwitchReturn {
  isOpen: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  click: () => void
}
