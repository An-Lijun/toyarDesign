<template>
    <section 
    :class="[nm.b(),nm.is('flexColumn',column)]"
    >
      <slot></slot>
    </section>
</template>
<script setup lang="ts" name="TyContainer">
import useNmSpace from '../../../hooks/useBem';
defineOptions({
  name:'TyContainer'
})
 defineProps({
  column: {
    type: Boolean,
    default: false,
  },
});
const nm =useNmSpace('container')

</script>
