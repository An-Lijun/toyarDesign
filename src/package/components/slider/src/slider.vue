<template>
  <div :class="nm.b()" :style="style" ref="sliderBox" >
      <div :class="nm.e('boll')" ref="tyboll" :style="bollStyle" @mousedown="slider"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import {sliderProps,sliderEmits,nm} from './context'

defineOptions({
  name:'TySlider'
})
const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)
const fn = ()=>{
  const fl =model.value/ minx
   const moveX=fl*maxWidth
    tyboll.value.style.left = moveX + "px";
}
const { model } = useCompMvalue(props, emit,{
  watchChange:fn
})

const tyboll =ref()
const sliderBox = ref()
const minx = props.max - props.min
const style =ref({
  height:props.width+'px'
})
const bollStyle =ref({

  height:props.width*2 +'px',
  width:props.width*2 +'px',
})
let x = 0;
let maxWidth =0

const move=(e)=>{
    let moveX = e.pageX - x;
    moveX= moveX>=maxWidth?maxWidth:moveX
    moveX= moveX<=0?0 : moveX 
    // minx
    const fl =moveX/ maxWidth
    model.value=String(fl*minx)
    tyboll.value.style.left = moveX + "px";
}
const slider =(e)=>{
  e.preventDefault();
  x = e.pageX - tyboll.value.offsetLeft;
  if(document){
    document?.addEventListener("mousemove", move)
    document?.addEventListener("mouseup", ()=>{
      document.removeEventListener('mousemove',move)
    });
  }
}
onMounted(()=>{
  maxWidth = sliderBox.value.getBoundingClientRect().width
  
})

</script>

