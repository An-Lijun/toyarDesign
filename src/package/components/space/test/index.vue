<template>
  <div class="divRoot">
    <!-- <TySpace>

      <TyButton>1123</TyButton>
      <span style="display: inline-block; height: 15px;line-height: 15px;">
        222
      </span>
      <template #split>
        |
      </template>
</TySpace>
<br>
<hr>
<TySpace direction="column" size="large">

  <TyButton>1123</TyButton>
  <span style="display: inline-block; height: 15px;line-height: 15px;">
    222
  </span>
</TySpace>
<hr> -->

    <TySpace>

      <TyButton v-for="item in 10">1123</TyButton>

      <span style="display: inline-block; height: 15px;line-height: 15px;">
        222
      </span>
      <template #split>
        |
      </template>
    </TySpace>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped></style>
