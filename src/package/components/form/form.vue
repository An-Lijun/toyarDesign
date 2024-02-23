<template>
  <form class="ty-form" :class="{}">
    <slot></slot>
  </form>
</template>
<script lang='ts' setup>
import { formContent } from '../../hooks/symbolNm'
import { provide } from "vue";

const props = defineProps({
  formData: Object,
  rules: {
    type: Object,
    default: () => ({})
  },
  labelWidth:{
    type: String,
    default:'100'
  },
  labelPosition: String,
  size: String,
  disabled: Boolean,
  readonly: Boolean,
});
const fieldList = {};
function addValidate(prop, fns, clearValidate) {
  fieldList[prop] = {
    fns,
    clearValidate
  };
}
function removeValidate(prop) {
  delete fieldList[prop]
}
function validateAll() {
  return new Promise((resolve, reject) => {
    let keys = Object.keys(fieldList);
    const errList = []
    keys.forEach((key, index) => {
      const item = fieldList[key].fns;
      
      for (let index = 0; index < item.length; index++) {
        const data = item[index](key)
        if (data) {
          return errList.push(data)
        }
      }
    })
    if (errList.length > 0) {
      return reject(errList)
    }
    resolve(123);
  })

}
function validate(prop) {
  return new Promise((resolve,reject)=>{
    const fns = fieldList[prop].fns
    const errList = []
    for (let index = 0; index < fns.length; index++) {
      const data = fns[index](prop)
      
      if (data) {
         errList.push(data)
        if (errList.length > 0) {
          return reject(...errList,prop)
        }
      }
      return resolve(prop)
    }
  })
}
function clearValidateAll() {
  let keys = Object.keys(fieldList);
  keys.forEach(key => {
    fieldList[key].clearValidate();
  })
}
function clearValidate(prop) {
  fieldList[prop].clearValidate();
}
provide(formContent, {
  ...props,
  validate,
  addValidate,
  validateAll,
  removeValidate
})
defineExpose({
  validate,
  validateAll,
  clearValidate,
  clearValidateAll
});
</script>

<style lang="scss" scoped></style>
