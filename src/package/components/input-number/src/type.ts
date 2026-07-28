import TyInputNumber from './input-number.vue'
import { type ComputedRef } from 'vue'

export type TyInputNumberInstance = InstanceType<typeof TyInputNumber>

export interface UseInputNumberReturn {
  attrs: Record<string, any>
  maxlength: ComputedRef<any>
  handleFocus: () => void
  handleClear: () => void
  handleBlur: (bo: boolean) => void
  handleMinus: () => void
  handleAdd: () => void
  handleInput: (value: number) => void
}
