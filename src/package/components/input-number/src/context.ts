import { buildProps } from '@/package/utils/buildProps'
import { computed } from 'vue'

export const inputProps=buildProps({
  modelValue: {
    type: [ Number,String],
    required: true,
    default: ''
  },
  precision:{
    type:Number
  },
  stepStrictly:{
    type:Boolean,
    default:false
  },
  step:{
    type:Number,
    default:1
  },
  maxlength:{
    type:[Number,String,Object]
  }
})

export const inputEmits =['blur','clear', 'change', 'focus','update:modelValue']

/**
 * 计算props的值进行v-model绑定
 */
export const useCompMvalue= (props,emitFn)=>{
  const model = computed({
    get() {
      return props.modelValue
    },
    set(val) {
     let value =  Number.isNaN(val)?'':!val?'':val
     emitFn('update:modelValue',value)
    },
  })
  return {model}
}
