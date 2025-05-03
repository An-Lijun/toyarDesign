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
        <TyiArrowLeftCircleFill/>
      </template>  
      </TyEmpty>

    </div>
  </div>
</template>
<script setup>
import {TyiArrowLeftCircleFill} from 'toyaricon'

</script>
<style lang="less" scoped></style>
