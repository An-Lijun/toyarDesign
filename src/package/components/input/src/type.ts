import TyInput from './input.vue'
import { type Ref, type ComputedRef, type Reactive } from 'vue'

export type TyInputInstance = InstanceType<typeof TyInput>

export interface UseInputReturn {
  attrs: Record<string, any>
  limitBlock: Ref<any>
  nativeInp: Ref<any>
  outPre: Ref<any>
  innerPre: Ref<any>
  outAft: Ref<any>
  innerAft: Ref<any>
  nativeFormatInp: Ref<any>
  focus: Ref<boolean>
  outPreWidth: Ref<number>
  formatValue: Ref<string>
  limitBlockWidth: Ref<number>
  innerPreWidth: Ref<number>
  outAftWidth: Ref<number>
  innerAftWidth: Ref<number>
  isShowFormatSelf: Ref<boolean>
  isShowFormat: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  size: ComputedRef<string>
  isShowClearBtn: ComputedRef<boolean>
  inputClass: ComputedRef<any[]>
  tyForm: any
  tyFormItem: any
  handleInput: (event: Event) => void
  handleToFocus: () => void
  handleBlur: (event: Event) => void
  handleClear: () => void
  handleEnter: () => void
  model: Ref<string>
  provideInp: Reactive<any>
}
