<template>
  <div :class="loadingClass">
    <div :class="nm.e('box')" style="position:absolute;left: 50%; top: 50%; transform: translate(-50%,-50%);"> 
      <TyiLoader2Line/>
    </div>
  </div>
</template>
<script setup>
import { TyiLoader2Line } from 'toyaricon'
import { useProps, nm, useEmits } from './context'
import useLoading from './use-loading'

defineOptions({
  name: 'TyLoading'
})

const props = defineProps(useProps)

const { loadingClass } = useLoading(props)
</script>
