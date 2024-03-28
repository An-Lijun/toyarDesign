<template>
  <div class="divRoot">
    <ty-divider></ty-divider>
    <br />
    <ty-divider>
      <ty-icon icon="ty-arrow-up-circle-fill" class="mw-10"></ty-icon>
    </ty-divider>
    <br />
    <div style="height: 25px; display: flex; justify-content: center">
      <TyButton>新增</TyButton>
      <ty-divider style="--border-1: 2px" direction="column"></ty-divider>
      <TyButton type="secondary">修改</TyButton>
      <ty-divider style="--border-1: 2px" direction="column"></ty-divider>
      <TyButton state="danger">删除</TyButton>
    </div>
    <br />
    <div style="height: 50px; display: flex; justify-content: center">
      <ty-divider direction="column"></ty-divider>
    </div>

    <br />
    <ty-divider>Toyar</ty-divider>
    <div style="height: 50px; display: flex; justify-content: center">
      <ty-divider direction="column">Toyar</ty-divider>
    </div>
    <br />
    <ty-divider position="left">Toyar</ty-divider>
    <ty-divider position="center">Toyar</ty-divider>
    <ty-divider position="right">Toyar</ty-divider>

    <div style="height: 100px; display: flex; justify-content: center">
      <ty-divider direction="column" position="top">Toyar</ty-divider>
      <ty-divider direction="column" position="center">Toyar</ty-divider>
      <ty-divider direction="column" position="bottom">Toyar</ty-divider>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped></style>
