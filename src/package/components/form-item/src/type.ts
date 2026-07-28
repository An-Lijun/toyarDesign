import TyFormItem from './form-item.vue'
import { type Ref } from 'vue'
import type { FormContentProvide } from '../../form/src/type'

export type TyFormItemInstance = InstanceType<typeof TyFormItem>

export interface FormItemError {
  isShowErrorMsg: boolean
  errorMsg: string
}

export interface UseFormItemReturn {
  tyForm: FormContentProvide | null
  formItemError: Ref<FormItemError>
  isRequire: Ref<boolean>
  isColon: Ref<boolean>
  clearValidate: () => void
  prop: Ref<string | undefined>
}
