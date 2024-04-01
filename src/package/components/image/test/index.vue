<template>
  <div class="divRoot">
    <TyImage :src="getAssetsFile('./js.jpg')" class="bd" />
  <TyImage :src="getAssetsFile('./js.jpg')"  class="bd ml-10"  shape="circle"/>

  <TyImage :src="getAssetsFile('./js.jpg')"  class="bd ml-10" fit="none" />
  <TyImage :src="getAssetsFile('./js.jpg')"  class="bd ml-10" fit="fill" />
  <TyImage :src="getAssetsFile('./js.jpg')"  class="bd ml-10" fit="contain" />
  <TyImage :src="getAssetsFile('./js.jpg')"  class="bd ml-10" fit="cover" />
  <TyImage :src="getAssetsFile('./js.jpg')"  class="bd ml-10" fit="scale-down" />
  </div>
</template>
<script setup lang="ts">
 const getAssetsFile = (url: string) => {
   return new URL(`${url}`, import.meta.url).href
}
</script>
<style lang="less" scoped>
</style>
