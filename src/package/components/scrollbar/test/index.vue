<template>
  <TyScrollBar style="height: 300px; width: 500px;background-color: deepskyblue;">
      <div style="width: 900px;">
          <h3  v-for="item in 50" style="color: #fff; text-align: left;display: flex;justify-content: space-between;">
            <span>{{ item }}</span>
            <span>--</span>
          </h3>
      </div>
  </TyScrollBar>
</template>
<script setup>
</script>
<style lang="less" scoped>
</style>
