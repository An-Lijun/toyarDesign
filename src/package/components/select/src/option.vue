<template>
  <li
    :class="[
      opNm.b(),
      opNm.is('selected', _selectContent.getValue() === value || Array.isArray(_selectContent.getValue()) && _selectContent.getValue().includes(value)),
      opNm.is('disabled', disabled)
    ]"
    @click.stop="selectOption"
  >
    <slot>
      {{ label }}
    </slot>
  </li>
</template>
<script setup>
import { selectOptions } from '../../../hooks/symbolNm'
import { inject, onMounted } from 'vue'
import { opNm, opProps, opEmits } from './context'
import { selectContent } from '../../../hooks/symbolNm'

defineOptions({
  name: 'TySelectOption'
})
const props = defineProps(opProps)
const emit = defineEmits(opEmits)
const _selectContent = inject(selectContent, null)
const setOption = inject(selectOptions, null)
function selectOption () {
  if (props.disabled) {
    return
  }
  let value = props.value
  let label = props.label
  if(_selectContent.multiple){
    let data = _selectContent.getValue()
    if(Array.isArray(data)){
      if(data.includes(value)){
        data= data.filter(item => item !== value)
      }else{
        data.push(value)
      }
    }
    value = data
    label =data.map(item=>_selectContent.options[item]||'').join(',')
  }
  _selectContent.setNativeInp(value, label)
  if(!_selectContent.multiple){
    _selectContent.isShowOption.value = false
  }
}
onMounted(() => {
  setOption(props.label, props.value)
})
</script>
<style lang="scss" scoped>
li.ty-option {
  padding: 0 12px;
  &:hover {
    background-color: var(--fill-2);
    cursor: pointer;
  }
  &.is-selected {
    color: var(--primary-6);
  }
  &.is-disabled {
    color: var(--text-4);
    cursor: not-allowed;
  }
}
</style>
