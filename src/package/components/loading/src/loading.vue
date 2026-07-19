<template>
  <div :class="[nm.b(),nm.is('fixed',isFixed)]"
  >
    <div :class="nm.e('box')" style="position:absolute;left: 50%; top: 50%; transform: translate(-50%,-50%);"> 
      <TyiLoader2Line/>
    </div>
  </div>
</template>
<script setup>
import {TyiLoader2Line} from 'toyaricon'
import {lodProps,nm} from './context'
const props = defineProps(lodProps)

</script>
