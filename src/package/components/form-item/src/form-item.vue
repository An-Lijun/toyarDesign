<template>
  <div :class="[nm.b(), nm.is('require', isRequire), nm.is('colon', isColon)]" :id="`${tyForm.formID}_${prop}`">
    <label :class="[nm.e('label')]" :style="{
    display: 'block',
    wordBreak: 'break-all',
    width: `${tyForm.labelWidth}px`,
    minWidth: `${tyForm.labelWidth}px`
  }">
      <slot name="label">
        {{ label }}
      </slot>
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
defineOptions({
  name: 'TyFormItem'
})
const tyForm = inject(formContent, null)
const formItemError = ref({
  isShowErrorMsg: false,
  errorMsg: ''
})
const props = defineProps(itemProps)
const isRequire = ref(false)
const isColon = ref(true)
const { prop } = toRefs(props)
provide(formItemContent, {
  ...props,
  formItemError: formItemError.value
})
const generatorValidate = rules => {
  const fnArr = []
  rules.forEach(rule => {
    let keys = Object.keys(rule)
    if (keys.includes('required')) {
      isRequire.value = true
      fnArr.push(data => {
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
      fnArr.push(data => {
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
        if (keys.includes('min')) {
          if (`${tyForm.formData[data]}`.length <= rule.min) {
            formItemError.value.isShowErrorMsg = true
            formItemError.value.errorMsg = errMsg
            return prop.value
          }
        }
        if (keys.includes('max')) {
          if (`${tyForm.formData[data]}`.length >= rule.max) {
            formItemError.value.isShowErrorMsg = true
            formItemError.value.errorMsg = errMsg
            return prop.value
          }
        }
        formItemError.value.isShowErrorMsg = false
      })
    }
    if (keys.includes('validate')) {
      const cb = data => {
        if (!data) {
          formItemError.value.isShowErrorMsg = false
          formItemError.value.errorMsg = ''
          return
        }
        formItemError.value.isShowErrorMsg = true
        formItemError.value.errorMsg = data
        return prop.value
      }
      fnArr.push(data => {
        rule.validate(tyForm.formData[data] || '', cb)
      })
    }
  })
  return fnArr
}
const clearValidate = () => {
  formItemError.value.isShowErrorMsg = false
  formItemError.value.errorMsg = ''
}
onMounted(() => {
  if (prop && Object.keys(tyForm.rules).includes(prop.value)) {
    console.log(prop.value,'-----------');
    
    tyForm.addValidate(
      prop.value,
      generatorValidate(tyForm.rules[prop.value]),
      clearValidate
    )
  }
})
onBeforeUnmount(() => {
  tyForm.removeValidate(prop.value)
})
</script>
<style lang="scss" scoped>
.ty-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;

  &__label {
    width: 100px;
    text-align: right;
    height: 100%;
  }


  &__content {
    flex: 1;
    width: 100%;

    .ty-form-item__tip {
      position: absolute;
      color: var(--toyar-red-6);
      font-size: 12px;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

}

.is-require {
  .ty-form-item__label:before {
    content: '*';
    color: var(--toyar-red-6);
    line-height: 100%;
  }
}

.is-colon {
  .ty-form-item__label:after {
    content: ': ';
    margin-right: 5px;
  }
}
</style>
