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
const fieldList=[];
function addField(formItemObj){
  fieldList.push(formItemObj)
}
function validataAll(){
  
  fieldList.forEach(item=>{
    item.fns.forEach(ite=>{
      ite(item.prop)
    })
  })
}
provide(formContent,{
  ...props,
  addField,
  validataAll
})

</script>

<style lang="scss" scoped>
</style>
