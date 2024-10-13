type RuleObj = {
  required?: Boolean,
  message?: string
  trigger?: Array<string>,
  min?: number,
  max?: number,
  validate?: Function
}
import { is } from "../../../utils/is"
import type { Ref } from "vue"
import type { FormProps } from '../../form/src/context'
import type { FormContentProvide } from '../../form/src/form.vue'
export default function generatorValidate(rules: Array<RuleObj>, formItemError: Ref, isRequire: Ref, tyForm: FormContentProvide, prop: FormProps) {
  const validateFnLs: Array<Function> = []
  rules.forEach((rule: RuleObj) => {
    let keys = Object.keys(rule)
    if (keys.includes('required')) {
      isRequire.value = true
      validateFnLs.push((data: string) => {
        // return new Promise((resolve, reject) => {
        if (!tyForm.formData[data]) {
          formItemError.value.isShowErrorMsg = true
          formItemError.value.errorMsg = rule.message || `${data} is required`
          return prop.value
        }
        formItemError.value.isShowErrorMsg = false
        // resolve()
        // })
      })
    }
    if (keys.includes('min') || keys.includes('max')) {
      validateFnLs.push((data: string) => {
        let errMsg = ''
        if (keys.includes('min')) {
          errMsg += rule.message || `${data} length must > ${rule.min}`
        }
        if (keys.includes('max')) {
          if (keys.includes('min')) {
            errMsg += ' and '
          }
          errMsg += rule.message || `${data} length must < ${rule.max}`
        }
        if (keys.includes('min') && is(rule.min, 'number')) {
          if (`${tyForm.formData[data]}`.length <= (rule.min as number)) {
            formItemError.value.isShowErrorMsg = true
            formItemError.value.errorMsg = errMsg
            return prop.value
          }
        }
        if (keys.includes('max') && is(rule.max, 'number')) {
          if (`${tyForm.formData[data]}`.length >= (rule.max as number)) {
            formItemError.value.isShowErrorMsg = true
            formItemError.value.errorMsg = errMsg
            return prop.value
          }
        }
        formItemError.value.isShowErrorMsg = false
      })
    }
    if (keys.includes('validate')) {
      const cb = (data: string) => {
        if (!data) {
          formItemError.value.isShowErrorMsg = false
          formItemError.value.errorMsg = ''
          return
        }
        formItemError.value.isShowErrorMsg = true
        formItemError.value.errorMsg = data
        return prop.value
      }
      validateFnLs.push((data: string) => {
         rule.validate && rule.validate(tyForm.formData[data] || '', cb)
      })
    }
  })
  return validateFnLs
}