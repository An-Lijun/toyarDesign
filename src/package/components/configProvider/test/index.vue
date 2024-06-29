<template>
  <div class="divRoot">
    <TyButton @click ="fn">123</TyButton>
    <input type="color" v-model="color">
    {{ color }}
    <span style="background-color: var(--toyar-xblue-7);">2123</span>

    <TyConfigProvider :theme="theme" :options="{resetPrimary:color}">
      123
      <TyButton>123</TyButton>
      <span style="background-color: var(--toyar-xblue-7);">2123</span>
    </TyConfigProvider>
  </div>
</template>
<script setup>
let theme =ref('light')
let color =ref('#ff00ff')
const fn =()=>{ 
  theme.value = theme.value ==='light'?'dark':'light'
}
</script>
<style lang="less" scoped>
</style>
