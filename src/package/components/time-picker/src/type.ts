import TyTimePicker from './timePicker.vue'
import { type Ref, type ComputedRef } from 'vue'

export type TyTimePickerInstance = InstanceType<typeof TyTimePicker>

export interface UseTimePickerReturn {
  attrs: Record<string, any>
  tyForm: any
  tyFormItem: any
  popRef: Ref<any>
  arrowRef: Ref<any>
  containerRef: Ref<any>
  isShowTimePicker: Ref<boolean>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  size: ComputedRef<string>
  hours: Ref<number>
  minutes: Ref<number>
  seconds: Ref<number>
  value: Ref<number[]>
  focus: Ref<boolean>
  maxlength: Ref<any>
  selectHour: (val: number) => void
  selectMinute: (val: number) => void
  selectSecond: (val: number) => void
  confirm: () => void
  handleFocus: () => void
  handleInput: (event: Event) => void
  handleBlur: () => void
  handleClear: () => void
  formatTime: () => string
}
