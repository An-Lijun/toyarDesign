<template>
  <form :class="[nm.b(),nm.is(layout)]">
    <slot></slot>
  </form>
</template>
<script lang='ts' setup name="TyForm">
import { formContent } from '../../../hooks/symbolNm'
import { provide } from "vue";
import {getUniqueId} from '../../../utils/getUniqueId'
import {formProps,nm} from './context'
import type {FormProps} from './context'
defineOptions({
  name:'TyForm'
})

interface IfieldList{
  [index: string]: {
    fns:Array<Function>,
    clearValidate:Function
  }
}
type TerrList =Array<{[index: string]:string}>

const props:FormProps = defineProps(formProps);
const fieldList:IfieldList={};
const formID = getUniqueId()

// 添加 校验
function addValidate(prop:string, fns:Array<Function>, clearValidate:Function) {
  fieldList[prop] = {
    fns:fns,
    clearValidate
  };
}
function removeValidate(prop:string) {
  delete fieldList[prop]
}
function validateAll() {
  return new Promise((resolve, reject) => {
    const errList:TerrList = []
    Object.keys(fieldList).forEach(key => {
      const fns = fieldList[key].fns;
      const len = fns.length
      for (let index = 0; index < len; index++) {
        const data = fns[index](key)
        if (data) {
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
function validate(prop:string) {
  return new Promise((resolve,reject)=>{
    const fns = fieldList[prop].fns
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
function clearValidateAll() {
  let keys = Object.keys(fieldList);
  keys.forEach(key => {
    fieldList[key].clearValidate();
  })
}
function clearValidate(prop:string) {
  fieldList[prop].clearValidate();
}

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
