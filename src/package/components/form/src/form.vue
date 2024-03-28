<template>
  <form :class="nm.b()" >
    <slot></slot>
  </form>
</template>
<script lang='ts' setup name="TyForm">
import { formContent } from '../../../hooks/symbolNm'
import { provide } from "vue";
import {formProps,nm} from './context'

interface IfieldList{
  [index: string]: {
    fns:Array<Function>,
    clearValidate:Function
  }
}
type TerrList =Array<{[index: string]:string}>

const props = defineProps(formProps);
const fieldList:IfieldList={};

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
