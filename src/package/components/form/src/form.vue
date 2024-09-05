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

const props = defineProps(formProps);
const fieldList:IfieldList={};
const formID = getUniqueId()
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
    let keys = Object.keys(fieldList);
    const errList:TerrList = []
    keys.forEach((key, index) => {
      const fns = fieldList[key].fns;
      for (let index = 0; index < fns.length; index++) {
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

function scrollTo(propId){
  const el =document.getElementById(`${formID}_${propId}`);
  if(el){
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}


provide(formContent, {
  ...props,
  validate,
  addValidate,
  validateAll,
  removeValidate,
  formID
})

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
