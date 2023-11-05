<template>
  <div class="ty-form-item">
    <label class="ty-form-label" :style="{
      display: 'block',
      wordBreak: 'break-all',
      width: `${tyForm.labelWidth}px`,

    }">
      <template v-if="tyForm.label">
        {{ tyForm.label }}
      </template>
      <slot name="label" v-else></slot>
    </label>
    <div class="ty-form-item-content">
      <slot></slot>
      <div v-show="formItemError.isShowErrorMsg" class="ty-form-item-tip">
        {{ formItemError.errorMsg }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { formContent ,formItemContent} from '@/package/hooks/symbolNm'
import { inject, onMounted, toRefs,provide } from "vue";
const tyForm = inject(formContent);
const formItemError = ref({
  isShowErrorMsg: false,
  errorMsg: ''
})
const props = defineProps({
  prop: String,
})

const { prop } = toRefs(props)
provide(formItemContent,{
  ...props
})
const generatorValidate = (rules) => {
  const fnArr = [];
  rules.forEach(rule => {
    let keys = Object.keys(rule);
    if (keys.includes('required')) {
      fnArr.push(
        (data) => {
          return new Promise((resolve, reject) => {
            if (!tyForm.formData[data]) {
              formItemError.value.isShowErrorMsg = true
              formItemError.value.errorMsg = rule.message || `${data} is required`
              return reject(new Error(formItemError.value.errorMsg))
            }
            formItemError.value.isShowErrorMsg = false
            resolve()
          })
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
          return new Promise((resolve, reject) => {
            if (keys.includes('min')) {
              if (`${tyForm.formData[data.value]}`.length <= rule.min) {
                formItemError.value.isShowErrorMsg = true
                formItemError.value.errorMsg = errMsg
                return reject(new Error(errMsg))
              }
            }
            if (keys.includes('max')) {
              if (`${tyForm.formData[data.value]}`.length >= rule.max) {
                formItemError.value.isShowErrorMsg = true
                formItemError.value.errorMsg = errMsg
                return reject(new Error(errMsg))
              }
            }
            formItemError.value.isShowErrorMsg = false
            resolve()
          })
        }
      )
    }


  });
  return fnArr
}

onMounted(() => {
  if (prop && Object.keys(tyForm.rules).includes(prop.value)) {
    tyForm.addValidate(
       prop.value,
       generatorValidate(tyForm.rules[prop.value])
    )
  }
})
</script>
<style lang="scss" scoped>
.ty-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

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
      color: var(--toyar-red-6);
      font-size: 12px;
      position: absolute;
    }
  }
}
</style>
