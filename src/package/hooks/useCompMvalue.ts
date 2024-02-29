import { computed } from 'vue'
/**
 * 计算props的值进行v-model绑定
 */
export const useCompMvalue= (props,emitFn)=>{
  const model = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emitFn('update:modelValue',val)
    },
  })
  return {model}
}
