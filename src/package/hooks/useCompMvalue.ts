import { computed } from 'vue'
/**
 * 计算props的值进行v-model绑定
 */
export const useCompMvalue= (props,emit)=>{
  const model = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue',val)
    },
  })
  return {model}
}
