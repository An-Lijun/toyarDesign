<template>
  <div :class="[nm.b(), nm.is('require', isShowStar && isRequire), nm.is('colon', isColon)]" :id="`${tyForm?.formID}_${prop}`">
    <label :class="[nm.e('label')]" :style="{
      display: 'block',
      wordBreak: 'break-all',
      width: `${tyForm?.labelWidth}px`,
      minWidth: `${tyForm?.labelWidth}px`
    }">
      <slot name="label">
        {{ label }}
      </slot>
      <span class="after">
        {{ tyForm?.labelSuffix }}
      </span>
    </label>
    <div :class="nm.e('content')">
      <slot></slot>
      <div v-show="formItemError.isShowErrorMsg" :class="nm.e('tip')" :style="{
        maxWidth: `calc(100% - ${tyForm?.labelWidth}px)`
      }">
        {{ formItemError.errorMsg }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { nm, useProps, useEmits } from './context'
import useFormItem from './use-form-item'

defineOptions({
  name: 'TyFormItem'
})

const props = defineProps(useProps)
defineEmits(useEmits)

const { tyForm, formItemError, isRequire, isColon, prop } = useFormItem(props)
</script>
