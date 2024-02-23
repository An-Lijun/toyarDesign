<template>
  <div class="ty-form-item">
    <label class="ty-form-label" 
    :style="{
      display: 'block',
      wordBreak: 'break-all',
      width: `${tyForm.labelWidth}px`,
      minWidth:`${tyForm.labelWidth}px`,
    }">
      <template v-if="tyForm.label">
        {{ tyForm.label }}
      </template>
      <slot name="label" v-else></slot>
    </label>
    <div class="ty-form-item-content">
      <slot></slot>
      <div v-show="formItemError.isShowErrorMsg" 
        class="ty-form-item-tip"
        :style="{
          maxWidth: `calc(100% - ${tyForm.labelWidth}px)`
        }"
      >
        {{ formItemError.errorMsg }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { formContent, formItemContent } from '../../hooks/symbolNm'
import { inject, onMounted, toRefs,provide,ref,onBeforeUnmount } from "vue";
const tyForm = inject(formContent);
const formItemError = ref({
  isShowErrorMsg: false,
  errorMsg: ''
})
const props = defineProps({
  prop: String,
})

const { prop } = toRefs(props)
provide(formItemContent, {
  ...props,
  formItemError:formItemError.value
})
const generatorValidate = (rules) => {
  const fnArr = [];
  rules.forEach(rule => {
    let keys = Object.keys(rule);
    if (keys.includes('required')) {
      fnArr.push(
        (data) => {
          // return new Promise((resolve, reject) => {
            if (!tyForm.formData[data]) {
              formItemError.value.isShowErrorMsg = true
              formItemError.value.errorMsg = rule.message || `${data} is required`
              return prop.value
            }
            formItemError.value.isShowErrorMsg = false
            // resolve()
          // })
        }
      )
    }
    if (keys.includes('min') || keys.includes('max')) {
      fnArr.push(
        (data) => {
          let errMsg = '';
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
        }
      )
    }
    if (keys.includes('validate')) {
        const cb = (data) => {
          if (!data) {
            formItemError.value.isShowErrorMsg = false
            formItemError.value.errorMsg = ''
            return
          }
          formItemError.value.isShowErrorMsg = true
          formItemError.value.errorMsg = data
          return prop.value
        }
        fnArr.push((data) => {
          rule.validate(tyForm.formData[data]||'', cb)
        })
    }
  });
  return fnArr
}
const clearValidate = () => {
  formItemError.value.isShowErrorMsg = false;
  formItemError.value.errorMsg = '';
}
onMounted(() => {
  if (prop && Object.keys(tyForm.rules).includes(prop.value)) {
    tyForm.addValidate(
      prop.value,
      generatorValidate(tyForm.rules[prop.value]),
      clearValidate
    )
  }
})
onBeforeUnmount(()=>{
  tyForm.removeValidate(prop.value)
})

</script>
<style lang="scss" scoped>
.ty-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  .ty-form-label {
    width: 100px;
    text-align: right;
    height: 100%;

    &:before {
      content: '*';
      color: var(--toyar-red-6);
      line-height: 100%;
    }

    &:after {
      content: ': ';
      margin-right: 5px;
    }
  }

  .ty-form-item-content {
    flex: 1;

    .ty-form-item-tip {
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
</style>
