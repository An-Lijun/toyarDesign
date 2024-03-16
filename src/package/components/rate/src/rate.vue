<template>
  <div class="ty-rate">
    <span v-for="item in props.max"
      :class="{
        'ty-rate-item':true,
        active:actived===-1? item<=model:item<actived
      }"
    >
      <TyIcon
        :data-star="item"
        :icon="actived===-1? item<=model?icon[0]:icon[1]:item<actived?icon[0]:icon[1] "
        style="margin: 0 5px"
        @mouseenter="handleEnter"
        @mouseleave="handleLeave"
        @click="handleClick"
      ></TyIcon>
    </span>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TyIcon from '../../icon'
import { useCompMvalue } from '../../../hooks/useCompMvalue'

const props = defineProps({
  modelValue: {
    type: String,
    default:0
  },
  max: {
    type: Number,
    default: 5
  },
  allowHalf: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const { model } = useCompMvalue(props, emit)


const initIcon =()=>{
  return props.allowHalf ? ['ty-star-half-fill','ty-star-half-line'] : ['ty-star-fill','ty-star-line']
}
let icon = ref(initIcon())
let actived =ref(-1)

const handleEnter = $event => {
  const target =$event.target
  actived.value=Number(target.getAttribute('data-star'))+1

}
const handleLeave = $event => {
  actived.value=-1
}
const handleClick= $event => {
  const target =$event.target
  emit('update:modelValue',Number(target.getAttribute('data-star')))
}
// line:fille
// ty-star-fill
// ty-star-half-line
</script>
<style lang="scss" scoped>
.ty-rate {
  & > .active {
    --toyar-gray-10: var(--toyar-yellow-6);
  }
  .ty-rate-item{
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
