<template>
  <main :class="nm.b()">
    <slot></slot>
  </main>
</template>
<script setup  lang="ts" name="TyMain">
import useNmSpace from '../../../hooks/useBem'
defineOptions({
  name:'TyMain'
})
const nm = useNmSpace('main')

</script>
