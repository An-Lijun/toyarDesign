<template>
  <li class="ty-option" @click="selectOption">
    {{ label }}
  </li>
</template>
<script setup>
import {TySelectOptions} from './symbol'
import {selectContent} from '../../../hooks/symbolNm'
import { inject ,onMounted} from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  value:{
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue']);
const _selectContent =inject(selectContent,null);
const setOption = inject(TySelectOptions,null)
function selectOption(){
  _selectContent.setNativeInp(props.value,props.label)
  _selectContent.isShowOption.value=false
}
onMounted(()=>{
  setOption(props.label,props.value)
})
</script>
<style lang="scss" scoped>
  li{
    padding: 0 12px;
    &:hover{
      background-color: var(--fill-2);
      cursor: pointer;
    }
  }
</style>
