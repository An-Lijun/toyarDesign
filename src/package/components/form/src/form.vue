<template>
  <form :class="[nm.b(), nm.is(layout)]">
    <slot></slot>
  </form>
</template>
<script setup>
import { nm, useProps, useEmits } from './context'
import useForm from './use-form'

defineOptions({
  name: 'TyForm'
})

const props = defineProps(useProps)
defineEmits(useEmits)

const { validate, validateAll, clearValidate, clearValidateAll, scrollTo } = useForm(props)

defineExpose({
  validate,
  validateAll,
  clearValidate,
  clearValidateAll,
  scrollTo
})
</script>
