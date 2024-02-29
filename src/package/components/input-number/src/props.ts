import { computed } from 'vue'

export const inputProps={
  size: {
    type: String,
    default: 'small',
    validator: value => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  clearable: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [ Number,String],
    required: true,
    default: ''
  },
  showLimit:{
    type:Boolean,
    default:false
  },
  format:{
    type:Function,
    default:value=> value
  },
  isDouble:{
    type:Boolean,
    default:false
  },
  step:{
    type:Number,
    default:1
  }
}

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
