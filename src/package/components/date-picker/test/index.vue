
<template>
  <div class="divRoot">
    <h6>
      {{ cal }}
    </h6>
    <div style="width: 500px;">
      <TyDatePicker v-model="cal"></TyDatePicker>
    </div>
    <br>
    <div style="width: 500px;">
      <TyDatePicker v-model="cal" disabled></TyDatePicker>
    </div>
    <br>

    <div style="width: 500px;" v-for="size in ['mini', 'small', 'medium', 'large']">
      <TyDatePicker v-model="cal" :size="size"></TyDatePicker>
      <br>
    </div>
  </div>
</template>
<script setup>
let cal =ref('')
</script>
<style lang="less" scoped>
</style>
