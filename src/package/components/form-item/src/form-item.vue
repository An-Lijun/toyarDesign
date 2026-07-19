<template>
  <div :class="[nm.b(), nm.is('require', isShowStar&&isRequire), nm.is('colon', isColon)]" :id="`${tyForm.formID}_${prop}`">
    <label :class="[nm.e('label')]" :style="{
      display: 'block',
      wordBreak: 'break-all',
      width: `${tyForm.labelWidth}px`,
      minWidth: `${tyForm.labelWidth}px`
    }">
      <slot name="label">
        {{ label }}
      </slot>
      <span class="after">
        {{ tyForm.labelSuffix }}
      </span>
    </label>
    <div :class="nm.e('content')">
      <slot></slot>
      <div v-show="formItemError.isShowErrorMsg" :class="nm.e('tip')" :style="{
        maxWidth: `calc(100% - ${tyForm.labelWidth}px)`
      }">
        {{ formItemError.errorMsg }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { formContent, formItemContent } from '../../../hooks/symbolNm'
import { inject, onMounted, toRefs, provide, ref, onBeforeUnmount } from 'vue'
import { nm, itemProps } from './context'
import generatorValidate from './index'
defineOptions({
  name: 'TyFormItem'
})
const tyForm = inject(formContent, null)

const props = defineProps(itemProps)

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
  if (prop && Object.keys(tyForm.rules).includes(prop.value)) {
    tyForm.addValidate(
      prop.value,
      generatorValidate(tyForm.rules[prop.value], formItemError, isRequire, tyForm, prop),
      clearValidate
    )
  }
})
onBeforeUnmount(() => {
  tyForm.removeValidate(prop.value)
})
provide(formItemContent, {
  ...props,
  formItemError: formItemError.value
})

</script>
