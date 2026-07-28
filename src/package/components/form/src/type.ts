import TyForm from './form.vue'
import type { IfieldList, TerrList } from '../type'

export type TyFormInstance = InstanceType<typeof TyForm>

export interface FormItemData {
  formItemError: {
    value: {
      isShowErrorMsg: boolean
      errorMsg: string
    }
  }
  validateFnLs: Array<Function>
}

export interface UseFormReturn {
  fieldList: IfieldList
  formID: string
  addValidate: (prop: string, formItemData: FormItemData, clearValidate: Function) => void
  removeValidate: (prop: string) => void
  validateAll: () => Promise<string>
  validate: (prop: string) => Promise<string>
  clearValidateAll: () => void
  clearValidate: (prop: string) => void
  scrollTo: (propId: string) => void
  formContentProvide: FormContentProvide
}

export interface FormContentProvide {
  formData: Record<string, any>
  rules: Record<string, any>
  labelWidth: string
  labelSuffix: string
  labelPosition?: string
  size?: string
  disabled?: boolean
  readonly?: boolean
  layout: string
  validate: (prop: string) => Promise<string>
  addValidate: (prop: string, formItemData: FormItemData, clearValidate: Function) => void
  validateAll: () => Promise<string>
  removeValidate: (prop: string) => void
  formID: string
}
