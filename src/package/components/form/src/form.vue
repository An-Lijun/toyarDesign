<template>
  <form :class="[nm.b(),nm.is(layout)]">
    <slot></slot>
  </form>
</template>
<script lang='ts' setup name="TyForm">
import type {IfieldList,TerrList} from '../type'

import { provide } from "vue";

import { formContent } from '../../../hooks/symbolNm'
import {getUniqueId} from '../../../utils/getUniqueId'
import {formProps,nm} from './context'
import type {FormProps} from './context'
import type {Ref} from 'vue'

defineOptions({
  name:'TyForm'
})


const props:FormProps = defineProps(formProps);
const fieldList:IfieldList={};
const formID = getUniqueId()

// 添加 校验
function addValidate(prop:string, formItemData:{formItemError:Ref,validateFnLs:Array<Function>}, clearValidate:Function) {
  fieldList[prop] = {
    formItemData,
    clearValidate
  };
}

//移除 校验
function removeValidate(prop:string) {
  delete fieldList[prop]
}
// 校验全部
function validateAll() {
  return new Promise((resolve, reject) => {
    const errList:TerrList = []
    Object.keys(fieldList).forEach(key => {
      const {formItemError, validateFnLs} = fieldList[key].formItemData;
      const len = validateFnLs.length
      for (let index = 0; index < len; index++) {
        const data = validateFnLs[index](key)
        if (data) {
          formItemError.value.isShowErrorMsg = true;
          formItemError.value.errorMsg =data;
          return errList.push(data)
        }
      }
    })
    if (errList.length > 0) {
      return reject(errList)
    }
    resolve('sucess');
  })

}
// 校验单个
function validate(prop:string) {
  return new Promise((resolve,reject)=>{
    const fns = fieldList[prop].formItemData.validateFnLs
    if(!fns.length){
      resolve('success')
    }
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
// 清除全部校验
function clearValidateAll() {
  let keys = Object.keys(fieldList);
  keys.forEach(key => {
    fieldList[key].clearValidate();
  })
}
// 清除单个校验
function clearValidate(prop:string) {
  fieldList[prop].clearValidate();
}

// 滚动到指定位置
function scrollTo(propId:string){
  const el =document.getElementById(`${formID}_${propId}`);
  if(el){
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}

const formContentProvide= {
  ...props,
  validate,
  addValidate,
  validateAll,
  removeValidate,
  formID
}
export type FormContentProvide = typeof formContentProvide
provide(formContent,formContentProvide)

defineExpose({
  validate,
  validateAll,
  clearValidate,
  clearValidateAll,
  scrollTo
});
</script>

<style lang="scss" scoped>
.is-vertical{
  :deep(.ty-form-item){
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .ty-form-item__label{
      text-align: left;
      margin-bottom: 8px;
    }
  }
}
</style>
