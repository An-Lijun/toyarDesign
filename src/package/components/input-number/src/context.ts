import { computed } from 'vue'
export const inputProps={
  modelValue: {
    type: [ Number,String],
    required: true,
    default: ''
  },
  format:{
    type:Function,
    default:(value:string)=> value
  },
  isDouble:{
    type:Boolean,
    default:false
  },
  stepStrictly:{
    type:Boolean,
    default:false
  },
  step:{
    type:Number,
    default:1
  }
}
export const inputEmits =['blur', 'input', 'update:modelValue']
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
