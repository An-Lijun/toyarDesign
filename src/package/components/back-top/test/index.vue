<template>
  <div  style="  position: relative;" >
    <div style="height: 800px;max-height: 500px;overflow: scroll;" class="divRoot">
      <div v-for="item in 100">
        <br >
        <h1>123</h1>
      </div>
    </div>

    <TyBackTop vHeight="450" right="250" bottom="50"  target=".divRoot">

      UP
    </TyBackTop>

    <TyBackTop vHeight="450" right="200" bottom="50"  target=".divRoot"></TyBackTop>

    <TyBackTop vHeight="450" right="150" bottom="50" circle target=".divRoot"></TyBackTop>

  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
</style>
