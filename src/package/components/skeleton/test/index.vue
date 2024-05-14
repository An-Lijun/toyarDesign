<template>
  <div class="divRoot">
    <div >
    <TySkeleton :count="7"/>

  </div>
<br>
<hr>
<TySkeleton>
  <TySkeletonItem :circle="true" width="180px" height="180px"></TySkeletonItem>

      <TySkeletonItem></TySkeletonItem>
      <TySkeletonItem></TySkeletonItem>
      <TySkeletonItem></TySkeletonItem>
      <TySkeletonItem width="10%"></TySkeletonItem>

    </TySkeleton>
  </div>
</template>
<script setup>

</script>
<style lang="less" scoped>
</style>
