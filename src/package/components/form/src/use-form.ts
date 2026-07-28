import { provide } from 'vue'
import { getUniqueId } from 'robinson'
import { formContent } from '../../../hooks/symbolNm'
import type { IfieldList, TerrList } from '../type'
import type { UseFormReturn, FormContentProvide, FormItemData } from './type'

export type { FormContentProvide }

/**
 * Form 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @returns {UseFormReturn} 返回表单相关状态和方法
 */
export default function useForm(props: Record<string, any>): UseFormReturn {
  const fieldList: IfieldList = {}
  const formID = getUniqueId()

  function addValidate(prop: string, formItemData: FormItemData, clearValidate: Function) {
    fieldList[prop] = {
      formItemData,
      clearValidate
    }
  }

  function removeValidate(prop: string) {
    delete fieldList[prop]
  }

  function validateAll() {
    return new Promise((resolve, reject) => {
      const errList: TerrList = []
      Object.keys(fieldList).forEach(key => {
        const { formItemData: { formItemError, validateFnLs } } = fieldList[key]
        const len = validateFnLs.length
        for (let index = 0; index < len; index++) {
          const data = validateFnLs[index](key)
          if (data) {
            formItemError.value.isShowErrorMsg = true
            formItemError.value.errorMsg = data
            return errList.push(data)
          }
        }
      })
      if (errList.length > 0) {
        return reject(errList)
      }
      resolve('sucess')
    })
  }

  function validate(prop: string) {
    return new Promise((resolve, reject) => {
      const fns = fieldList[prop].formItemData.validateFnLs
      if (!fns.length) {
        resolve('success')
      }
      const errList = []
      for (let index = 0; index < fns.length; index++) {
        const data = fns[index](prop)
        if (data) {
          errList.push(data)
          if (errList.length > 0) {
            return reject(...errList, prop)
          }
        }
        return resolve(prop)
      }
    })
  }

  function clearValidateAll() {
    let keys = Object.keys(fieldList)
    keys.forEach(key => {
      fieldList[key].clearValidate()
    })
  }

  function clearValidate(prop: string) {
    fieldList[prop].clearValidate()
  }

  function scrollTo(propId: string) {
    const el = document.getElementById(`${formID}_${propId}`)
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  const formContentProvide: FormContentProvide = {
    ...props,
    validate,
    addValidate,
    validateAll,
    removeValidate,
    formID
  }

  provide(formContent, formContentProvide)

  return {
    fieldList,
    formID,
    addValidate,
    removeValidate,
    validateAll,
    validate,
    clearValidateAll,
    clearValidate,
    scrollTo,
    formContentProvide
  }
}
