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
import { provide,defineProps} from "vue";

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
function addValidate(prop,fns){
  fieldList[prop]=fns;
}
function validataAll(){
  let keys = Object.keys(fieldList);
  keys.forEach(async key=>{
    const item  = fieldList[key];
    
    for (let index = 0; index < item.fns.length; index++) {
       await item.fns[index](item.prop)
    }
  })
}
async function validata(prop){
  const fns= fieldList[prop]
  for (let index = 0; index < fns.length; index++) {
       await fns[index](prop)
  }
}
provide(formContent,{
  ...props,
  validata,
  addValidate,
  validataAll
})
defineExpose({
  validata,
  validataAll,
  a:123
});
</script>

<style lang="scss" scoped>
</style>
