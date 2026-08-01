<template>
  <div class="affix-hook-demo">
    <h3>Headless Hook 用法（useAffix）</h3>
    <p>通过 useAffix 自行渲染，便于自定义结构与样式</p>
    <UseAffix :offset-top="52" class="demo-affix">
      <div class="demo-block">useAffix offsetTop: 52</div>
    </UseAffix>
  </div>
</template>

<script setup lang="ts">
import UseAffix from '../useAffix.vue'

defineOptions({ name: 'AffixHookDemo' })
</script>

<style scoped>
.affix-hook-demo {
  padding: 12px;
}

.demo-affix {
  margin: 16px 0;
}

.demo-block {
  padding: 8px 16px;
  background: var(--color-warning-600, #faad14);
  color: #fff;
  border-radius: 4px;
}
</style>
