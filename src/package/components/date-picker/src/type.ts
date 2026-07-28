import TyDatePicker from './datePicker.vue'
import { type Ref, type ComputedRef } from 'vue'

export type TyDatePickerInstance = InstanceType<typeof TyDatePicker>

export interface UseDatePickerReturn {
  model: Ref<string>
  focus: Ref<boolean>
  isShowDatePicker: Ref<boolean>
  formatValue: Ref<string>
  disabled: ComputedRef<boolean>
  readonly: ComputedRef<boolean>
  size: ComputedRef<string>
  opType: ComputedRef<any>
  popRef: Ref<any>
  arrowRef: Ref<any>
  containerRef: Ref<any>
  tyForm: any
  tyFormItem: any
  handleInput: (value: string) => void
  handleFocus: () => void
  handleBlur: (isFocus: boolean) => void
  handleClear: () => void
  selectData: (data: string) => void
  formatTime: (timestamp: string | Date) => string
  maxlength: number
  attrs: Record<string, any>
}
