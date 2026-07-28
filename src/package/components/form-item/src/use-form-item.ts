import { inject, onMounted, toRefs, provide, ref, onBeforeUnmount } from 'vue'
import { formContent, formItemContent } from '../../../hooks/symbolNm'
import generatorValidate from './index'
import type { UseFormItemReturn } from './type'

/**
 * FormItem 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @returns {UseFormItemReturn} 返回表单项相关状态和方法
 */
export default function useFormItem(props: Record<string, any>): UseFormItemReturn {
  const tyForm = inject(formContent, null)

  const formItemError = ref({
    isShowErrorMsg: false,
    errorMsg: ''
  })
  const isRequire = ref(false)
  const isColon = ref(true)
  const { prop } = toRefs(props)

  const clearValidate = () => {
    formItemError.value.isShowErrorMsg = false
    formItemError.value.errorMsg = ''
  }

  onMounted(() => {
    if (prop && tyForm && Object.keys(tyForm.rules).includes(prop.value)) {
      tyForm.addValidate(
        prop.value,
        generatorValidate(tyForm.rules[prop.value], formItemError, isRequire, tyForm, prop),
        clearValidate
      )
    }
  })

  onBeforeUnmount(() => {
    if (tyForm && prop?.value) {
      tyForm.removeValidate(prop.value)
    }
  })

  provide(formItemContent, {
    ...props,
    formItemError: formItemError.value
  })

  return {
    tyForm,
    formItemError,
    isRequire,
    isColon,
    clearValidate,
    prop
  }
}
