<template>
  <div class="divRoot">
    {{ pwd }}
    <TyInputPassword v-model="pwd" disabled></TyInputPassword>
    <hr>
    <TyInputPassword v-model="pwd" readonly></TyInputPassword>
    <hr>
    <TyInputPassword v-model="pwd"  size="mini"></TyInputPassword>
    <hr>

    <TyInputPassword v-model="pwd"  size="small"></TyInputPassword>
    <hr>

    <TyInputPassword v-model="pwd"  size="medium"></TyInputPassword>

    <hr>

    <TyInputPassword v-model="pwd"  size="large"></TyInputPassword>

    <hr>

  </div>
</template>
<script setup>
let pwd= ref('')

</script>
<style lang="less" scoped>
</style>
