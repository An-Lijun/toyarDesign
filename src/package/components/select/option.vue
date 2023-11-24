<template>
  <li class="ty-option" @click="selectOption">
    {{ label }}
  </li>
</template>
<script setup>
import {selectContent} from '../../hooks/symbolNm'
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
const _selectContent =inject(selectContent);
function selectOption(){
  _selectContent.setNativeInp(props.value)
  _selectContent.isShowOption.value=false
}

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
