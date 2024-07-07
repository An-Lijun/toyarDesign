  import { computed, watch } from 'vue'

/*
 * 计算props的值进行v-model绑定
 */
export const useCompMvalue= (props,emitFn,options={})=>{
  const model = computed({
    get() {
      if(options.setFn){
        options.setFn( props.modelValue)
      }
      return props.modelValue 
    },
    set(val) {
      if(options.setFn){
        val = options.setFn(val)
      }
      emitFn('update:modelValue',val)
    }
  })
  if(options.watchChange){
    watch(()=>props.modelValue,options.watchChange)
  }
  return {model}
}
