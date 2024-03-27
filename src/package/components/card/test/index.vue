<template>
  <div class="divRoot">
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
<script setup></script>
<style lang="less" scoped></style>
