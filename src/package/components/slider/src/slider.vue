<template>
  <div class="ty-slider" :style="style" ref="sliderBox" >
      <div class="ty-slider-boll" ref="tyboll" :style="bollStyle" @mousedown="slider"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useCompMvalue } from '../../../hooks/useCompMvalue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
    default: ''
  },
  min:{
    type:String||Number,
    default:0
  },
  max:{
    type:String||Number,
    default:100
  },
  width:{
    type:String||Number,
    default:10
  }
})

const emit = defineEmits(['update:modelValue'])
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
<style lang="scss" scoped>
.ty-slider{
  position: relative;
  margin: 5px 0;
  border-radius: 16px;
  background-color: var(--fill-4);
  .ty-slider-boll{
    background-color: #fff;
    border:3px solid var(--primary-6);
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    transform: translate(-50%,-25%);
    transform: all .5s;

    &:hover{
      cursor: pointer;
      border-width: 5px;
    }
    &:active{
      cursor: move;
    }
  }
}
</style>
