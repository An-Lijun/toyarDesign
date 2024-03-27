
<template>
  <div class="divRoot">
    <h6>
      {{ cal }}
    </h6>
    <div style="width: 500px;">
      <TyCalendar v-model="cal"></TyCalendar>
    </div>
    <br>
    <div style="width: 500px;">
      <TyCalendar v-model="cal" disabled></TyCalendar>
    </div>
    <br>

    <div style="width: 500px;" v-for="size in ['mini', 'small', 'medium', 'large']">
      <TyCalendar v-model="cal" :size="size"></TyCalendar>
      <br>
    </div>
  </div>
</template>
<script setup>
let cal =ref('')
</script>
<style lang="less" scoped>
</style>
