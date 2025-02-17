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
      validateFnLs.push(
        (data: string) => {
          if (!tyForm.formData[data]) {
            return rule.message || `${data} is required`
          }
        }
      )
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
            return errMsg
          }
        }
        if (keys.includes('max') && is(rule.max, 'number')) {
          if (`${tyForm.formData[data]}`.length >= (rule.max as number)) {
            return errMsg
          }
        }
      })
    }
    if (keys.includes('validate')) {
      validateFnLs.push((data: string) => {
        let result
        const cb = (data: string) => {
          if (data) {
            result = data
          }
        }
        rule.validate && rule.validate(tyForm.formData[data] || '', cb)
        return result
      })
    }
  })


  return {
    formItemError,
    validateFnLs
  }
}