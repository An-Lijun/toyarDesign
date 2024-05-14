<template>
  <div class="divRoot">
    <br />
    <TyCard :isLoading="isLoading">
      <template #header>
        <div>66666666</div>
        <br>
        <h1>123465</h1>
        <div>
          456789
        </div>
      </template>
      123
    </TyCard>
    <TyCard> 123 </TyCard>
    <br />
    <TyCard>
      <template #header>
        <div>66666666</div>
      </template>
      123
    </TyCard>
    <br />

    <TyCard :border="false">
      <template #header>
        <div>66666666</div>
      </template>
      123
    </TyCard>

    <br />

    <TyCard shadow="shadow">
      <template #header>
        <div>66666666</div>
      </template>
      123
    </TyCard>
    <br />

    <TyCard shadow="hover">
      <template #header>
        <div>66666666</div>
      </template>
      123
    </TyCard>
    <br />

    <br />
    <br />
  </div>
</template>
<script setup>
let isLoading =ref(true)
setTimeout(()=>{
  isLoading.value=false
},210500)
</script>
<style lang="less" scoped></style>
