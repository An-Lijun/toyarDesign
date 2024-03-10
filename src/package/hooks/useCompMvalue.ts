import { computed, watch } from 'vue'
/**
 * 计算props的值进行v-model绑定
 */
export const useCompMvalue= (props,emitFn,options={})=>{
  const model = computed({
    get() {
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
    watch(model,options.watchChange)
  }
  return {model}
}
