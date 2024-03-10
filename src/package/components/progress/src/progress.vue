<template>
  <div :class="[`ty-progress-${type}`]" :style="style">
    <div
      v-if="type === 'line'"
      class="inner"
      :style="{
        width: model + '%',
        height: props.strokeWidth + 'px',
        fontSize: props.strokeWidth - 2 + 'px',
        lineHeight: props.strokeWidth + 'px'
      }"
    >
      <span v-if="isShowPer"> {{ model }}% </span>
    </div>
    <div
      v-else
      :style="{
        width: props.width - props.strokeWidth + 'px',
        height: props.width - props.strokeWidth + 'px',
        borderRadius: '50%',
        position: 'absolute',
        background: '#fff',
        textAlign: 'center',
        lineHeight: props.width - props.strokeWidth + 'px',
        color: 'var(--primary-6)'
      }"
    >
      {{ model }}%
    </div>
  </div>
</template>
<script setup>
import { watch } from 'vue'
import { useCompMvalue } from '../../../hooks/useCompMvalue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
    default: ''
  },
  strokeWidth: {
    type: String || Number,
    default: 5
  },
  isShowPer: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'line'
  },
  width: {
    type: String,
    default: 50
  }
})

const emit = defineEmits(['update:modelValue'])
const setFn =(value)=>{
  model.value = Math.floor(value) 
}
const { model } = useCompMvalue(props, emit,{
  watchChange:setFn
})
const style = ref({
  width: '',
  height: '',
  borderWidth: '',
  background: ''
})

if (props.type === 'circle') {
  watch(
    model,
    (newVal, oldVal) => {
      style.value = {
        width: props.width + 'px',
        height: props.width + 'px',
        borderWidth: `${props.strokeWidth}px`,
        background: `conic-gradient(from -90deg at center,  var(--primary-6) ${
          3.6 * model.value
        }deg, var(--primary-6) ${3.6 * model.value}deg, var(--fill-4) ${
          3.6 * model.value
        }deg)`
      }
    },
    { immediate: true }
  )
}

</script>
<style lang="scss" scoped>
.ty-progress-line {
  border-radius: 16px;
  background-color: var(--fill-4);
  display: block;
  width: 100%;
  box-sizing: border-box;
  .inner {
    background-color: var(--primary-6);
    border-radius: 16px;
    min-height: 5px;
    text-align: right;
    font-size: 5px;
    box-sizing: border-box;
    padding-right: 5px;
    color: #fff;
    transition: width 0.5s;
  }
}
.ty-progress-circle {
  position: relative;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .5s;
  // border-color: var(--primary-6);
  // border-style: solid;

  // const background = `conic-gradient(from -90deg at bottom,  ${start} 0deg,  ${end} ${deg}deg, #e8ebee ${deg}deg)`
  border-radius: 50%;
  // background: conic-gradient(red, orange, yellow, green, blue);
  // background: conic-gradient(from -90deg at center,  red 180deg, red 180deg, #e8ebee 180deg)
  // border-image-source: linear-gradient(to right, tomato, blue);
  // border-image-slice: 1;
}
</style>
