<template>
  <div class="divRoot">
    <!-- <h2>测试标题</h2> -->
    <TySpace>
      <TyAvatar style="background-color: aqua;" width="50px">123456789</TyAvatar>
      <TyAvatar style="background-color:chocolate;">A</TyAvatar>
      <TyAvatar style="background-color: skyblue;" width="50px">你好</TyAvatar>
      <TyAvatar  shape="circle">你好</TyAvatar>
      <TyAvatar style="background-color: skyblue;" shape="square">你好</TyAvatar>
      <TyAvatar style="background-color: skyblue;" shape="square">
        666
        <template #trigger>
          <TyiInformationFill :size="14"></TyiInformationFill>
        </template>
      </TyAvatar>

    </TySpace>

  </div>
</template>
<script setup>
import {TyiInformationFill} from 'toyaricon'
</script>
<style lang="less" scoped>
</style>
