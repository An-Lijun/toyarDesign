<template>
  <li :class="opNm.b()" @click="selectOption">
    {{ label }}
  </li>
</template>
<script setup>
import { TySelectOptions } from './symbol'
import { selectContent } from '../../../hooks/symbolNm'
import { inject, onMounted } from 'vue'
import { opNm, opProps, opEmits } from './context'
defineOptions({
    name:'TyOption'
  })
const props = defineProps(opProps)
const emit = defineEmits(opEmits)
const _selectContent = inject(selectContent, null)
const setOption = inject(TySelectOptions, null)
function selectOption () {
  _selectContent.setNativeInp(props.value, props.label)
  _selectContent.isShowOption.value = false
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
}
</style>
