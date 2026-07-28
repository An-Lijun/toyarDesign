import TyInputPassword from './input-password.vue'
import { type Ref, type ComputedRef } from 'vue'

export type TyInputPasswordInstance = InstanceType<typeof TyInputPassword>

export interface UseInputPasswordReturn {
  attrs: Record<string, any>
  nativeInp: Ref<any>
  innerAft: Ref<any>
  focus: Ref<boolean>
  innerPreWidth: Ref<number>
  innerAftWidth: Ref<number>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  size: ComputedRef<string>
  isPassworld: Ref<boolean>
  isShowClearBtn: ComputedRef<boolean>
  tyForm: any
  tyFormItem: any
  handleInput: (event: Event) => void
  handleToFocus: () => void
  handleBlur: (event: Event) => void
  handleClear: () => void
  handleEnter: () => void
  handleFocus: () => void
}
