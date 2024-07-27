<template>
  <div class="divRoot">
    <div style="height: 300px">
      <TyEmpty />
    </div>
    <div style="height: 300px">
      <TyEmpty title="修改描述" />
    </div>
    <div style="height: 300px">
 
      <TyEmpty title="修改图标" >
        <template #icon>
        <TyIcon icon="ty-arrow-left-circle-fill"></TyIcon>
      </template>  
      </TyEmpty>

    </div>
  </div>
</template>
<script setup>
import TyIcon from "../../icon";

</script>
<style lang="less" scoped></style>
