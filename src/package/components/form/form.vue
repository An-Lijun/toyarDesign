<template>
  <form 
    class="ty-form"
    :class="{}"
  >
    <slot></slot>
  </form>
</template>
<script lang='ts' setup>
import {formContent} from '@/package/hooks/symbolNm'
// import { provide,defineProps} from "vue";

const props =defineProps({
  formData:Object,
  rules: {
    type:Object,
    default:()=>({})
  },
  labelWidth:String,
  labelPosition: String,
  size:String,
  disabled:Boolean,
  readonly:Boolean,
});
const fieldList={};
function addValidate(prop,fns,clearValidate){
  fieldList[prop]={
    fns,
    clearValidate
  };
}
function removeValidate(prop){
  delete fieldList[prop]
}
function validateAll(){
  let keys = Object.keys(fieldList);
  keys.forEach(async key=>{
    const item  = fieldList[key].fns;
    for (let index = 0; index < item.length; index++) {
       await item[index](key)
    }
  })
}
function validate(prop){
  const fns= fieldList[prop].fns
  const list =fns.map(item=> item(prop))
  console.log(list);
  
  return Promise.all(list).then((res)=>{
    console.log(res,"123456789");
  }).catch(err=>{
    console.log(err,"123eerr");
    
  })
}
function clearValidateAll(){
  let keys = Object.keys(fieldList);
  keys.forEach( key=>{
    fieldList[key].clearValidate();
  })
}
function clearValidate(prop){
  fieldList[prop].clearValidate();
}
provide(formContent,{
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

<style lang="scss" scoped>
</style>
