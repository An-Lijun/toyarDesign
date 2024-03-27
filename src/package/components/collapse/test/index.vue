<template>
  <div class="divRoot">
    <TyCollapse v-model="modelV1">
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
  </TyCollapse>
  <br>
  <TyCollapse v-model="modelV2" :disabled="true">
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
  </TyCollapse>
  <br>
  <TyCollapse v-model="modelV3" :accordion="true">
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
    <TyCollapseItem title="title" name="bb" >bbbb </TyCollapseItem>
    <TyCollapseItem title="title" name="cc" >cccc </TyCollapseItem>
  </TyCollapse>
  <br>
  <TyCollapse v-model="modelV4">
    <TyCollapseItem title="title" name="aa" >
        <TyCollapse v-model="modelV5">
        <TyCollapseItem title="title" name="bb" >bbbb 
        </TyCollapseItem>
      </TyCollapse> 
     </TyCollapseItem>
  
  </TyCollapse>
  <br>
  <TyCollapse v-model="modelV2" :hide="true">
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
  </TyCollapse>
  <br>
  <TyCollapse v-model="modelV2" positionLeft>
    <TyCollapseItem title="title" name="aa" >aaaa </TyCollapseItem>
  </TyCollapse>
  <br>

  </div>
</template>
<script setup>
  import {ref} from 'vue'
  const modelV1 =ref([])
  const modelV2 =ref([])
  const modelV3 =ref([])
  const modelV4 =ref([])
  const modelV5 =ref([])
</script>
<style lang="less" scoped>
</style>
